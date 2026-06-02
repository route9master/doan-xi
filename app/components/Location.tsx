'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';

const locationFeatures = [
  {
    category: '교통',
    categoryEn: 'TRANSPORTATION',
    items: [
      { name: '대전 도시철도 트램', detail: '도보 5분 · 2028년 개통 예정' },
      { name: '유성온천역 (1호선)', detail: '차량 약 10분' },
      { name: '대전-세종 BRT', detail: '직결 이용 가능' },
      { name: '유성IC · 북유성IC', detail: '고속도로 근접' },
    ],
  },
  {
    category: '교육',
    categoryEn: 'EDUCATION',
    items: [
      { name: '도안초등학교', detail: '도보권' },
      { name: '도안중학교', detail: '단지 인근' },
      { name: '충남대학교', detail: '차량 약 10분' },
      { name: 'KAIST', detail: '차량 약 15분' },
    ],
  },
  {
    category: '생활편의',
    categoryEn: 'CONVENIENCE',
    items: [
      { name: '롯데마트', detail: '차량 약 5분' },
      { name: '홈플러스', detail: '차량 약 7분' },
      { name: 'NC백화점', detail: '차량 약 10분' },
      { name: '롯데시네마', detail: '차량 약 10분' },
    ],
  },
  {
    category: '의료',
    categoryEn: 'MEDICAL',
    items: [
      { name: '건양대학교병원', detail: '차량 약 10분' },
      { name: '충남대학교병원', detail: '차량 약 15분' },
      { name: '유성선병원', detail: '차량 약 10분' },
      { name: '인근 의원·약국', detail: '도보권 다수' },
    ],
  },
];

export default function Location() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: gridRef, inView: gridInView } = useInView(0.1);
  const [mapOpen, setMapOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.body.style.overflow = mapOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mapOpen]);

  return (
    <section id="location" className="section-padding relative overflow-hidden" style={{ background: '#EBF5FB' }}>
      <div className="absolute inset-0 geometric-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div ref={titleRef} className="mb-16" initial={{ opacity: 0, y: 24 }} animate={titleInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75 }}>
          <div className="flex items-center gap-4 mb-5">
            <div className="gold-line-left" />
            <span className="section-label">PRIME LOCATION</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.01em', lineHeight: 1.1, color: '#0D2137' }}>
                입지환경
              </h2>
              <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1rem', lineHeight: 1.9, color: 'rgba(13,33,55,0.75)', marginTop: '12px' }}>
                대전광역시 유성구 용계동
              </p>
            </div>
            <span
              className="hidden lg:block"
              style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.88rem', letterSpacing: '0.08em', color: 'rgba(13,33,55,0.6)' }}
            >
              267-3번지 일원
            </span>
          </div>
        </motion.div>

        {/* Two-column: map + feature grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* 지도 이미지 */}
          <motion.div
            className="relative overflow-hidden cursor-pointer"
            style={{ height: '440px', border: '1px solid rgba(26,158,212,0.15)', boxShadow: '0 4px 24px rgba(26,158,212,0.08)' }}
            initial={{ opacity: 0, x: -24 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.75 }}
            onClick={() => setMapOpen(true)}
          >
            <img
              src="/images/map.jpg"
              alt="도안자이 센텀리체 입지환경"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* 확대 힌트 */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(13,33,55,0.35)' }}
            >
              <div
                style={{
                  border: '1px solid rgba(26,158,212,0.7)',
                  padding: '8px 20px',
                  background: 'rgba(255,255,255,0.85)',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: '#1A9ED4',
                }}
              >
                지도 전체 보기
              </div>
            </div>
            <div className="absolute bottom-5 left-5">
              <div className="flex items-center gap-2 mb-1">
                <div style={{ width: '16px', height: '1px', background: 'rgba(26,158,212,0.8)' }} />
                <span className="section-label" style={{ fontSize: '0.52rem' }}>LOCATION MAP</span>
              </div>
            </div>
          </motion.div>

          {/* Map overlay portal */}
          {mounted && createPortal(
            <AnimatePresence>
              {mapOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(4,10,20,0.88)', padding: '32px' }}
                  onClick={() => setMapOpen(false)}
                  onMouseLeave={() => setMapOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.88, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ position: 'relative', width: '90vw', height: '95vh' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img src="/images/map.jpg" alt="도안자이 센텀리체 입지환경 전체 지도" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', border: '1px solid rgba(26,158,212,0.2)' }} />
                    <button
                      onClick={() => setMapOpen(false)}
                      style={{ position: 'absolute', top: '-16px', right: '-16px', width: '32px', height: '32px', background: 'rgba(26,158,212,0.15)', border: '1px solid rgba(26,158,212,0.4)', color: 'rgba(26,158,212,0.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', lineHeight: 1 }}
                    >
                      ✕
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}

          {/* Feature grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locationFeatures.map((cat, ci) => (
              <motion.div
                key={ci}
                style={{ background: '#FFFFFF', border: '1px solid rgba(26,158,212,0.12)', padding: '28px', boxShadow: '0 2px 12px rgba(26,158,212,0.05)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: ci * 0.08, duration: 0.55 }}
              >
                <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: 'rgba(26,158,212,0.9)', marginBottom: '2px' }}>
                  {cat.categoryEn}
                </p>
                <h3 style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.06em', color: '#0D2137', marginBottom: '14px' }}>
                  {cat.category}
                </h3>
                <div style={{ width: '24px', height: '1px', background: 'rgba(26,158,212,0.4)', marginBottom: '14px' }} />
                <ul className="space-y-3">
                  {cat.items.map((item, ii) => (
                    <li key={ii}>
                      <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.95rem', letterSpacing: '0.02em', color: 'rgba(13,33,55,0.8)', marginBottom: '2px' }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.82rem', letterSpacing: '0.05em', color: 'rgba(26,158,212,0.88)' }}>
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 트램 배너 */}
        <motion.div
          className="relative overflow-hidden"
          style={{ height: '280px' }}
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.75 }}
        >
          <img src="/images/tram.jpg" alt="도안자이 센텀리체 입지" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'brightness(0.55) saturate(0.8)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,33,55,0.82) 0%, rgba(13,33,55,0.35) 55%, transparent 100%)' }} />
          <div className="absolute inset-0 flex items-center px-10 lg:px-16">
            <div>
              <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 500, letterSpacing: '0.06em', color: '#FFFFFF', marginBottom: '8px' }}>
                트램 도보 5분 · 트리플 학세권
              </p>
              <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                대전 도시철도 트램 2028년 개통 예정
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
