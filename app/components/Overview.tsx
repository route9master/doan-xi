'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useInView, useCountUp } from './useInView';

const stats = [
  { value: 2293, unit: '세대', label: '총 세대수', suffix: '' },
  { value: 42, unit: '층', label: '최고 층수', suffix: '' },
  { value: 2029, unit: '년', label: '입주 예정', suffix: '' },
  { value: 0, unit: '', label: '단지 구성', suffix: '', override: '1,2단지' },
];

const infoRows = [
  { label: '아파트명', value: '도안자이 센텀리체' },
  { label: '위치', value: '대전광역시 유성구 용계동 267-3번지 일원' },
  { label: '시행사', value: '에이치엠도안(26BL) / (주)에이치엠파트너스(30BL)' },
  { label: '시공사', value: 'GS건설 주식회사' },
  { label: '규모', value: '지하 2층 ~ 지상 최고 42층' },
  { label: '세대수', value: '2,293세대 (1단지 1,209 / 2단지 1,084)' },
  { label: '용도', value: '공동주택 (아파트)' },
  { label: '입주예정', value: '2029년 12월' },
];

function StatCard({ value, unit, label, suffix, delay, override }: {
  value: number; unit: string; label: string; suffix: string; delay: number; override?: string;
}) {
  const { ref, inView } = useInView(0.3);
  const count = useCountUp(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="relative inline-block mb-3">
        {override ? (
          <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', letterSpacing: '0.04em', lineHeight: 1, color: '#1A9ED4' }}>
            {override}
          </span>
        ) : (
          <>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', letterSpacing: '0.04em', lineHeight: 1, color: '#1A9ED4' }}>
              {count.toLocaleString()}{suffix}
            </span>
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.9rem', fontWeight: 400, marginLeft: '4px', color: 'rgba(26,158,212,0.9)' }}>
              {unit}
            </span>
          </>
        )}
      </div>
      <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(13,33,55,0.65)' }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function Overview() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: tableRef, inView: tableInView } = useInView(0.1);

  return (
    <section id="overview" className="section-padding relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 geometric-bg opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div ref={titleRef} className="mb-20" initial={{ opacity: 0, y: 24 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75 }}>
          <div className="flex items-center gap-4 mb-5">
            <div className="gold-line-left" />
            <span className="section-label">PROJECT OVERVIEW</span>
          </div>
          <h2 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.01em', lineHeight: 1.1, color: '#0D2137' }}>
            사업개요
          </h2>
          <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1rem', lineHeight: 1.9, letterSpacing: '0.03em', color: 'rgba(13,33,55,0.85)', marginTop: '12px' }}>
            GS건설이 시공하는 대전 유성구 프리미엄 주거 단지
          </p>
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-20 pb-16" style={{ borderBottom: '1px solid rgba(26,158,212,0.12)' }}>
          {stats.map((s, i) => <StatCard key={i} {...s} delay={i * 0.1} />)}
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <motion.div ref={tableRef} initial={{ opacity: 0, x: -24 }} animate={tableInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }}>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,158,212,0.9)', marginBottom: '28px' }}>
              PROJECT DETAILS
            </p>
            <div>
              {infoRows.map((row, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  style={{ borderBottom: '1px solid rgba(26,158,212,0.1)', padding: '14px 0' }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={tableInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                >
                  <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.85rem', letterSpacing: '0.05em', color: 'rgba(26,158,212,0.9)', flexShrink: 0, width: '104px' }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.94rem', letterSpacing: '0.02em', color: 'rgba(13,33,55,0.85)', flex: 1 }}>
                    {row.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative overflow-hidden" style={{ height: '480px' }} initial={{ opacity: 0, x: 24 }} animate={tableInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.75 }}>
            <img src="/images/card1.jpg" alt="도안자이 센텀리체" className="w-full h-full object-cover" style={{ filter: 'brightness(0.88) saturate(0.9)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,33,55,0.65) 0%, transparent 60%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-2">
                <div style={{ width: '20px', height: '1px', background: 'rgba(26,158,212,0.8)' }} />
                <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.58rem', letterSpacing: '0.25em', color: 'rgba(26,158,212,0.9)' }}>
                  DOAN XI CENTUM RICHE
                </span>
              </div>
              <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.88rem', fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.9)' }}>
                1단지 1,209세대 · 2단지 1,084세대
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
