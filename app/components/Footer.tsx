'use client';

export default function Footer() {
  return (
    <footer
      className="pt-14 pb-10 relative overflow-hidden"
      style={{ background: '#0D2137', borderTop: '1px solid rgba(26,158,212,0.15)' }}
    >
      <div className="absolute inset-0 geometric-bg-dark opacity-100" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/xi_logo.png"
                alt="Xi"
                style={{ height: '32px', width: 'auto', opacity: 0.5, filter: 'brightness(0) invert(1)' }}
              />
              <div style={{ borderLeft: '1px solid rgba(26,158,212,0.2)', paddingLeft: '12px' }}>
                <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>
                  도안자이 센텀리체
                </p>
              </div>
            </div>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.75rem', lineHeight: 1.95, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.6)' }}>
              대전광역시 유성구 용계동 267-3번지 일원<br />
              299-7번지 일원<br />
              지하 2층 ~ 지상 최고 42층 / 총 2,293세대<br />
              입주 예정: 2029년 10월, 12월
            </p>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,158,212,0.5)', marginBottom: '20px' }}>
              COMPANY
            </p>
            <div className="space-y-2.5">
              {[
                { label: '시행 (1단지)', value: '에이치엠도안' },
                { label: '시행 (2단지)', value: '(주)에이치엠파트너스' },
                { label: '시공', value: 'GS건설 주식회사' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.65rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.55)', flexShrink: 0, width: '96px' }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(26,158,212,0.5)', marginBottom: '20px' }}>
              LEGAL NOTICE
            </p>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.62rem', letterSpacing: '0.03em', lineHeight: 1.9, color: 'rgba(255,255,255,0.55)' }}>
              본 홈페이지의 내용은 입주자 모집공고 승인 전으로 실제 분양 내용과 다를 수 있습니다.
              분양가·세대 구성·커뮤니티 시설 등은 변경될 수 있으며, 확정 내용은 입주자 모집공고를 기준으로 합니다.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(26,158,212,0.08)' }}>
          <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.6rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.5)' }}>
            © 2026 도안자이 센텀리체. GS건설 자이 브랜드 사용 허가를 받은 컨텐츠입니다.
          </p>
          <div className="flex items-center gap-2">
            <div style={{ width: '20px', height: '1px', background: 'rgba(26,158,212,0.25)' }} />
            <span style={{ fontFamily: "'Pretendard', sans-serif", fontSize: '0.55rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.45)' }}>
              DOAN XI CENTUM RICHE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
