'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navItems = [
  { label: '사업개요', href: '#overview' },
  { label: '사업위치', href: '#location' },
  { label: '세대안내', href: '#units' },
  { label: '커뮤니티', href: '#community' },
  { label: '분양안내', href: '#sales' },
  { label: '상담신청', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,158,212,0.12)' : 'none',
          boxShadow: scrolled ? '0 2px 20px rgba(26,158,212,0.08)' : 'none',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <a href="#" className="flex items-center gap-4 group" style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', width: '80px', height: '40px', flexShrink: 0 }}>
                <img
                  src="/images/xi_logo.png"
                  alt="Xi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: scrolled ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                <img
                  src="/images/xi_logo_dark.png"
                  alt="Xi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: scrolled ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              </div>
              <div style={{ borderLeft: '1px solid rgba(26,158,212,0.25)', paddingLeft: '16px' }}>
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: scrolled ? '#0D2137' : '#FFFFFF',
                  }}
                >
                  도안자이 센텀리체
                </p>
              </div>
            </a>

            {/* Phone number - center (desktop only) */}
            <a
              href="tel:16660654"
              className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2"
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 18px',
                  border: `1px solid ${scrolled ? 'rgba(26,158,212,0.3)' : 'rgba(255,255,255,0.25)'}`,
                  background: scrolled ? 'rgba(26,158,212,0.06)' : 'rgba(255,255,255,0.08)',
                }}
              >
                <Phone size={13} style={{ color: scrolled ? '#1A9ED4' : 'rgba(255,255,255,0.8)' }} />
                <span
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: scrolled ? '#1A9ED4' : 'rgba(255,255,255,0.9)',
                  }}
                >
                  1666-0654
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="relative group transition-colors duration-300"
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: scrolled ? 'rgba(13,33,55,0.65)' : 'rgba(255,255,255,0.8)',
                  }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ background: '#1A9ED4' }}
                  />
                </button>
              ))}
              <motion.button
                onClick={() => scrollTo('#contact')}
                style={{
                  marginLeft: '12px',
                  padding: '10px 24px',
                  background: '#1A9ED4',
                  color: '#FFFFFF',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.03, backgroundColor: '#1565A0' }}
                whileTap={{ scale: 0.97 }}
              >
                상담신청
              </motion.button>
            </nav>

            {/* Mobile button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? '#0D2137' : '#FFFFFF',
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="h-20 flex items-center justify-between px-6"
              style={{ borderBottom: '1px solid rgba(26,158,212,0.1)' }}
            >
              <img src="/images/xi_logo.png" alt="Xi" style={{ height: '36px' }} />
              <button
                onClick={() => setMobileOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0D2137' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
              {/* Phone number in mobile menu */}
              <motion.a
                href="tel:16660654"
                className="flex items-center gap-2"
                style={{
                  textDecoration: 'none',
                  padding: '10px 28px',
                  border: '1px solid rgba(26,158,212,0.3)',
                  background: 'rgba(26,158,212,0.06)',
                  marginBottom: '4px',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
              >
                <Phone size={16} style={{ color: '#1A9ED4' }} />
                <span
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#1A9ED4',
                  }}
                >
                  1666-0654
                </span>
              </motion.a>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#0D2137',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo('#contact')}
                style={{
                  marginTop: '16px',
                  padding: '12px 40px',
                  background: '#1A9ED4',
                  color: '#FFFFFF',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.82rem',
                  letterSpacing: '0.18em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.54, duration: 0.35 }}
              >
                상담신청
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
