'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useInView } from './useInView';

const paymentSteps = [
  {
    step: '01',
    title: '계약금',
    percent: '10%',
    detail: '1차 1,000만원 (계약 시)\n2·3차 분납 가능',
  },
  {
    step: '02',
    title: '중도금',
    percent: '60%',
    detail: '이자 후불제 적용\n총 6회 분납',
  },
  {
    step: '03',
    title: '잔금',
    percent: '30%',
    detail: '입주 시 납부\n2029년 10월, 12월 예정',
  },
];

const salesDetails = [
  { label: '공급 유형', value: '민영 일반 분양' },
  { label: '전매제한', value: '소유권 이전 등기 시까지 (6개월)' },
  { label: '거주의무', value: '해당 없음' },
  { label: '중도금 대출', value: '이자 후불제 (입주 시 정산)' },
  { label: '계약금 분납', value: '1차 1,000만원 → 2차 → 3차 분납' },
  { label: '입주예정일', value: '2029년 10월, 12월' },
];

export default function Sales() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: contentRef, inView: contentInView } = useInView(0.1);

  return (
    <section id="sales" className="section-padding relative overflow-hidden" style={{ background: '#EBF5FB' }}>
      <div className="absolute inset-0 geometric-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="gold-line-left" />
            <span className="section-label">SALES INFORMATION</span>
          </div>
          <h2
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              color: '#0D2137',
            }}
          >
            분양안내
          </h2>
          {/* 대표번호 */}
          <a
            href="tel:16660654"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '20px', padding: '10px 22px', border: '1px solid rgba(26,158,212,0.3)', background: 'rgba(26,158,212,0.05)' }}
          >
            <Phone size={16} style={{ color: '#1A9ED4' }} />
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.1em', color: '#1A9ED4' }}>
              대표전화 1666-0654
            </span>
          </a>
        </motion.div>

        {/* Payment steps */}
        <div ref={contentRef}>
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65 }}
          >
            <p
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(26,158,212,0.85)',
                marginBottom: '24px',
              }}
            >
              PAYMENT SCHEDULE
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {paymentSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="p-6 relative"
                  style={{
                    background: i === 0 ? 'rgba(26,158,212,0.07)' : '#FFFFFF',
                    border: `1px solid ${i === 0 ? 'rgba(26,158,212,0.25)' : 'rgba(26,158,212,0.12)'}`,
                    boxShadow: '0 2px 12px rgba(26,158,212,0.05)',
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={contentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.55 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: '0.55rem',
                          letterSpacing: '0.2em',
                          color: 'rgba(13,33,55,0.6)',
                          marginBottom: '4px',
                        }}
                      >
                        STEP {step.step}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: '1rem',
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                          color: '#0D2137',
                        }}
                      >
                        {step.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: '2.2rem',
                        letterSpacing: '0.02em',
                        lineHeight: 1,
                        color: '#1A9ED4',
                      }}
                    >
                      {step.percent}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '0.94rem',
                      lineHeight: 1.8,
                      color: 'rgba(13,33,55,0.85)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {step.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Conditions table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.65 }}
          >
            <p
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(26,158,212,0.85)',
                marginBottom: '20px',
              }}
            >
              SALES CONDITIONS
            </p>
            <div style={{ border: '1px solid rgba(26,158,212,0.15)' }} className="grid md:grid-cols-2 gap-0">
              {salesDetails.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start p-4 transition-colors duration-200 hover:bg-gold/5"
                  style={{
                    borderBottom: '1px solid rgba(26,158,212,0.1)',
                    borderRight: i % 2 === 0 ? '1px solid rgba(26,158,212,0.1)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em',
                      color: 'rgba(26,158,212,0.9)',
                      flexShrink: 0,
                      width: '112px',
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: '0.94rem',
                      lineHeight: 1.7,
                      color: 'rgba(13,33,55,0.85)',
                      flex: 1,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.04em',
              lineHeight: 1.9,
              color: 'rgba(13,33,55,0.6)',
              marginTop: '24px',
            }}
          >
            * 분양 관련 세부사항은 입주자 모집공고 시 확정됩니다. 계약금 분납 방식 및 중도금 이자후불제는 변경될 수 있습니다.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
