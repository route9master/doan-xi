'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';

export default function Location() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
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
                사업위치
              </h2>
              <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '1rem', lineHeight: 1.9, color: 'rgba(13,33,55,0.75)', marginTop: '12px' }}>
                대전광역시 유성구 용계동
              </p>
            </div>
            <span
              className="hidden lg:block"
              style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.88rem', letterSpacing: '0.08em', color: 'rgba(13,33,55,0.6)', lineHeight: 1.9 }}
            >
              267-3번지 일원<br />299-7번지 일원
            </span>
          </div>
        </motion.div>

        {/* 지도 이미지 - 전체 너비 */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          style={{ height: '520px', border: '1px solid rgba(26,158,212,0.15)', boxShadow: '0 4px 24px rgba(26,158,212,0.08)' }}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.75 }}
          onClick={() => setMapOpen(true)}
        >
          <img
            src="/images/map.jpg"
            alt="도안자이 센텀리체 사업위치"
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
                  <img src="/images/map.jpg" alt="도안자이 센텀리체 사업위치 전체 지도" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain', border: '1px solid rgba(26,158,212,0.2)' }} />
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
      </div>
    </section>
  );
}
