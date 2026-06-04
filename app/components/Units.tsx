'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from './useInView';


// 실제 평면도 이미지 URL (공식 xi.co.kr에서 추출)
const unit1 = [
  {
    type: '84A',
    area: '84㎡',
    supply: '109.80㎡',
    rooms: '3베드룸 / 2욕실',
    count: '368세대',
    floor: '최고 42층',
    planImg: '/images/plan_84A_basic.jpg',
    planImgExt: '/images/plan_84A_extend.jpg',
  },
  {
    type: '84B',
    area: '84㎡',
    supply: '109.22㎡',
    rooms: '3베드룸 / 2욕실',
    count: '280세대',
    floor: '최고 38층',
    planImg: '/images/plan_84B_basic.jpg',
    planImgExt: '/images/plan_84B_extend.jpg',
  },
  {
    type: '84C',
    area: '84㎡',
    supply: '107.50㎡',
    rooms: '3베드룸 / 2욕실',
    count: '248세대',
    floor: '최고 35층',
    planImg: '/images/plan_84C_basic.jpg',
    planImgExt: '/images/plan_84C_extend.jpg',
  },
  {
    type: '84D',
    area: '84㎡',
    supply: '108.20㎡',
    rooms: '3베드룸 / 2욕실',
    count: '182세대',
    floor: '최고 35층',
    planImg: '/images/plan_84D_basic.jpg',
    planImgExt: '/images/plan_84D_extend.jpg',
  },
  {
    type: '84E',
    area: '84㎡',
    supply: '108.60㎡',
    rooms: '3베드룸 / 2욕실',
    count: '143세대',
    floor: '최고 32층',
    planImg: '/images/plan_84E_basic.jpg',
    planImgExt: '/images/plan_84E_extend.jpg',
  },
  {
    type: '99A',
    area: '99㎡',
    supply: '129.80㎡',
    rooms: '4베드룸 / 2욕실',
    count: '185세대',
    floor: '최고 42층',
    planImg: '/images/plan_99A_basic.jpg',
    planImgExt: '/images/plan_99A_extend.jpg',
  },
  {
    type: '99B',
    area: '99㎡',
    supply: '131.20㎡',
    rooms: '4베드룸 / 2욕실',
    count: '201세대',
    floor: '최고 38층',
    planImg: '/images/plan_99B_basic.jpg',
    planImgExt: '/images/plan_99B_extend.jpg',
  },
];

const unit2 = [
  {
    type: '84A',
    area: '84㎡',
    supply: '109.40㎡',
    rooms: '3베드룸 / 2욕실',
    count: '296세대',
    floor: '최고 42층',
    planImg: '/images/plan_2_84A_basic.jpg',
    planImgExt: '/images/plan_2_84A_extend.jpg',
  },
  {
    type: '84A1',
    area: '84㎡',
    supply: '109.60㎡',
    rooms: '3베드룸 / 2욕실',
    count: '148세대',
    floor: '최고 40층',
    planImg: '/images/plan_2_84A1_basic.jpg',
    planImgExt: '/images/plan_2_84A1_extend.jpg',
  },
  {
    type: '84B',
    area: '84㎡',
    supply: '108.90㎡',
    rooms: '3베드룸 / 2욕실',
    count: '204세대',
    floor: '최고 40층',
    planImg: '/images/plan_2_84B_basic.jpg',
    planImgExt: '/images/plan_2_84B_extend.jpg',
  },
  {
    type: '84B1',
    area: '84㎡',
    supply: '109.10㎡',
    rooms: '3베드룸 / 2욕실',
    count: '96세대',
    floor: '최고 38층',
    planImg: '/images/plan_2_84B1_basic.jpg',
    planImgExt: '/images/plan_2_84B1_extend.jpg',
  },
  {
    type: '84C',
    area: '84㎡',
    supply: '108.40㎡',
    rooms: '3베드룸 / 2욕실',
    count: '176세대',
    floor: '최고 38층',
    planImg: '/images/plan_2_84C_basic.jpg',
    planImgExt: '/images/plan_2_84C_extend.jpg',
  },
  {
    type: '84C1',
    area: '84㎡',
    supply: '108.20㎡',
    rooms: '3베드룸 / 2욕실',
    count: '60세대',
    floor: '최고 35층',
    planImg: '/images/plan_2_84C1_basic.jpg',
    planImgExt: '/images/plan_2_84C1_extend.jpg',
  },
  {
    type: '115A',
    area: '115㎡',
    supply: '149.80㎡',
    rooms: '4베드룸 / 2욕실',
    count: '52세대',
    floor: '최고 42층',
    planImg: '/images/plan_2_115A_basic.jpg',
    planImgExt: '/images/plan_2_115A_extend.jpg',
  },
  {
    type: '115B',
    area: '115㎡',
    supply: '150.20㎡',
    rooms: '4베드룸 / 2욕실',
    count: '28세대',
    floor: '최고 40층',
    planImg: '/images/plan_2_115B_basic.jpg',
    planImgExt: '/images/plan_2_115B_extend.jpg',
  },
  {
    type: '115C',
    area: '115㎡',
    supply: '149.60㎡',
    rooms: '4베드룸 / 2욕실',
    count: '18세대',
    floor: '최고 38층',
    planImg: '/images/plan_2_115C_basic.jpg',
    planImgExt: '/images/plan_2_115C_extend.jpg',
  },
  {
    type: '115C1',
    area: '115㎡',
    supply: '149.40㎡',
    rooms: '4베드룸 / 2욕실',
    count: '6세대',
    floor: '최고 38층',
    planImg: '/images/plan_2_115C1_basic.jpg',
    planImgExt: '/images/plan_2_115C1_extend.jpg',
  },
  {
    type: '134P',
    area: '134㎡',
    supply: '178.90㎡',
    rooms: '4베드룸 / 3욕실',
    count: '펜트하우스',
    floor: '최상층',
    planImg: '/images/plan_2_134P_basic.jpg',
    planImgExt: '/images/plan_2_134P_extend.jpg',
    isPenthouse: true,
  },
];

type UnitType = {
  type: string;
  area: string;
  supply: string;
  rooms: string;
  count: string;
  floor: string;
  planImg: string;
  planImgExt?: string;
  isPenthouse?: boolean;
};

function PlanImage({ src, type }: { src: string; type: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ background: 'rgba(10,22,40,0.7)' }}
      >
        <p
          className="text-white/25"
          style={{
            fontFamily: "'Pretendard', sans-serif",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textAlign: 'center',
          }}
        >
          TYPE {type}<br />평면도 준비중
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`TYPE ${type} 평면도`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center',
        padding: '16px',
        filter: 'brightness(0.95)',
      }}
      onError={() => setFailed(true)}
    />
  );
}

function UnitCard({ unit, index, inView }: { unit: UnitType; index: number; inView: boolean }) {
  const [planOpen, setPlanOpen] = useState(false);
  const [planTab, setPlanTab] = useState<'basic' | 'ext'>('basic');

  return (
    <>
      <motion.div
        className={`card-luxury group relative overflow-hidden flex flex-col cursor-pointer ${
          unit.isPenthouse ? 'border-gold/25' : ''
        }`}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.07, duration: 0.55 }}
        onClick={() => setPlanOpen(true)}
        whileHover={{ y: -3 }}
      >
        {unit.isPenthouse && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className="border border-gold/35 text-gold px-2 py-0.5"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
              }}
            >
              PENTHOUSE
            </span>
          </div>
        )}

        {/* Floor plan image */}
        <div
          className="relative overflow-hidden"
          style={{
            height: '180px',
            background: '#F9F0E6',
            borderBottom: '1px solid rgba(26,158,212,0.08)',
          }}
        >
          <PlanImage src={unit.planImg} type={unit.type} />
          <div className="absolute inset-0 bg-navy/0 hover:bg-navy/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span
              className="border border-white/20 text-white/60 px-3 py-1.5"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
              }}
            >
              확대보기
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.5rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(26,158,212,0.85)',
                  marginBottom: '2px',
                }}
              >
                TYPE
              </span>
              <span
                style={{
                  color: '#0D2137',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '1.9rem',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}
              >
                {unit.type}
              </span>
            </div>
            <div className="text-right">
              <span
                className="block text-gold"
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '1.1rem',
                  letterSpacing: '0.04em',
                }}
              >
                {unit.area}
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(13,33,55,0.55)',
                }}
              >
                전용
              </span>
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            {[
              { l: '공급', v: unit.supply },
              { l: '구조', v: unit.rooms },
              { l: '세대', v: unit.count },
              { l: '층수', v: unit.floor },
            ].map((row) => (
              <div key={row.l} className="flex justify-between items-center">
                <span
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(13,33,55,0.6)',
                  }}
                >
                  {row.l}
                </span>
                <span
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: '0.72rem',
                    color: 'rgba(13,33,55,0.82)',
                  }}
                >
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold/0 via-gold/35 to-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {planOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setPlanOpen(false); setPlanTab('basic'); }}
          >
            <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(13,33,55,0.55)' }} />
            <motion.div
              className="relative z-10"
              style={{ width: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              transition={{ duration: 0.28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ background: '#F9F0E6', border: '1px solid rgba(26,158,212,0.2)', display: 'flex', flexDirection: 'column', height: '90vh' }}>
                {/* 모달 헤더 */}
                <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(26,158,212,0.15)' }}>
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: '0.55rem',
                        letterSpacing: '0.28em',
                        color: 'rgba(26,158,212,0.8)',
                        marginBottom: '4px',
                      }}
                    >
                      FLOOR PLAN
                    </span>
                    <span
                      style={{
                        color: '#0D2137',
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: '1.5rem',
                        letterSpacing: '0.06em',
                      }}
                    >
                      TYPE {unit.type} · {unit.area}
                    </span>
                  </div>
                  <button
                    onClick={() => { setPlanOpen(false); setPlanTab('basic'); }}
                    style={{ fontSize: '1.4rem', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(13,33,55,0.45)', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(13,33,55,0.9)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(13,33,55,0.45)')}
                  >
                    &#215;
                  </button>
                </div>

                {/* 기본형 / 확장형 탭 */}
                <div className="flex" style={{ borderBottom: '1px solid rgba(26,158,212,0.15)' }}>
                  {[
                    { key: 'basic', label: '기본형' },
                    { key: 'ext', label: '확장형' },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setPlanTab(t.key as 'basic' | 'ext')}
                      style={{
                        flex: 1,
                        padding: '10px 0',
                        background: planTab === t.key ? 'rgba(249,240,230,0.95)' : '#F9F0E6',
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderBottom: planTab === t.key ? '2px solid #1A9ED4' : '2px solid transparent',
                        color: planTab === t.key ? '#1A9ED4' : 'rgba(13,33,55,0.5)',
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* 평면도 이미지 */}
                <div style={{ flex: 1, minHeight: 0 }}>
                  {planTab === 'basic' ? (
                    <PlanImage src={unit.planImg} type={unit.type} />
                  ) : unit.planImgExt ? (
                    <PlanImage src={unit.planImgExt} type={`${unit.type} 확장형`} />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{ background: '#F9F0E6' }}
                    >
                      <div className="w-8 h-px bg-gold/30" />
                      <p
                        style={{
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: '0.65rem',
                          letterSpacing: '0.2em',
                          color: 'rgba(13,33,55,0.45)',
                          textAlign: 'center',
                        }}
                      >
                        TYPE {unit.type} 확장형<br />평면도 준비중
                      </p>
                      <div className="w-8 h-px bg-gold/30" />
                    </div>
                  )}
                </div>

                {/* 하단 스펙 */}
                <div className="flex gap-6 px-6 py-4" style={{ borderTop: '1px solid rgba(26,158,212,0.15)', background: '#F9F0E6' }}>
                  {[
                    { l: '전용', v: unit.area },
                    { l: '공급', v: unit.supply },
                    { l: '구조', v: unit.rooms },
                    { l: '세대수', v: unit.count },
                  ].map((item) => (
                    <div key={item.l}>
                      <span
                        style={{ display: 'block', fontFamily: "'Pretendard', sans-serif", fontSize: '0.52rem', letterSpacing: '0.15em', color: 'rgba(26,158,212,0.75)', marginBottom: '2px' }}
                      >
                        {item.l}
                      </span>
                      <span
                        style={{ display: 'block', fontFamily: "'Pretendard', sans-serif", fontSize: '0.8rem', color: 'rgba(13,33,55,0.85)' }}
                      >
                        {item.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Units() {
  const [activeTab, setActiveTab] = useState<'1' | '2'>('1');
  const { ref: titleRef, inView: titleInView } = useInView(0.2);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.05);

  const currentUnits = activeTab === '1' ? unit1 : unit2;

  return (
    <section id="units" className="section-padding relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="absolute inset-0 geometric-bg opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={titleRef}
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="gold-line-left" />
            <span className="section-label">UNIT GUIDE</span>
          </div>
          <h2
            style={{
              color: '#0D2137',
              fontFamily: "'Pretendard', sans-serif",
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            세대안내
          </h2>
          <p
            className="text-ivory/40 mt-3"
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.9,
            }}
          >
            평면도를 클릭하면 확대 보기가 가능합니다
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.55 }}
        >
          {[
            { key: '1', label: '1단지', sub: '1,209세대 · 84~99㎡' },
            { key: '2', label: '2단지', sub: '1,084세대 · 84~134㎡' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as '1' | '2')}
              className="px-7 py-3.5 transition-all duration-300"
              style={{
                background: activeTab === tab.key ? '#1A9ED4' : 'transparent',
                border: activeTab === tab.key ? '1px solid #1A9ED4' : '1px solid rgba(13,33,55,0.35)',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  display: 'block',
                  color: activeTab === tab.key ? '#FFFFFF' : '#0D2137',
                }}
              >
                {tab.label}
              </span>
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: '1rem',
                  letterSpacing: '0.04em',
                  display: 'block',
                  marginTop: '4px',
                  color: activeTab === tab.key ? 'rgba(255,255,255,0.75)' : 'rgba(13,33,55,0.6)',
                }}
              >
                {tab.sub}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            ref={cardsRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {currentUnits.map((unit, i) => (
              <UnitCard key={unit.type} unit={unit} index={i} inView={cardsInView} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="mt-6 text-ivory/18 text-center"
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontFamily: "'Pretendard', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
            lineHeight: 1.8,
          }}
        >
          * 상기 세대 구성 및 면적은 사업 계획 변경에 따라 달라질 수 있습니다. 확정 내용은 입주자 모집공고를 기준으로 합니다.
        </motion.p>
      </div>
    </section>
  );
}
