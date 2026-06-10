'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

const timeSlots: string[] = [];
for (let h = 10; h <= 18; h++) {
  timeSlots.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 18) timeSlots.push(`${String(h).padStart(2, '0')}:30`);
}

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

  const phone2Ref = useRef<HTMLInputElement>(null);
  const phone3Ref = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.82rem',
    letterSpacing: '0.1em',
    color: 'rgba(13,33,55,0.75)',
    display: 'block',
    marginBottom: '8px',
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.05em',
    color: 'rgba(220,60,60,0.85)',
    marginTop: '4px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="닫기"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10,
            padding: '4px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1,
          }}
        >
          <X size={20} />
        </button>

        {/* ── Header (navy gradient) ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0D2137 0%, #103460 100%)',
            padding: '26px 28px 20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative rings */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '160px', opacity: 0.07, pointerEvents: 'none' }}>
            <svg viewBox="0 0 160 160" fill="none">
              <circle cx="160" cy="0" r="80" stroke="#1A9ED4" strokeWidth="1" />
              <circle cx="160" cy="0" r="130" stroke="#1A9ED4" strokeWidth="1" />
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '7px' }}>
            <img
              src="/images/xi_logo.png"
              alt="Xi"
              style={{ height: '26px', objectFit: 'contain', flexShrink: 0 }}
            />
            <div style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <h2
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '1.18rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#FFFFFF',
                margin: 0,
                lineHeight: 1,
              }}
            >
              방문예약 <span style={{ color: '#1A9ED4' }}>사은품</span> 증정
            </h2>
          </div>

          <p
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: '0.67rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
            }}
          >
            DOOAN XI CENTRUM RICHEE — 모델하우스 방문 사전예약
          </p>
        </div>

        {/* ── Benefits section ── */}
        <div
          style={{
            background: 'linear-gradient(180deg, #0A1E33 0%, #0F2D4A 100%)',
            padding: '20px 28px 22px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.04,
              backgroundImage:
                'linear-gradient(rgba(26,158,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,158,212,1) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              pointerEvents: 'none',
            }}
          />

          {/* Section label row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div style={{ width: '4px', height: '4px', background: '#1A9ED4', borderRadius: '50%', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: '#1A9ED4',
              }}
            >
              SPECIAL BENEFIT
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(26,158,212,0.2)' }} />
          </div>

          <p
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: '0.98rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: '#FFFFFF',
              marginBottom: '16px',
              lineHeight: 1.3,
            }}
          >
            방문예약 고객 <span style={{ color: '#1A9ED4' }}>특별 혜택</span>
          </p>

          {/* Benefit cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>

            {/* 혜택 1 — 사은품 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'rgba(26,158,212,0.08)',
                border: '1px solid rgba(26,158,212,0.22)',
                padding: '13px 16px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'rgba(26,158,212,0.14)',
                  border: '1px solid rgba(26,158,212,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1.5" y="7" width="15" height="9.5" stroke="#1A9ED4" strokeWidth="1.2" />
                  <rect x="4" y="4.5" width="10" height="2.5" stroke="#1A9ED4" strokeWidth="1.2" />
                  <path d="M9 4.5 C9 4.5 7.5 2.5 6.5 2.5 C5.5 2.5 4.5 3.3 4.5 4.5 C4.5 5.5 5.5 7 9 7" stroke="#1A9ED4" strokeWidth="1.1" fill="none" />
                  <path d="M9 4.5 C9 4.5 10.5 2.5 11.5 2.5 C12.5 2.5 13.5 3.3 13.5 4.5 C13.5 5.5 12.5 7 9 7" stroke="#1A9ED4" strokeWidth="1.1" fill="none" />
                  <line x1="9" y1="4.5" x2="9" y2="16.5" stroke="#1A9ED4" strokeWidth="1.1" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.48)',
                    marginBottom: '3px',
                  }}
                >
                  방문예약 후 방문 시
                </p>
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: '#1A9ED4' }}>사은품</span> 증정
                </p>
              </div>
            </div>

            {/* 혜택 2 — 신세계 상품권 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'rgba(26,158,212,0.08)',
                border: '1px solid rgba(26,158,212,0.22)',
                padding: '13px 16px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'rgba(26,158,212,0.14)',
                  border: '1px solid rgba(26,158,212,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="3.5" width="14" height="9" rx="1" stroke="#1A9ED4" strokeWidth="1.2" />
                  <line x1="5" y1="7" x2="13" y2="7" stroke="#1A9ED4" strokeWidth="1" />
                  <line x1="5" y1="9.5" x2="10" y2="9.5" stroke="#1A9ED4" strokeWidth="1" />
                  <path d="M6 15.5 L9 13.5 L12 15.5" stroke="#1A9ED4" strokeWidth="1.2" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.48)',
                    marginBottom: '3px',
                  }}
                >
                  계약 시
                </p>
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: '#1A9ED4' }}>신세계 상품권</span> 증정
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '20px 24px 28px' }}>

          {/* Target badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              background: 'rgba(26,158,212,0.05)',
              border: '1px solid rgba(26,158,212,0.15)',
              padding: '12px 14px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                background: '#1A9ED4',
                color: '#FFFFFF',
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                padding: '3px 11px',
                borderRadius: '20px',
                marginTop: '1px',
              }}
            >
              대상
            </div>
            <p
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.82rem',
                letterSpacing: '0.03em',
                color: 'rgba(13,33,55,0.82)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              방문예약 시 담당자가 안내 전화 드립니다.
            </p>
          </div>

          {/* ── Form / Success ── */}
          {submitted ? (
            <motion.div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '28px 0' }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(26,158,212,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                <Check style={{ color: '#1A9ED4' }} size={22} />
              </div>
              <h3
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '1.35rem',
                  letterSpacing: '-0.01em',
                  color: '#0D2137',
                  marginBottom: '10px',
                }}
              >
                예약이 완료되었습니다
              </h3>
              <p
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.82rem',
                  lineHeight: 1.9,
                  color: 'rgba(13,33,55,0.7)',
                  marginBottom: '20px',
                }}
              >
                방문 예약 확인 후 담당자가 연락드리겠습니다.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '10px 32px',
                  background: '#0D2137',
                  color: '#FFFFFF',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                닫기
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* 방문일시 */}
              <div>
                <label style={labelStyle}>
                  방문일시 <span style={{ color: '#1A9ED4' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <input
                      type="date"
                      min="2026-06-13"
                      className="form-input w-full px-3 py-3"
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.88rem', cursor: 'pointer' }}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                    {errors.date && <p style={errorStyle}>{errors.date}</p>}
                  </div>
                  <div>
                    <select
                      className="form-input w-full px-3 py-3"
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.88rem', cursor: 'pointer', appearance: 'auto' }}
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
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.67rem',
                    letterSpacing: '0.04em',
                    color: 'rgba(13,33,55,0.45)',
                    marginTop: '5px',
                  }}
                >
                  ※ 방문예약은 6월 13일부터 가능합니다
                </p>
              </div>

              {/* 성함 */}
              <div>
                <label style={labelStyle}>
                  성함 <span style={{ color: '#1A9ED4' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="form-input w-full px-4 py-3"
                  style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.92rem' }}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p style={errorStyle}>{errors.name}</p>}
              </div>

              {/* 연락처 (3분할) */}
              <div>
                <label style={labelStyle}>
                  연락처 <span style={{ color: '#1A9ED4' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    className="form-input px-3 py-3 text-center"
                    style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.92rem', width: '62px', flexShrink: 0 }}
                    value={form.phone1}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setForm({ ...form, phone1: v });
                      if (v.length === 3) phone2Ref.current?.focus();
                    }}
                  />
                  <span style={{ color: 'rgba(13,33,55,0.3)', fontSize: '1.1rem', flexShrink: 0 }}>-</span>
                  <input
                    ref={phone2Ref}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="0000"
                    className="form-input px-3 py-3 text-center"
                    style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.92rem', flex: 1, minWidth: 0 }}
                    value={form.phone2}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setForm({ ...form, phone2: v });
                      if (v.length === 4) phone3Ref.current?.focus();
                    }}
                  />
                  <span style={{ color: 'rgba(13,33,55,0.3)', fontSize: '1.1rem', flexShrink: 0 }}>-</span>
                  <input
                    ref={phone3Ref}
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="0000"
                    className="form-input px-3 py-3 text-center"
                    style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.92rem', flex: 1, minWidth: 0 }}
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
              <div style={{ border: '1px solid rgba(26,158,212,0.15)', padding: '14px', background: '#FFFFFF' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      color: 'rgba(13,33,55,0.7)',
                    }}
                  >
                    개인정보 수집 및 이용 안내
                  </span>
                  <button
                    type="button"
                    onClick={() => setPrivacyOpen(!privacyOpen)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(26,158,212,0.3)',
                      padding: '2px 10px',
                      cursor: 'pointer',
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      color: '#1A9ED4',
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
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: '0.62rem',
                          letterSpacing: '0.04em',
                          lineHeight: 1.85,
                          color: 'rgba(13,33,55,0.65)',
                          paddingBottom: '12px',
                          marginBottom: '10px',
                          borderBottom: '1px solid rgba(26,158,212,0.1)',
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
                      width: '16px',
                      height: '16px',
                      border: form.agree ? 'none' : '1px solid rgba(26,158,212,0.35)',
                      background: form.agree ? '#1A9ED4' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => setForm({ ...form, agree: !form.agree })}
                  >
                    {form.agree && <Check size={10} style={{ color: '#FFFFFF' }} strokeWidth={3} />}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '0.78rem',
                      color: 'rgba(13,33,55,0.78)',
                    }}
                    onClick={() => setForm({ ...form, agree: !form.agree })}
                  >
                    개인정보 수집 및 이용에 동의합니다{' '}
                    <span style={{ color: '#1A9ED4' }}>(필수)</span>
                  </span>
                </label>
                {errors.agree && (
                  <p style={{ ...errorStyle, marginLeft: '26px', marginTop: '6px' }}>{errors.agree}</p>
                )}
              </div>

              {/* 제출 버튼 */}
              <motion.button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  background: '#0D2137',
                  color: '#FFFFFF',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.82rem',
                  letterSpacing: '0.18em',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '2px',
                }}
                whileHover={{ backgroundColor: '#1565A0' }}
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
