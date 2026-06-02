'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from './useInView';
import { Check } from 'lucide-react';

export default function Contact() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: formRef, inView: formInView } = useInView(0.1);

  const [form, setForm] = useState({ name: '', phone: '', message: '', agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = '성명을 입력해주세요';
    if (!form.phone.trim()) e.phone = '연락처를 입력해주세요';
    else if (!/^[0-9\-+\s]{9,15}$/.test(form.phone)) e.phone = '올바른 연락처를 입력해주세요';
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

  const labelStyle = {
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.82rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'rgba(13,33,55,0.75)',
  };

  const errorStyle = {
    fontFamily: "'Pretendard', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.05em',
    color: 'rgba(220,60,60,0.8)',
    marginTop: '4px',
  };

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
            <h2 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.01em', lineHeight: 1.1, color: '#0D2137', marginBottom: '24px' }}>
              상담신청
            </h2>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1rem', lineHeight: 1.9, letterSpacing: '0.03em', color: 'rgba(13,33,55,0.75)', marginBottom: '48px', maxWidth: '380px' }}>
              전문 분양 상담사가 연락드리겠습니다.<br />
              관심 평형과 문의사항을 남겨주시면<br />
              빠르게 안내해 드립니다.
            </p>

            <div className="space-y-3">
              {[
                { title: '방문 상담', desc: '모델하우스 방문 시 전담 상담사 안내' },
                { title: '맞춤 상담', desc: '청약 자격·일정·평형 선택 상담 가능' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-5"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(26,158,212,0.15)', boxShadow: '0 2px 12px rgba(26,158,212,0.06)', transition: 'all 0.3s ease' }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={titleInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.55 }}
                >
                  <div style={{ width: '20px', height: '20px', border: '1px solid rgba(26,158,212,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'rgba(26,158,212,0.7)' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1rem', fontWeight: 500, letterSpacing: '0.05em', color: '#0D2137', marginBottom: '4px' }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.94rem', lineHeight: 1.7, color: 'rgba(13,33,55,0.7)' }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div ref={formRef} initial={{ opacity: 0, x: 24 }} animate={formInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }}>
            {submitted ? (
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block mb-2" style={labelStyle}>성명 <span style={{ color: '#1A9ED4' }}>*</span></label>
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
                  <label className="block mb-2" style={labelStyle}>연락처 <span style={{ color: '#1A9ED4' }}>*</span></label>
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
                  <label className="block mb-2" style={labelStyle}>문의내용</label>
                  <textarea
                    rows={4}
                    placeholder="청약 일정, 분양가, 평면 등 궁금하신 사항을 작성해 주세요."
                    className="form-input w-full px-4 py-3.5 resize-none"
                    style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem' }}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {/* Privacy */}
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
                      style={{ width: '16px', height: '16px', border: form.agree ? 'none' : '1px solid rgba(26,158,212,0.35)', background: form.agree ? '#1A9ED4' : 'transparent', cursor: 'pointer' }}
                      onClick={() => setForm({ ...form, agree: !form.agree })}
                    >
                      {form.agree && <Check size={10} style={{ color: '#FFFFFF' }} strokeWidth={3} />}
                    </div>
                    <span
                      style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.78rem', cursor: 'pointer', color: 'rgba(13,33,55,0.78)' }}
                      onClick={() => setForm({ ...form, agree: !form.agree })}
                    >
                      개인정보 수집 및 이용에 동의합니다 <span style={{ color: '#1A9ED4' }}>*</span>
                    </span>
                  </label>
                  {errors.agree && <p style={{ ...errorStyle, marginLeft: '28px', marginTop: '8px' }}>{errors.agree}</p>}
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4"
                  style={{ background: '#1A9ED4', color: '#FFFFFF', fontFamily: "'Pretendard', sans-serif", fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
                  whileHover={{ scale: 1.01, backgroundColor: '#1565A0' }}
                  whileTap={{ scale: 0.99 }}
                >
                  상담 신청하기
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
