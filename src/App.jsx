import { useState } from "react";

const FLOWERS = [
  { x: 200, y: 90, cx: 200, cy: 250, color: "#ff7a8a", n: 9, r: 36, d: 0.9 },
  { x: 118, y: 150, cx: 140, cy: 300, color: "#ffd166", n: 8, r: 30, d: 0.3 },
  { x: 282, y: 150, cx: 262, cy: 300, color: "#b79cff", n: 7, r: 30, d: 0.6 },
  { x: 70, y: 240, cx: 110, cy: 340, color: "#ffb38a", n: 6, r: 26, d: 0 },
  { x: 330, y: 240, cx: 290, cy: 340, color: "#fff1e6", n: 6, r: 26, d: 0.15 },
  { x: 160, y: 205, cx: 175, cy: 310, color: "#ff9fb2", n: 8, r: 24, d: 1.2 },
  { x: 242, y: 205, cx: 228, cy: 310, color: "#ffe08a", n: 8, r: 24, d: 1.5 },
];

const BASE = { x: 200, y: 400 };
const STEM_TIME = 1.6;

export default function App() {
  const [run, setRun] = useState(0);

  return (
    <main
      className="flex h-[100dvh] w-full flex-col items-center justify-evenly overflow-hidden px-3 py-3 text-white sm:px-5"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #2b4a3c 0%, #14261f 70%)",
        fontFamily: "Georgia, serif",
      }}
    >
      <div className="shrink-0 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-rose-200/80 sm:text-xs">
        Something from My Heart
        </p>

        <div className="mt-1 flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-rose-100 drop-shadow-[0_0_15px_rgba(255,122,138,0.5)] sm:text-3xl">
            For You
          </h1>

          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="h-7 w-7 sm:h-8 sm:w-8"
            aria-label="Tulip"
            role="img"
          >
            <path
              d="M16 15 C14 20 17 25 15 30"
              stroke="#79c98b"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M16 23 C10 17 6 21 8 24 C11 27 14 25 16 23Z"
              fill="#5fae7b"
            />

            <path
              d="M16 15 C10 12 8 7 11 3 C14 4 16 7 16 11 C16 6 19 2 22 3 C26 8 22 13 16 15Z"
              fill="#ff7a8a"
              stroke="#ff9fb2"
              strokeWidth="0.7"
              strokeLinejoin="round"
            />

            <path
              d="M16 12 C14 8 14 6 15 4"
              stroke="#ffd1d9"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <svg
        key={run}
        viewBox="0 0 400 500"
        className="block h-auto w-auto min-h-0 min-w-0 max-w-full flex-1"
        style={{
          maxHeight: "min(68dvh, 560px)",
        }}
        role="img"
        aria-label="An animated bouquet of flowers growing from the bottom"
      >
        <defs>
          <linearGradient id="paperGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5e6c8" />
            <stop offset="100%" stopColor="#cbb58d" />
          </linearGradient>

          <filter id="flowerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {FLOWERS.map((f, i) => {
          const mx = 0.25 * BASE.x + 0.5 * f.cx + 0.25 * f.x;
          const my = 0.25 * BASE.y + 0.5 * f.cy + 0.25 * f.y;
          const side = i % 2 ? 1 : -1;
          const bloomAt = f.d + STEM_TIME - 0.1;

          return (
            <g key={i}>
              <path
                d={`M${BASE.x} ${BASE.y} Q${f.cx} ${f.cy} ${f.x} ${f.y}`}
                pathLength="1"
                fill="none"
                stroke="#5fae7b"
                strokeWidth="4"
                strokeLinecap="round"
                className="origin-bottom"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: `growStem ${STEM_TIME}s cubic-bezier(.4,.1,.3,1) ${f.d}s forwards`,
                }}
              />

             
              <g transform={`translate(${mx} ${my}) rotate(${side * 55})`}>
                <ellipse
                  cx="0"
                  cy="-12"
                  rx="6"
                  ry="14"
                  fill="#7cc58f"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 100%",
                    transform: "scale(0)",
                    animation: `popLeaf .6s cubic-bezier(.34,1.56,.64,1) ${f.d + STEM_TIME * 0.5}s forwards`,
                  }}
                />
              </g>
              <g transform={`translate(${f.x} ${f.y})`}>
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transform: "scale(0) rotate(-120deg)",
                    animation: `openBloom 1s cubic-bezier(.34,1.56,.64,1) ${bloomAt}s forwards`,
                  }}
                  filter="url(#flowerGlow)"
                >
                  {Array.from({ length: f.n }, (_, k) => (
                    <ellipse
                      key={k}
                      cx="0"
                      cy={-f.r * 0.6}
                      rx={f.r * 0.34}
                      ry={f.r * 0.6}
                      fill={f.color}
                      stroke="#ffffff"
                      strokeOpacity="0.12"
                      strokeWidth="0.7"
                      transform={`rotate(${(360 / f.n) * k})`}
                    />
                  ))}

                  <circle r={f.r * 0.3} fill="#7a3b1d" />
                  <circle r={f.r * 0.14} fill="#c9762f" />
                  <circle cx="-2" cy="-2" r={f.r * 0.045} fill="#fff1b8" />
                </g>
              </g>
            </g>
          );
        })}

        <g
          style={{
            opacity: 0,
            animation: "risePaper .8s ease-out .1s forwards",
          }}
        >
          <path
            d="M140 395 L260 395 L238 485 L162 485 Z"
            fill="url(#paperGradient)"
            stroke="#fff1d5"
            strokeOpacity="0.5"
          />
          <path d="M140 395 L200 420 L260 395 L200 408 Z" fill="#d6c196" />
          <path
            d="M162 485 L180 408 L200 420 L220 408 L238 485"
            fill="#e5d2aa"
            opacity="0.6"
          />
          <rect x="166" y="440" width="68" height="12" rx="3" fill="#ff7a8a" />
          <path
            d="M200 446 C180 425 168 445 193 452 L200 446 L207 452 C232 445 220 425 200 446"
            fill="#ff7a8a"
          />
        </g>
      </svg>

      <div className="shrink-0 pb-1 text-center">
        <p className="text-xs italic text-rose-100/80 sm:text-sm">
          Every flower, a little reminder of you. ( kuchh aa nhi rha tha to yahi likh diya )
        </p>

        <button
          onClick={() => setRun((r) => r + 1)}
          className="mt-3 rounded-full bg-amber-300 px-6 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-300/20 transition duration-300 hover:scale-105 hover:bg-amber-200 active:scale-95 sm:mt-4 sm:px-7 sm:py-2.5 sm:text-base"
        >
          Bloom Again
        </button>
      </div>

      <style>{`
        @keyframes growStem {
          to { stroke-dashoffset: 0; }
        }

        @keyframes popLeaf {
          to { transform: scale(1); }
        }

        @keyframes openBloom {
          to { transform: scale(1) rotate(0deg); }
        }

        @keyframes risePaper {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </main>
  );
}
