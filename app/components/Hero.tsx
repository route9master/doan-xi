'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const slides = [
  {
    id: 0,
    label: 'DOAN XI CENTUM RICHE',
    ko: '도안자이 센텀리체',
    title: 'CENTUM',
    title2: 'RICHE',
    sub: '대전광역시 유성구 용계동 267-3번지 일원',
    desc: '지하 2층 ~ 지상 최고 42층\n총 2,293세대',
    imgPC: '/images/hero1.jpg',
    imgMobile: '/images/hero1.jpg',
  },
  {
    id: 1,
    label: '1단지 · 2단지',
    ko: 'GS건설 시공',
    title: '자이',
    title2: '브랜드',
    sub: '26BL 에이치엠도안 / 30BL (주)에이치엠파트너스',
    desc: '총 2,293세대\n입주 예정 2029년 12월',
    imgPC: '/images/hero2.png',
    imgMobile: '/images/hero2.png',
  },
  {
    id: 2,
    label: 'CLUB XIAN',
    ko: '클럽자이안',
    title: '커뮤니티',
    title2: '',
    sub: '입주민 전용 클럽자이안',
    desc: '골프연습장, 피트니스, 사우나\n카페테리아, 엘리시안가든',
    imgPC: '/images/hero3.jpg',
    imgMobile: '/images/hero3.jpg',
  },
  {
    id: 3,
    label: 'MOVE IN 2029',
    ko: '2029년 12월 입주',
    title: '분양',
    title2: '안내',
    sub: '2029년 12월 입주 예정 · GS건설 시공',
    desc: '계약금 10% (3차 분납)\n중도금 60% 이자후불',
    imgPC: '/images/hero5.jpg',
    imgMobile: '/images/hero5.jpg',
  },
];

function SlideImage({ pc, alt, priority = false }: { pc: string; alt: string; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0" style={{ background: '#0D2137' }} />}
      <Image
        src={pc}
        alt={alt}
        fill
        priority={priority}
        quality={85}
        className="object-cover"
        style={{
          filter: 'brightness(0.42) saturate(0.75)',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    setProgress(0);
    let p = 0;
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      p += 0.4;
      setProgress(p);
      if (p >= 100) clearInterval(progressRef.current!);
    }, 20);
  };

  useEffect(() => {
    slides.slice(1).forEach((slide) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = slide.imgPC;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    startProgress();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      startProgress();
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setCurrent(idx);
    startProgress();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      startProgress();
    }, 5000);
  };

  const s = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden" style={{ background: '#0D2137' }}>
      {/* Slide background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SlideImage pc={s.imgPC} alt={s.ko} priority={s.id === 0} />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(110deg, rgba(10,22,40,0.72) 0%, rgba(10,22,40,0.38) 55%, rgba(10,22,40,0.18) 100%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1]" style={{ background: 'linear-gradient(to top, rgba(13,33,55,0.85) 0%, transparent 100%)' }} />
      <div className="absolute inset-0 z-[2] geometric-bg opacity-20" />

      {/* Decorative rings (right side) */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        {[600, 420, 260].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              right: -(size * 0.14),
              top: '50%',
              marginTop: -(size / 2),
              border: `1px solid rgba(26,158,212,${0.06 + i * 0.04})`,
            }}
            animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
            transition={{ duration: 35 - i * 8, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {/* Corner lines */}
        <div className="absolute top-0 right-0 w-60 h-60 opacity-[0.06]">
          <svg viewBox="0 0 240 240" fill="none">
            <line x1="0" y1="0" x2="240" y2="0" stroke="#1A9ED4" strokeWidth="0.5"/>
            <line x1="240" y1="0" x2="240" y2="240" stroke="#1A9ED4" strokeWidth="0.5"/>
            <circle cx="240" cy="0" r="90" stroke="#1A9ED4" strokeWidth="0.5" fill="none"/>
            <circle cx="240" cy="0" r="160" stroke="#1A9ED4" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-[4] h-full flex flex-col justify-center px-8 lg:px-20 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Label */}
            <motion.div
              className="flex items-center gap-4 mb-7"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="w-8 h-px bg-gold" />
              <span className="section-label">{s.label}</span>
            </motion.div>

            {/* Korean subtitle */}
            <motion.p
              className="text-white/50 mb-3"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)',
                fontWeight: 400,
                letterSpacing: '0.12em',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {s.ko}
            </motion.p>

            {/* Main title */}
            <motion.h1
              className="mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
            >
              <span
                className="block text-white leading-none"
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  textShadow: '0 2px 30px rgba(0,0,0,0.35)',
                }}
              >
                {s.title}
              </span>
              {s.title2 && (
                <span
                  className="block text-gold leading-none"
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    textShadow: '0 2px 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {s.title2}
                </span>
              )}
            </motion.h1>

            {/* Divider */}
            <motion.div
              className="mb-6 h-px bg-gradient-to-r from-gold via-gold/40 to-transparent"
              style={{ width: '80px' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
            />

            {/* Sub + desc */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.55 }}
            >
              <p
                className="text-white/55 mb-2"
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
                  letterSpacing: '0.06em',
                }}
              >
                {s.sub}
              </p>
              <p
                className="text-white/40 whitespace-pre-line"
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: 'clamp(0.94rem, 1.4vw, 1.05rem)',
                  fontWeight: 400,
                  lineHeight: 1.9,
                  letterSpacing: '0.04em',
                }}
              >
                {s.desc}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-5 mt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <motion.button
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-9 py-3.5 bg-gold overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="relative z-10 text-navy"
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.78rem',
                    letterSpacing: '0.18em',
                  }}
                >
                  상담 신청
                </span>
                <div className="absolute inset-0 bg-gold-light transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.button>
              <motion.button
                onClick={() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('switchContactTab', { detail: 'visit' }));
                }}
                className="group relative px-9 py-3.5 overflow-hidden"
                style={{ background: '#1A9ED4', border: 'none', cursor: 'pointer' }}
                whileHover={{ scale: 1.02, backgroundColor: '#1565A0' }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="relative z-10"
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.78rem',
                    letterSpacing: '0.18em',
                    color: '#FFFFFF',
                  }}
                >
                  방문 예약
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators — right side */}
        <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className="group flex items-center gap-2.5 justify-end">
              <span
                className={`transition-colors duration-300 ${i === current ? 'text-gold' : 'text-white/25 group-hover:text-white/45'}`}
                style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.58rem', letterSpacing: '0.2em' }}
              >
                0{i + 1}
              </span>
              <div className="relative w-7 h-px bg-white/15 overflow-hidden">
                {i === current ? (
                  <motion.div className="absolute inset-y-0 left-0 bg-gold" style={{ width: `${progress}%` }} />
                ) : (
                  <div className="absolute inset-0 bg-white/15 group-hover:bg-white/30 transition-colors" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[4]"
        onClick={() => document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="section-label" style={{ fontSize: '0.55rem' }}>SCROLL</span>
        <ChevronDown size={14} className="text-gold/60" />
      </motion.button>
    </section>
  );
}
