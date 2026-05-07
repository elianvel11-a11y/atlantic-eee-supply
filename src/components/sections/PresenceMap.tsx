'use client'

import { useLanguage } from '@/lib/LanguageContext'
import mapData from '@/data/caribbean-map.json'

const { paths, locs, routes, latLines, lngLines } = mapData as {
  paths:    Record<string, string>
  locs:     Record<string, { x: number; y: number }>
  routes:   Record<string, string>
  latLines: { lat: number; y: number }[]
  lngLines: { lng: number; x: number }[]
}

const LOCS = [
  {
    id:     'panamacity',
    city:   { en: 'Panama City',     es: 'Ciudad de Panamá'  },
    role:   { en: 'Pacific HQ',      es: 'Sede Pacífico'     },
    coords: '08°58′N · 79°31′W',
    primary: true,
    anchor: 'start' as const,
    dx: 14, dy: 4,
  },
  {
    id:     'colon',
    city:   { en: 'Colón',           es: 'Colón'             },
    role:   { en: 'Atlantic Office', es: 'Oficina Atlántica' },
    coords: '09°21′N · 79°54′W',
    primary: false,
    anchor: 'end' as const,
    dx: -14, dy: -14,
  },
  {
    id:     'cartagena',
    city:   { en: 'Cartagena',       es: 'Cartagena'         },
    role:   { en: 'Regional Reach',  es: 'Alcance Regional'  },
    coords: '10°23′N · 75°28′W',
    primary: false,
    anchor: 'start' as const,
    dx: 14, dy: 4,
  },
]

const COUNTRY_LAYERS: { key: string; fill: string; stroke: string; strokeW: number }[] = [
  { key: 'cuba',             fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'jamaica',          fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'haiti',            fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'dominicanRepublic',fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'antigua',          fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'barbados',         fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'grenada',          fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'stLucia',          fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'trinidad',         fill: '#060F1C', stroke: 'rgba(91,164,229,0.07)', strokeW: 0.6 },
  { key: 'guatemala',        fill: '#07121F', stroke: 'rgba(91,164,229,0.10)', strokeW: 0.7 },
  { key: 'honduras',         fill: '#07121F', stroke: 'rgba(91,164,229,0.10)', strokeW: 0.7 },
  { key: 'nicaragua',        fill: '#07121F', stroke: 'rgba(91,164,229,0.10)', strokeW: 0.7 },
  { key: 'costaRica',        fill: '#08162A', stroke: 'rgba(91,164,229,0.13)', strokeW: 0.8 },
  { key: 'venezuela',        fill: '#07121F', stroke: 'rgba(91,164,229,0.09)', strokeW: 0.6 },
  { key: 'colombia',         fill: '#0A1A36', stroke: 'rgba(91,164,229,0.20)', strokeW: 1.1 },
  { key: 'panama',           fill: '#0D2244', stroke: 'rgba(91,164,229,0.28)', strokeW: 1.3 },
]

// Very faint off-map route traces — suggest global scalability without adding nodes
const GLOBAL_TRACES = [
  // Pacific spine — out through bottom-left
  { d: 'M 448,494 C 310,568 160,640 -30,700', label: 'Pacific' },
  // Atlantic spine — out through top-right
  { d: 'M 852,351 C 1010,268 1150,170 1260,55',  label: 'Atlantic' },
]

export default function PresenceMap() {
  const { lang } = useLanguage()

  return (
    <>
      <style>{`
        @keyframes dash-canal {
          from { stroke-dashoffset: 18; }
          to   { stroke-dashoffset: 0;  }
        }
        @keyframes dash-carib {
          from { stroke-dashoffset: 28; }
          to   { stroke-dashoffset: 0;  }
        }
        @keyframes dash-global {
          from { stroke-dashoffset: 40; }
          to   { stroke-dashoffset: 0;  }
        }
        /* All motion: slow, calm, cinematic */
        .r-canal  { animation: dash-canal  4.5s linear infinite; }
        .r-carib  { animation: dash-carib  8s   linear infinite; }
        .r-global { animation: dash-global 14s  linear infinite; }
      `}</style>

      <div className="relative overflow-hidden" style={{ height: '680px', background: '#030609' }}>

        <svg
          viewBox="0 0 1200 680"
          style={{ width: '100%', height: '100%', display: 'block' }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Primary ocean gradient — slow animated depth shift */}
            <radialGradient id="bg" cx="62%" cy="32%" r="72%">
              <stop offset="0%" stopColor="#0D2244">
                <animate attributeName="stop-color"
                  values="#0D2244;#0F2748;#0B1E3E;#0D2244"
                  dur="20s" repeatCount="indefinite"/>
              </stop>
              <stop offset="55%" stopColor="#07091A"/>
              <stop offset="100%" stopColor="#030508"/>
            </radialGradient>

            {/* Secondary depth layer — lower-left warmth */}
            <radialGradient id="ocean-depth" cx="18%" cy="78%" r="55%">
              <stop offset="0%"   stopColor="rgba(10,24,56,0.22)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
            </radialGradient>

            {/* Upper Caribbean vignette */}
            <radialGradient id="carib-depth" cx="70%" cy="15%" r="50%">
              <stop offset="0%"   stopColor="rgba(8,20,48,0.18)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
            </radialGradient>

            {/* Marker glow — primary hub (refined, ~20% less intense) */}
            <filter id="glow-hub" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Marker glow — secondary nodes */}
            <filter id="glow-node" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Traveling dot glow */}
            <filter id="glow-dot" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <clipPath id="viewport">
              <rect width="1200" height="680"/>
            </clipPath>
          </defs>

          {/* ── Ocean base ──────────────────────────────────────────────── */}
          <rect width="1200" height="680" fill="url(#bg)"/>
          <rect width="1200" height="680" fill="url(#ocean-depth)"/>
          <rect width="1200" height="680" fill="url(#carib-depth)"/>

          {/* ── Grid ───────────────────────────────────────────────────── */}
          <g clipPath="url(#viewport)">
            {latLines.map(({ lat, y }) => (
              <line key={lat} x1="0" y1={y} x2="1200" y2={y}
                stroke="rgba(91,164,229,0.045)" strokeWidth="1"/>
            ))}
            {lngLines.map(({ lng, x }) => (
              <line key={lng} x1={x} y1="0" x2={x} y2="680"
                stroke="rgba(91,164,229,0.032)" strokeWidth="1"/>
            ))}
            {latLines.map(({ lat, y }) => (
              <text key={lat} x="8" y={y - 5}
                fill="rgba(91,164,229,0.15)" fontFamily="monospace"
                fontSize="7.5" letterSpacing="1.5">
                {lat}°N
              </text>
            ))}
          </g>

          {/* ── Land ───────────────────────────────────────────────────── */}
          <g clipPath="url(#viewport)">
            {COUNTRY_LAYERS.map(({ key, fill, stroke, strokeW }) =>
              paths[key] ? (
                <path key={key} d={paths[key]} fill={fill}
                  stroke={stroke} strokeWidth={strokeW} strokeLinejoin="round"/>
              ) : null
            )}
          </g>

          {/* ── Global route traces — very faint, suggest scalability ─── */}
          {GLOBAL_TRACES.map(({ d, label }) => (
            <g key={label}>
              {/* Ghost glow */}
              <path d={d} fill="none"
                stroke="rgba(91,164,229,0.03)" strokeWidth="8" strokeLinecap="round"/>
              {/* Animated dashes */}
              <path d={d} fill="none"
                stroke="rgba(91,164,229,0.055)" strokeWidth="1"
                strokeDasharray="10 10" className="r-global"/>
            </g>
          ))}

          {/* ── Sea labels ─────────────────────────────────────────────── */}
          <text x="700" y="195"
            fill="rgba(91,164,229,0.10)" fontFamily="Georgia,serif" fontSize="19"
            fontStyle="italic" letterSpacing="8" textAnchor="middle">
            Caribbean Sea
          </text>
          <text x="158" y="636"
            fill="rgba(91,164,229,0.08)" fontFamily="Georgia,serif" fontSize="14"
            fontStyle="italic" letterSpacing="4" textAnchor="middle">
            Pacific Ocean
          </text>

          {/* ── Strategic positioning text ──────────────────────────────── */}
          <text x="600" y="665"
            fill="rgba(91,164,229,0.065)" fontFamily="monospace"
            fontSize="6.5" letterSpacing="3.5" textAnchor="middle">
            STRATEGICALLY POSITIONED BETWEEN ATLANTIC AND PACIFIC MARITIME ROUTES
          </text>

          {/* ── Route glow halos ────────────────────────────────────────── */}
          <path d={routes.canal} fill="none"
            stroke="rgba(91,164,229,0.055)" strokeWidth="10" strokeLinecap="round"/>
          <path d={routes.carib} fill="none"
            stroke="rgba(91,164,229,0.04)"  strokeWidth="8"  strokeLinecap="round"/>

          {/* ── Animated route lines ────────────────────────────────────── */}
          <path d={routes.canal} fill="none"
            stroke="rgba(91,164,229,0.65)" strokeWidth="1.4"
            strokeDasharray="4 5" className="r-canal"/>
          <path d={routes.carib} fill="none"
            stroke="rgba(91,164,229,0.36)" strokeWidth="1.4"
            strokeDasharray="7 7" className="r-carib"/>

          {/* ── Traveling dots — slow, cinematic ───────────────────────── */}
          <circle r="3" fill="#5BA4E5" opacity="0.8" filter="url(#glow-dot)">
            <animateMotion dur="5s" repeatCount="indefinite" calcMode="linear"
              path={routes.canal}/>
          </circle>
          <circle r="2.5" fill="#5BA4E5" opacity="0.5" filter="url(#glow-dot)">
            <animateMotion dur="11s" repeatCount="indefinite" calcMode="linear"
              path={routes.carib}/>
          </circle>

          {/* ── Location markers ────────────────────────────────────────── */}
          {LOCS.map(({ id, city, role, coords, primary, anchor, dx, dy }) => {
            const pt = locs[id]
            if (!pt) return null
            const isCartagena = id === 'cartagena'

            // Per-node visual weights
            const dotFill   = primary        ? '#5BA4E5'
                            : isCartagena    ? 'rgba(91,164,229,0.58)'
                            :                  'rgba(91,164,229,0.88)'
            const dotStroke = primary        ? 'rgba(255,255,255,0.82)'
                            : isCartagena    ? 'rgba(255,255,255,0.45)'
                            :                  'rgba(255,255,255,0.72)'
            const dotR      = primary ? 6.5  : isCartagena ? 4 : 4.5
            const glowF     = primary ? 'url(#glow-hub)' : 'url(#glow-node)'
            const cityOpacity = primary ? '0.90' : isCartagena ? '0.68' : '0.88'
            const roleOpacity = primary ? '0.52' : isCartagena ? '0.38' : '0.60'

            return (
              <g key={id} transform={`translate(${pt.x},${pt.y})`}>

                {/* Cartagena — dashed outer ring signals expansion/future node */}
                {isCartagena && (
                  <circle cx="0" cy="0" r="14" fill="none"
                    stroke="rgba(91,164,229,0.18)" strokeWidth="0.8"
                    strokeDasharray="3 4"/>
                )}

                {/* Outer pulse ring */}
                <circle cx="0" cy="0" fill="none"
                  stroke={`rgba(91,164,229,${primary ? '0.44' : isCartagena ? '0.22' : '0.32'})`}
                  strokeWidth="1">
                  <animate attributeName="r"
                    from="0" to={primary ? 30 : isCartagena ? 18 : 20}
                    dur={primary ? '4s' : isCartagena ? '6s' : '5s'}
                    repeatCount="indefinite"/>
                  <animate attributeName="opacity"
                    from={primary ? '0.72' : '0.6'} to="0"
                    dur={primary ? '4s' : isCartagena ? '6s' : '5s'}
                    repeatCount="indefinite"/>
                </circle>

                {/* Primary hub — second tighter ring for precision instrument feel */}
                {primary && (
                  <>
                    <circle cx="0" cy="0" fill="none"
                      stroke="rgba(91,164,229,0.28)" strokeWidth="0.8">
                      <animate attributeName="r" from="0" to="16"
                        dur="4s" begin="1.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" from="0.62" to="0"
                        dur="4s" begin="1.5s" repeatCount="indefinite"/>
                    </circle>
                    {/* Static precision ring — navigation instrument aesthetic */}
                    <circle cx="0" cy="0" r="11" fill="none"
                      stroke="rgba(91,164,229,0.18)" strokeWidth="0.7"/>
                  </>
                )}

                {/* Core dot */}
                <circle cx="0" cy="0"
                  r={dotR}
                  fill={dotFill}
                  stroke={dotStroke}
                  strokeWidth={primary ? 1.8 : 1.3}
                  filter={glowF}/>

                {/* City name */}
                <text x={dx} y={dy}
                  fill={`rgba(255,255,255,${cityOpacity})`}
                  fontFamily="monospace" fontSize="10.5"
                  fontWeight="600" letterSpacing="1"
                  textAnchor={anchor}>
                  {lang === 'es' ? city.es : city.en}
                </text>
                {/* Role */}
                <text x={dx} y={dy + 13}
                  fill={`rgba(91,164,229,${roleOpacity})`}
                  fontFamily="monospace" fontSize="8.5"
                  letterSpacing="2" textAnchor={anchor}>
                  {lang === 'es' ? role.es : role.en}
                </text>
                {/* Coordinates */}
                <text x={dx} y={dy + 24}
                  fill="rgba(255,255,255,0.18)"
                  fontFamily="monospace" fontSize="7"
                  letterSpacing="1.5" textAnchor={anchor}>
                  {coords}
                </text>
              </g>
            )
          })}

          {/* ── Compass ─────────────────────────────────────────────────── */}
          <g transform="translate(1130,614)">
            <line x1="0" y1="16" x2="0" y2="-16"
              stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <line x1="-16" y1="0" x2="16" y2="0"
              stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <polygon points="0,-14 2.5,-6 -2.5,-6"
              fill="rgba(91,164,229,0.35)"/>
            <polygon points="0,14 2.5,6 -2.5,6"
              fill="rgba(255,255,255,0.10)"/>
            <text x="0" y="-21" fill="rgba(255,255,255,0.22)"
              fontFamily="monospace" fontSize="7.5"
              letterSpacing="1" textAnchor="middle" fontWeight="600">N</text>
          </g>
        </svg>

        {/* ── Corner brackets ──────────────────────────────────────────── */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-blue-accent/25 z-10 pointer-events-none"/>
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-blue-accent/25 z-10 pointer-events-none"/>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-blue-accent/25 z-10 pointer-events-none"/>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-blue-accent/25 z-10 pointer-events-none"/>

        {/* ── Status bar ──────────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 pointer-events-none">
          <div className="flex items-center gap-3 glass-map rounded px-4 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse"/>
            <span className="font-mono text-[10px] tracking-[0.24em] text-white/35 uppercase">
              ATLANTIC EEE SUPPLY · OPERATIONAL NETWORK
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 glass-map rounded px-3 py-1.5">
              <span className="font-mono text-[9px] text-white/22 tracking-[0.20em] uppercase">Routes</span>
              <span className="font-mono text-[11px] text-blue-accent/65 font-semibold">02</span>
            </div>
            <div className="flex items-center gap-2 glass-map rounded px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-accent/80"/>
              <span className="font-mono text-[9px] text-green-accent/60 tracking-[0.18em]">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* ── Location legend ─────────────────────────────────────────── */}
        <div className="absolute bottom-10 left-6 z-10 glass-map rounded-lg px-6 py-5 flex flex-col gap-4">
          {LOCS.map(({ id, city, role, coords, primary }) => {
            const isCartagena = id === 'cartagena'
            return (
              <div key={id} className="flex items-start gap-3">
                <div
                  className={`mt-[4px] rounded-full flex-shrink-0 ${
                    primary        ? 'w-2.5 h-2.5 bg-blue-accent border-2 border-white/55'
                    : isCartagena  ? 'w-2 h-2 bg-blue-accent/45 border border-white/22'
                    :                'w-2 h-2 bg-blue-accent/70 border border-white/35'
                  }`}
                  style={{ boxShadow: primary ? '0 0 8px rgba(91,164,229,0.50)' : undefined }}
                />
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className={`font-mono text-[10px] tracking-[0.06em] ${
                      primary ? 'text-white/80' : isCartagena ? 'text-white/55' : 'text-white/72'
                    }`}>
                      {lang === 'es' ? city.es : city.en}
                    </span>
                    <span className={`font-mono text-[8px] tracking-[0.18em] ${
                      primary ? 'text-blue-accent/48' : isCartagena ? 'text-blue-accent/30' : 'text-blue-accent/42'
                    }`}>
                      {lang === 'es' ? role.es : role.en}
                    </span>
                  </div>
                  <div className="font-mono text-[7px] text-white/18 mt-1 tracking-[0.14em]">
                    {coords}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
