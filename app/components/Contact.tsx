'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Check, Phone, Gift, Award } from 'lucide-react';

// 시간 슬롯: 10:00 ~ 18:00, 30분 단위
const timeSlots: string[] = [];
for (let h = 10; h <= 18; h++) {
  timeSlots.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 18) timeSlots.push(`${String(h).padStart(2, '0')}:30`);
}

export default function Contact() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: formRef, inView: formInView } = useInView(0.1);

  const [activeTab, setActiveTab] = useState<'consult' | 'visit'>('consult');

  // 상담신청 폼
  const [form, setForm] = useState({ name: '', phone: '', message: '', agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 방문예약 폼
  const [visitForm, setVisitForm] = useState({ name: '', phone: '', date: '', time: '', agree: false });
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [visitErrors, setVisitErrors] = useState<Record<string, string>>({});

  // Hero의 방문예약 버튼 클릭 시 탭 전환
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === 'visit') setActiveTab('visit');
    };
    window.addEventListener('switchContactTab', handler);
    return () => window.removeEventListener('switchContactTab', handler);
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = '성명을 입력해주세요';
    if (!form.phone.trim()) e.phone = '연락처를 입력해주세요';
    else if (!/^[0-9\-+\s]{9,15}$/.test(form.phone)) e.phone = '올바른 연락처를 입력해주세요';
    if (!form.agree) e.agree = '개인정보 수집 및 이용에 동의해주세요';
    return e;
  };

  const validateVisit = () => {
    const e: Record<string, string> = {};
    if (!visitForm.name.trim()) e.name = '성명을 입력해주세요';
    if (!visitForm.phone.trim()) e.phone = '연락처를 입력해주세요';
    else if (!/^[0-9\-+\s]{9,15}$/.test(visitForm.phone)) e.phone = '올바른 연락처를 입력해주세요';
    if (!visitForm.date) e.date = '방문일자를 선택해주세요';
    if (!visitForm.time) e.time = '방문시간을 선택해주세요';
    if (!visitForm.agree) e.agree = '개인정보 수집 및 이용에 동의해주세요';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateVisit();
    if (Object.keys(errs).length > 0) { setVisitErrors(errs); return; }
    setVisitErrors({});
    setVisitSubmitted(true);
  };

  const labelStyle = {
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.82rem',
    letterSpacing: '0.1em',
    color: 'rgba(13,33,55,0.75)',
  };

  const errorStyle = {
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.05em',
    color: 'rgba(220,60,60,0.8)',
    marginTop: '4px',
  };

  const PrivacyBlock = ({
    agree,
    onToggle,
    error,
  }: {
    agree: boolean;
    onToggle: () => void;
    error?: string;
  }) => (
    <div style={{ border: '1px solid rgba(26,158,212,0.15)', padding: '16px', background: '#FFFFFF' }}>
      <div
        className="overflow-y-auto mb-4"
        style={{ maxHeight: '88px', fontFamily: "'Pretendard', sans-serif", fontSize: '0.62rem', letterSpacing: '0.04em', lineHeight: 1.85, color: 'rgba(13,33,55,0.65)' }}
      >
        개인정보 수집 및 이용 안내<br />
        수집 항목: 성명, 연락처, 문의내용 / 수집 목적: 분양 상담 및 안내 / 보유 기간: 상담 완료 후 1년<br />
        수집 거부 시 상담 서비스 이용이 제한될 수 있습니다.
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className="flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{ width: '16px', height: '16px', border: agree ? 'none' : '1px solid rgba(26,158,212,0.35)', background: agree ? '#1A9ED4' : 'transparent', cursor: 'pointer' }}
          onClick={onToggle}
        >
          {agree && <Check size={10} style={{ color: '#FFFFFF' }} strokeWidth={3} />}
        </div>
        <span
          style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.78rem', cursor: 'pointer', color: 'rgba(13,33,55,0.78)' }}
          onClick={onToggle}
        >
          개인정보 수집 및 이용에 동의합니다 <span style={{ color: '#1A9ED4' }}>(필수)</span>
        </span>
      </label>
      {error && <p style={{ ...errorStyle, marginLeft: '28px', marginTop: '8px' }}>{error}</p>}
    </div>
  );

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: '#F5FAFF' }}>
      <div className="absolute inset-0 geometric-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left */}
          <motion.div ref={titleRef} initial={{ opacity: 0, x: -24 }} animate={titleInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="gold-line-left" />
              <span className="section-label">CONSULTATION</span>
            </div>
            <h2 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.01em', lineHeight: 1.1, color: '#0D2137', marginBottom: '16px' }}>
              상담신청
            </h2>

            {/* 대표번호 */}
            <a
              href="tel:16660654"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '28px', padding: '10px 22px', border: '1px solid rgba(26,158,212,0.3)', background: 'rgba(26,158,212,0.06)' }}
            >
              <Phone size={16} style={{ color: '#1A9ED4' }} />
              <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.1em', color: '#1A9ED4' }}>
                1666-0654
              </span>
            </a>

            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1rem', lineHeight: 1.9, letterSpacing: '0.03em', color: 'rgba(13,33,55,0.75)', marginBottom: '40px', maxWidth: '380px' }}>
              전문 분양 상담사가 연락드리겠습니다.<br />
              관심 평형과 문의사항을 남겨주시면<br />
              빠르게 안내해 드립니다.
            </p>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.55 }}
              style={{
                background: 'linear-gradient(135deg, #0D2137 0%, #103460 100%)',
                border: '1px solid rgba(26,158,212,0.3)',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* 장식 링 */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', opacity: 0.07, pointerEvents: 'none' }}>
                <svg viewBox="0 0 150 150" fill="none">
                  <circle cx="150" cy="0" r="80" stroke="#1A9ED4" strokeWidth="1"/>
                  <circle cx="150" cy="0" r="130" stroke="#1A9ED4" strokeWidth="1"/>
                </svg>
              </div>

              {/* 배지 */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26,158,212,0.18)', border: '1px solid rgba(26,158,212,0.4)', padding: '5px 14px', marginBottom: '18px' }}>
                <div style={{ width: '5px', height: '5px', background: '#1A9ED4', borderRadius: '50%' }} />
                <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', color: '#1A9ED4' }}>
                  SPECIAL BENEFIT
                </span>
              </div>

              <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.04em', color: '#FFFFFF', lineHeight: 1.45, marginBottom: '24px' }}>
                방문 예약 고객<br />
                <span style={{ color: '#1A9ED4' }}>특별 혜택</span>
              </p>

              <div style={{ borderTop: '1px solid rgba(26,158,212,0.2)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', border: '1px solid rgba(26,158,212,0.4)', background: 'rgba(26,158,212,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Gift size={18} style={{ color: '#1A9ED4' }} />
                  </div>
                  <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.94rem', letterSpacing: '0.03em', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                    상담완료 시 방문사은품 증정
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', border: '1px solid rgba(26,158,212,0.4)', background: 'rgba(26,158,212,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Award size={18} style={{ color: '#1A9ED4' }} />
                  </div>
                  <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.94rem', letterSpacing: '0.03em', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
                    계약완료 시 백화점상품권 증정
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Tab + Form */}
          <motion.div ref={formRef} initial={{ opacity: 0, x: 24 }} animate={formInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }}>

            {/* Tab selector */}
            <div className="flex mb-6" style={{ borderBottom: '2px solid rgba(26,158,212,0.15)' }}>
              {[
                { key: 'consult', label: '상담신청' },
                { key: 'visit', label: '방문예약' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'consult' | 'visit')}
                  style={{
                    padding: '12px 28px',
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.88rem',
                    letterSpacing: '0.08em',
                    fontWeight: activeTab === tab.key ? 600 : 400,
                    color: activeTab === tab.key ? '#1A9ED4' : 'rgba(13,33,55,0.5)',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.key ? '2px solid #1A9ED4' : '2px solid transparent',
                    marginBottom: '-2px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 상담신청 탭 */}
            {activeTab === 'consult' && (
              submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-20"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ width: '56px', height: '56px', border: '1px solid rgba(26,158,212,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                    <Check style={{ color: '#1A9ED4' }} size={24} />
                  </div>
                  <h3 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1.8rem', letterSpacing: '-0.01em', color: '#0D2137', marginBottom: '16px' }}>
                    신청이 완료되었습니다
                  </h3>
                  <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(13,33,55,0.75)' }}>
                    담당자가 빠른 시간 내에 연락드리겠습니다.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="consult-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name */}
                  <div>
                    <label className="block mb-2" style={labelStyle}>
                      성명 <span style={{ color: '#1A9ED4', fontSize: '0.78rem' }}>(필수)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      className="form-input w-full px-4 py-3.5"
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem' }}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p style={errorStyle}>{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2" style={labelStyle}>
                      연락처 <span style={{ color: '#1A9ED4', fontSize: '0.78rem' }}>(필수)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      className="form-input w-full px-4 py-3.5"
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem' }}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block mb-2" style={labelStyle}>
                      문의내용 <span style={{ color: 'rgba(13,33,55,0.45)', fontSize: '0.78rem' }}>(선택)</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="청약 일정, 평면 등 궁금하신 사항을 작성해 주세요."
                      className="form-input w-full px-4 py-3.5 resize-none"
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem' }}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {/* Privacy */}
                  <PrivacyBlock
                    agree={form.agree}
                    onToggle={() => setForm({ ...form, agree: !form.agree })}
                    error={errors.agree}
                  />

                  <motion.button
                    type="submit"
                    className="w-full py-4"
                    style={{ background: '#1A9ED4', color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
                    whileHover={{ scale: 1.01, backgroundColor: '#1565A0' }}
                    whileTap={{ scale: 0.99 }}
                  >
                    상담 신청하기
                  </motion.button>
                </motion.form>
              )
            )}

            {/* 방문예약 탭 */}
            {activeTab === 'visit' && (
              visitSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-20"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ width: '56px', height: '56px', border: '1px solid rgba(26,158,212,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                    <Check style={{ color: '#1A9ED4' }} size={24} />
                  </div>
                  <h3 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1.8rem', letterSpacing: '-0.01em', color: '#0D2137', marginBottom: '16px' }}>
                    예약이 완료되었습니다
                  </h3>
                  <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.85rem', lineHeight: 1.9, color: 'rgba(13,33,55,0.75)' }}>
                    방문 예약 확인 후 담당자가 연락드리겠습니다.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="visit-form"
                  onSubmit={handleVisitSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Date + Time */}
                  <div>
                    <label className="block mb-2" style={labelStyle}>
                      방문일시 <span style={{ color: '#1A9ED4', fontSize: '0.78rem' }}>(필수)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="date"
                          min="2025-06-13"
                          className="form-input w-full px-4 py-3.5"
                          style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem', cursor: 'pointer' }}
                          value={visitForm.date}
                          onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                        />
                        {visitErrors.date && <p style={errorStyle}>{visitErrors.date}</p>}
                      </div>
                      <div>
                        <select
                          className="form-input w-full px-4 py-3.5"
                          style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem', cursor: 'pointer', appearance: 'auto' }}
                          value={visitForm.time}
                          onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}
                        >
                          <option value="">시간 선택</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        {visitErrors.time && <p style={errorStyle}>{visitErrors.time}</p>}
                      </div>
                    </div>
                    <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.68rem', letterSpacing: '0.04em', color: 'rgba(13,33,55,0.5)', marginTop: '6px' }}>
                      ※ 방문예약은 6월 13일부터 가능합니다
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block mb-2" style={labelStyle}>
                      성명 <span style={{ color: '#1A9ED4', fontSize: '0.78rem' }}>(필수)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      className="form-input w-full px-4 py-3.5"
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem' }}
                      value={visitForm.name}
                      onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                    />
                    {visitErrors.name && <p style={errorStyle}>{visitErrors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2" style={labelStyle}>
                      연락처 <span style={{ color: '#1A9ED4', fontSize: '0.78rem' }}>(필수)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      className="form-input w-full px-4 py-3.5"
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem' }}
                      value={visitForm.phone}
                      onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                    />
                    {visitErrors.phone && <p style={errorStyle}>{visitErrors.phone}</p>}
                  </div>

                  {/* Privacy */}
                  <PrivacyBlock
                    agree={visitForm.agree}
                    onToggle={() => setVisitForm({ ...visitForm, agree: !visitForm.agree })}
                    error={visitErrors.agree}
                  />

                  <motion.button
                    type="submit"
                    className="w-full py-4"
                    style={{ background: '#1A9ED4', color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
                    whileHover={{ scale: 1.01, backgroundColor: '#1565A0' }}
                    whileTap={{ scale: 0.99 }}
                  >
                    방문 예약하기
                  </motion.button>
                </motion.form>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
