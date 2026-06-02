'use client';

import { motion } from 'framer-motion';
import { useInView } from './useInView';

const gridItems = [
  {
    src: '/images/community1.jpg',
    titleEn: 'GOLF LOUNGE',
    desc: '단지 안에서 필드의 즐거움을 누릴 수 있는 입주민 전용 실내 골프연습장',
  },
  {
    src: '/images/community2.jpg',
    titleEn: 'FITNESS',
    desc: '활력 넘치는 생활을 위한 다양한 운동기구를 갖춘 피트니스',
  },
  {
    src: '/images/community3.jpg',
    titleEn: 'CAFETERIA',
    desc: '휴식과 담소를 나눌 수 있는 커뮤니티 공간',
  },
  {
    src: '/images/community4.jpg',
    titleEn: 'SAUNA',
    desc: '입주민들의 힐링과 재충전을 위한 사우나 시설',
  },
];

const moreCards = [
  { name: 'GX룸', desc: '건강과 아름다움을 유지할 수 있는 운동 공간' },
  { name: '필라테스룸', desc: '요가, 필라테스 등을 즐길 수 있는 쾌적한 운동 공간' },
  { name: '독서실 · 오픈스터디', desc: '책을 읽고 공부할 수 있는 쾌적한 학습 공간' },
  { name: '게스트하우스', desc: '손님들을 위해 여유로운 시간을 보낼 수 있게 마련된 게스트룸' },
  { name: '키즈도서관', desc: '어린이들이 다양한 책들과 놀이를 한꺼번에 즐길 수 있는 공간' },
  { name: '실내놀이터', desc: '아이들의 상상력을 자극하는 시설을 갖춘 단지 내 놀이공간' },
  { name: '1인독서실', desc: '쾌적한 분위기의 1인 학습공간' },
  { name: '어린이집', desc: '안심하고 아이를 맡길 수 있는 단지 내 어린이집' },
];

export default function Community() {
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: gridRef, inView: gridInView } = useInView(0.1);
  const { ref: moreRef, inView: moreInView } = useInView(0.1);

  return (
    <section id="community" className="section-padding relative overflow-hidden" style={{ background: '#1B6CA8' }}>
      <div className="absolute inset-0 geometric-bg-dark opacity-100" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* 상단: 타이틀 + 소개문 */}
        <motion.div
          ref={titleRef}
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="gold-line-left" />
            <span className="section-label">COMMUNITY</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2
                className="text-white mb-2"
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                CLUB XIAN
              </h2>
              <p
                className="text-white/35"
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.95rem',
                  letterSpacing: '0.05em',
                }}
              >
                클럽자이안
              </p>
            </div>
            <p
              className="text-white/45 max-w-sm lg:text-right"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.9,
                letterSpacing: '0.02em',
              }}
            >
              다채로운 문화생활의 시작,<br />
              프리미엄 커뮤니티
            </p>
          </div>
          <div className="mt-10 h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
        </motion.div>

        {/* 중단: 2×2 사진 그리드 */}
        <div ref={gridRef} className="grid grid-cols-2 gap-2 mb-14">
          {gridItems.map((item, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden group"
              style={{ height: 'clamp(200px, 28vw, 380px)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65 }}
            >
              <img
                src={item.src}
                alt={item.titleEn}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'brightness(0.72) saturate(0.88)' }}
              />

              {/* 기본 그라디언트 */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/65 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-400" />

              {/* 기본 번호 레이블 */}
              <div className="absolute bottom-5 left-5 group-hover:opacity-0 transition-opacity duration-300">
                <span
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.55rem',
                    letterSpacing: '0.22em',
                    color: 'rgba(26,158,212,0.6)',
                  }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* 호버 오버레이 */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'rgba(4,10,20,0.72)' }}
              >
                <div className="w-8 h-px bg-gold/50 mb-5" />
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    color: '#FFFFFF',
                    marginBottom: '12px',
                    textAlign: 'center',
                  }}
                >
                  {item.titleEn}
                </p>
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
                    fontWeight: 300,
                    letterSpacing: '0.03em',
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'center',
                    maxWidth: '260px',
                  }}
                >
                  {item.desc}
                </p>
                <div className="w-8 h-px bg-gold/50 mt-5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단: MORE FACILITIES 카드 4×2 */}
        <motion.div
          ref={moreRef}
          initial={{ opacity: 0, y: 16 }}
          animate={moreInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <p
              className="text-gold/45"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              MORE FACILITIES
            </p>
            <div className="flex-1 h-px bg-gold/8" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {moreCards.map((card, i) => (
              <motion.div
                key={i}
                className="p-5 border border-gold/10 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  transition: 'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={moreInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  backgroundColor: 'rgba(26,158,212,0.05)',
                  borderColor: 'rgba(26,158,212,0.28)',
                }}
              >
                <div className="w-4 h-px bg-gold/40 mb-4" />
                <p
                  className="text-white mb-2"
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    lineHeight: 1.3,
                  }}
                >
                  {card.name}
                </p>
                <p
                  className="text-white/38"
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    lineHeight: 1.75,
                  }}
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
