'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ynqvb3m';
const EMAILJS_TEMPLATE_ID = 'bq3rj96';
const EMAILJS_PUBLIC_KEY = 'Ag2vutqZkqdkZccIT';

const timeSlots: string[] = [];
for (let h = 10; h <= 18; h++) {
  timeSlots.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 18) timeSlots.push(`${String(h).padStart(2, '0')}:30`);
}

const ff = "'Pretendard', sans-serif";

const C = {
  bg: '#F7F4EF',
  text: '#2B2B2B',
  textMid: 'rgba(43,43,43,0.58)',
  textSub: 'rgba(43,43,43,0.38)',
  divider: 'rgba(43,43,43,0.1)',
  accent: 'rgba(26,158,212,0.65)',
  inputBg: '#FFFFFF',
  inputBorder: 'rgba(43,43,43,0.18)',
};

export default function VisitPopup() {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({
    name: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    date: '',
    time: '',
    agree: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const phone2Ref = useRef<HTMLInputElement>(null);
  const phone3Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = '성함을 입력해주세요';
    if (!form.phone2.trim() || !form.phone3.trim()) {
      e.phone = '연락처를 입력해주세요';
    } else if (form.phone2.length < 3 || form.phone3.length < 4) {
      e.phone = '연락처를 정확히 입력해주세요';
    }
    if (!form.date) e.date = '방문일자를 선택해주세요';
    if (!form.time) e.time = '방문시간을 선택해주세요';
    if (!form.agree) e.agree = '개인정보 수집 및 이용에 동의해주세요';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.name,
        phone: `${form.phone1}-${form.phone2}-${form.phone3}`,
        date: form.date,
        time: form.time,
      });
      setSubmitted(true);
    } catch {
      alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (!isOpen) return null;

  const labelStyle: React.CSSProperties = {
    fontFamily: ff,
    fontSize: isMobile ? '0.66rem' : '0.72rem',
    letterSpacing: '0.1em',
    color: C.textMid,
    display: 'block',
    marginBottom: isMobile ? '5px' : '8px',
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: ff,
    fontSize: '0.62rem',
    letterSpacing: '0.04em',
    color: 'rgba(180,50,50,0.85)',
    marginTop: '4px',
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: ff,
    fontSize: isMobile ? '0.82rem' : '0.88rem',
    background: C.inputBg,
    borderColor: C.inputBorder,
    color: C.text,
  };

  const inputPy = isMobile ? 'py-2' : 'py-3';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(15,15,15,0.52)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '8px' : '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: C.bg,
          width: '100%',
          maxWidth: '456px',
          maxHeight: isMobile ? '95dvh' : '92vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 20px 56px rgba(0,0,0,0.16)',
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Close ── */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="닫기"
          style={{
            position: 'absolute',
            top: '16px',
            right: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10,
            padding: '4px',
            color: C.textSub,
            lineHeight: 1,
          }}
        >
          <X size={17} strokeWidth={1.4} />
        </button>

        {/* ── Header ── */}
        <div style={{ padding: isMobile ? '12px 18px 8px' : '30px 30px 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '6px' : '18px' }}>
            <img
              src="/images/xi_logo_dark.png"
              alt="Xi"
              style={{ height: '18px', objectFit: 'contain', opacity: 0.65, flexShrink: 0 }}
            />
            <div style={{ width: '1px', height: '12px', background: C.divider, flexShrink: 0 }} />
            <span style={{ fontFamily: ff, fontSize: '0.57rem', letterSpacing: '0.3em', color: C.textSub }}>
              DOAN XI CENTUM RICHEE
            </span>
          </div>

          <h2
            style={{
              fontFamily: ff,
              fontSize: isMobile ? '1.25rem' : '1.7rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: C.text,
              margin: isMobile ? '0 0 3px' : '0 0 7px',
              lineHeight: 1.2,
            }}
          >
            방문예약 <span style={{ color: C.accent }}>사은품</span> 증정
          </h2>
          <p style={{ fontFamily: ff, fontSize: isMobile ? '0.72rem' : '0.88rem', fontWeight: 400, letterSpacing: '0.06em', color: '#2B2B2B', margin: 0 }}>
            모델하우스 방문 사전예약
          </p>
        </div>

        {/* ── Benefits ── */}
        <div style={{ borderTop: `1px solid ${C.divider}`, borderBottom: `1px solid ${C.divider}`, padding: isMobile ? '10px 18px 0' : '22px 30px 0' }}>

          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: isMobile ? '4px' : '14px' }}>
            <span style={{ fontFamily: ff, fontSize: '0.57rem', letterSpacing: '0.3em', color: C.accent, flexShrink: 0 }}>
              SPECIAL BENEFIT
            </span>
            <div style={{ flex: 1, height: '1px', background: C.divider }} />
          </div>

          <p
            style={{
              fontFamily: ff,
              fontSize: isMobile ? '1rem' : '1.5rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: C.text,
              marginBottom: isMobile ? '6px' : '20px',
              lineHeight: 1.2,
            }}
          >
            방문예약 고객 특별 혜택 !
          </p>

          {/* Benefit row 1 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              padding: isMobile ? '8px 0' : '20px 0',
              borderTop: `1px solid ${C.divider}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              {/* Gift icon — thin stroke */}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
                <rect x="1" y="5" width="11" height="7" stroke={C.textSub} strokeWidth="0.85" />
                <rect x="3" y="3" width="7" height="2" stroke={C.textSub} strokeWidth="0.85" />
                <path d="M6.5 3 C6.5 3 5.5 1.5 4.8 1.5 C4 1.5 3.2 2.2 3.2 3 C3.2 3.7 4 5 6.5 5" stroke={C.textSub} strokeWidth="0.8" fill="none" />
                <path d="M6.5 3 C6.5 3 7.5 1.5 8.2 1.5 C9 1.5 9.8 2.2 9.8 3 C9.8 3.7 9 5 6.5 5" stroke={C.textSub} strokeWidth="0.8" fill="none" />
                <line x1="6.5" y1="3" x2="6.5" y2="12" stroke={C.textSub} strokeWidth="0.8" />
              </svg>
              <span style={{ fontFamily: ff, fontSize: isMobile ? '0.82rem' : '0.88rem', fontWeight: 400, letterSpacing: '0.03em', color: '#2B2B2B' }}>
                방문예약 고객
              </span>
            </div>
            <span style={{ fontFamily: ff, fontSize: isMobile ? '1rem' : '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', color: C.text, flexShrink: 0 }}>
              사은품 증정
            </span>
          </div>

          {/* Benefit row 2 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              padding: isMobile ? '8px 0' : '20px 0',
              borderTop: `1px solid ${C.divider}`,
              marginBottom: '0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              {/* Voucher icon — thin stroke */}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
                <rect x="1.5" y="2" width="10" height="7" rx="0.7" stroke={C.textSub} strokeWidth="0.85" />
                <line x1="3.5" y1="4.5" x2="9.5" y2="4.5" stroke={C.textSub} strokeWidth="0.8" />
                <line x1="3.5" y1="6.5" x2="7" y2="6.5" stroke={C.textSub} strokeWidth="0.8" />
                <path d="M4.5 11 L6.5 9.5 L8.5 11" stroke={C.textSub} strokeWidth="0.85" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: ff, fontSize: isMobile ? '0.82rem' : '0.88rem', fontWeight: 400, letterSpacing: '0.03em', color: '#2B2B2B' }}>
                계약 고객
              </span>
            </div>
            <span style={{ fontFamily: ff, fontSize: isMobile ? '1rem' : '1.25rem', fontWeight: 700, letterSpacing: '-0.01em', color: C.text, flexShrink: 0 }}>
              신세계 상품권 증정
            </span>
          </div>

          <div style={{ height: '1px', background: C.divider }} />
        </div>

        {/* ── Body ── */}
        <div style={{ padding: isMobile ? '10px 18px 14px' : '24px 30px 30px' }}>

          {/* Notice */}
          <p
            style={{
              fontFamily: ff,
              fontSize: isMobile ? '0.72rem' : '0.84rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
              color: C.accent,
              lineHeight: 1.6,
              marginBottom: isMobile ? '8px' : '22px',
            }}
          >
            방문예약 시 담당자가 안내 전화 드립니다.
          </p>

          {/* Form / Success */}
          {submitted ? (
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '28px 0' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  border: `1px solid ${C.divider}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Check size={17} strokeWidth={1.5} style={{ color: C.text }} />
              </div>
              <h3
                style={{
                  fontFamily: ff,
                  fontSize: '1.18rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  color: C.text,
                  marginBottom: '10px',
                }}
              >
                예약이 완료되었습니다
              </h3>
              <p
                style={{
                  fontFamily: ff,
                  fontSize: '0.76rem',
                  lineHeight: 1.9,
                  letterSpacing: '0.04em',
                  color: C.textMid,
                  marginBottom: '24px',
                }}
              >
                방문 예약 확인 후 담당자가 연락드리겠습니다.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '11px 36px',
                  background: C.text,
                  color: '#FFFFFF',
                  fontFamily: ff,
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                닫기
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '8px' : '16px' }}>

              {/* 방문일시 */}
              <div>
                <label style={labelStyle}>
                  방문일시 <span style={{ color: C.accent }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <input
                      type="date"
                      min="2026-06-13"
                      className={`form-input w-full px-3 ${inputPy}`}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                    {errors.date && <p style={errorStyle}>{errors.date}</p>}
                  </div>
                  <div>
                    <select
                      className={`form-input w-full px-3 ${inputPy}`}
                      style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                    >
                      <option value="">시간 선택</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <p style={errorStyle}>{errors.time}</p>}
                  </div>
                </div>
                <p style={{ fontFamily: ff, fontSize: isMobile ? '0.68rem' : '0.85rem', fontWeight: 400, letterSpacing: '0.03em', color: '#2B2B2B', marginTop: '5px' }}>
                  ※ 방문예약은 6월 13일부터 가능합니다
                </p>
              </div>

              {/* 성함 */}
              <div>
                <label style={labelStyle}>
                  성함 <span style={{ color: C.accent }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className={`form-input w-full px-4 ${inputPy}`}
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p style={errorStyle}>{errors.name}</p>}
              </div>

              {/* 연락처 */}
              <div>
                <label style={labelStyle}>
                  연락처 <span style={{ color: C.accent }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    className={`form-input px-3 ${inputPy} text-center`}
                    style={{ ...inputStyle, width: '62px', flexShrink: 0 }}
                    value={form.phone1}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setForm({ ...form, phone1: v });
                      if (v.length === 3) phone2Ref.current?.focus();
                    }}
                  />
                  <span style={{ color: C.textSub, flexShrink: 0, fontSize: '0.9rem' }}>-</span>
                  <input
                    ref={phone2Ref}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="0000"
                    className={`form-input px-3 ${inputPy} text-center`}
                    style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                    value={form.phone2}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setForm({ ...form, phone2: v });
                      if (v.length === 4) phone3Ref.current?.focus();
                    }}
                  />
                  <span style={{ color: C.textSub, flexShrink: 0, fontSize: '0.9rem' }}>-</span>
                  <input
                    ref={phone3Ref}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="0000"
                    className={`form-input px-3 ${inputPy} text-center`}
                    style={{ ...inputStyle, flex: 1, minWidth: 0 }}
                    value={form.phone3}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setForm({ ...form, phone3: v });
                    }}
                  />
                </div>
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
              </div>

              {/* 개인정보 동의 */}
              <div style={{ borderTop: `1px solid ${C.divider}`, paddingTop: isMobile ? '12px' : '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ fontFamily: ff, fontSize: '0.7rem', letterSpacing: '0.06em', color: C.textMid }}>
                    개인정보 수집 및 이용 안내
                  </span>
                  <button
                    type="button"
                    onClick={() => setPrivacyOpen(!privacyOpen)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: ff,
                      fontSize: '0.64rem',
                      letterSpacing: '0.1em',
                      color: C.textSub,
                      padding: 0,
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                    }}
                  >
                    {privacyOpen ? '닫기' : '보기'}
                  </button>
                </div>

                <AnimatePresence>
                  {privacyOpen && (
                    <motion.div
                      key="privacy-text"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          fontFamily: ff,
                          fontSize: '0.61rem',
                          letterSpacing: '0.04em',
                          lineHeight: 1.85,
                          color: C.textSub,
                          paddingBottom: '12px',
                          marginBottom: '10px',
                          borderBottom: `1px solid ${C.divider}`,
                        }}
                      >
                        개인정보 수집 및 이용 안내<br />
                        수집 항목: 성명, 연락처 / 수집 목적: 방문예약 확인 및 안내 / 보유 기간: 상담 완료 후 1년<br />
                        수집 거부 시 방문예약 서비스 이용이 제한될 수 있습니다.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      border: form.agree ? 'none' : `1px solid ${C.inputBorder}`,
                      background: form.agree ? C.text : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                    }}
                    onClick={() => setForm({ ...form, agree: !form.agree })}
                  >
                    {form.agree && <Check size={9} strokeWidth={2.5} style={{ color: '#FFFFFF' }} />}
                  </div>
                  <span
                    style={{ fontFamily: ff, fontSize: '0.74rem', letterSpacing: '0.04em', color: C.textMid }}
                    onClick={() => setForm({ ...form, agree: !form.agree })}
                  >
                    개인정보 수집 및 이용에 동의합니다{' '}
                    <span style={{ color: C.accent }}>(필수)</span>
                  </span>
                </label>
                {errors.agree && (
                  <p style={{ ...errorStyle, marginLeft: '25px', marginTop: '6px' }}>{errors.agree}</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                style={{
                  width: '100%',
                  padding: isMobile ? '9px' : '14px',
                  background: C.text,
                  color: '#FFFFFF',
                  fontFamily: ff,
                  fontSize: '0.76rem',
                  letterSpacing: '0.22em',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '2px',
                }}
                whileHover={{ backgroundColor: '#111111' }}
                whileTap={{ scale: 0.99 }}
              >
                모델하우스 방문예약
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
