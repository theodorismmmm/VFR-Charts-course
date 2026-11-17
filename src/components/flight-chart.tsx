import type { ChartMark } from "@/lib/flight-types";

export function FlightChart({
  title,
  marks,
  track,
  activeId,
  x,
  y,
  heading,
  chartSrc,
  chartWidth = 1000,
  chartHeight = 640,
}: {
  title: string;
  marks: ChartMark[];
  track: string;
  activeId: string;
  x: number;
  y: number;
  heading: number;
  chartSrc?: string;
  chartWidth?: number;
  chartHeight?: number;
}) {
  const real = Boolean(chartSrc);
  const font = "var(--font-body), 'Segoe UI', sans-serif";

  return (
    <svg
      className={`fly-chart${real ? " fly-chart--real" : ""}`}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      role="img"
      aria-label={title}
    >
      <defs>
        <pattern id="fly-streets" patternUnits="userSpaceOnUse" width="18" height="18">
          <path d="M0 18 V0 H18" fill="none" stroke="#c4b48a" strokeWidth="0.7" />
        </pattern>
        <pattern id="fly-hatch" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(40)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="#1d4e89" strokeWidth="1.4" />
        </pattern>
        <filter id="fly-paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="n" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.04" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <filter id="fly-hot" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.2" floodColor="#f0b429" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#e0a15a" floodOpacity="0.75" />
        </filter>
      </defs>

      {real ? (
        <image href={chartSrc} x="0" y="0" width={chartWidth} height={chartHeight} preserveAspectRatio="xMidYMid slice" />
      ) : (
        <g filter="url(#fly-paper)">
          <rect width={chartWidth} height={chartHeight} fill="#f3efd6" />
          <g stroke="#6aa4c4" strokeWidth="0.75" opacity="0.55">
            <path d={`M${chartWidth * 0.25} 0 V${chartHeight} M${chartWidth * 0.5} 0 V${chartHeight} M${chartWidth * 0.75} 0 V${chartHeight}`} />
            <path d={`M0 ${chartHeight * 0.33} H${chartWidth} M0 ${chartHeight * 0.66} H${chartWidth}`} />
          </g>
        </g>
      )}

      {!real ? (
        <path d={track} fill="none" stroke="#6b645c" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.85" />
      ) : (
        <path d={track} fill="none" stroke="#142033" strokeWidth="2.2" strokeDasharray="6 5" opacity="0.55" />
      )}

      {marks.map((mark, index) => {
        const hot = mark.id === activeId;
        const plateInk = isDrawnOnPlate(mark.kind);
        if (real && plateInk) {
          if (!hot) return null;
          return (
            <g key={index} className="is-hot" filter="url(#fly-hot)">
              <HotHalo mark={mark} />
            </g>
          );
        }
        return (
          <g key={index} className={hot ? "is-hot" : undefined} filter={hot ? "url(#fly-hot)" : undefined}>
            {real && hot ? <HotHalo mark={mark} /> : null}
            <Mark mark={mark} real={real} font={font} />
          </g>
        );
      })}

      <g className="fly-chart__ship" transform={`translate(${x} ${y}) rotate(${heading})`}>
        <path d="M0 -18 L11 16 L0 9 L-11 16 Z" fill="#142033" stroke="#fffef8" strokeWidth="2.4" />
      </g>

      <g transform={`translate(${chartWidth - 36} 40)`} fill="#142033">
        <path d="M0 -16 L5 6 L0 2 L-5 6 Z" />
        <text y="18" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily={font}>
          N
        </text>
      </g>

      {!real ? (
        <g transform={`translate(18 ${chartHeight - 36})`} fill="#17324d" fontFamily={font}>
          <rect width="120" height="7" fill="#17324d" />
          <rect width="60" height="7" fill="#f4f0d8" stroke="#17324d" />
          <text y="20" fontSize="10">
            0
          </text>
          <text x="100" y="20" fontSize="10">
            10 NM
          </text>
        </g>
      ) : null}

      <rect
        x="10"
        y={chartHeight - 34}
        width={real ? 248 : 220}
        height="24"
        fill="#fffef8"
        stroke="#1d4e89"
        strokeWidth="1.2"
      />
      <text x="18" y={chartHeight - 17} fill="#5c5346" fontSize="11" fontFamily={font} fontWeight="700">
        {real ? "FAA EXCERPT — NOT FOR NAVIGATION" : "TRAINING — NOT FOR NAVIGATION"}
      </text>
    </svg>
  );
}

function isDrawnOnPlate(kind: ChartMark["kind"]) {
  return (
    kind === "water" ||
    kind === "shade" ||
    kind === "ring" ||
    kind === "path" ||
    kind === "airport" ||
    kind === "runway" ||
    kind === "vor" ||
    kind === "heli" ||
    kind === "private" ||
    kind === "obstruction" ||
    kind === "mef" ||
    kind === "cone" ||
    kind === "holdshort" ||
    kind === "para"
  );
}

function HotHalo({ mark }: { mark: ChartMark }) {
  if (mark.kind === "ring") {
    return <circle cx={mark.cx} cy={mark.cy} r={mark.r + 10} fill="none" stroke="#f0b429" strokeWidth="4" opacity="0.9" />;
  }
  if (mark.kind === "box" || mark.kind === "note") {
    const w = mark.kind === "box" ? mark.w : 150;
    const h = mark.kind === "box" ? mark.h : 18 + mark.lines.length * 16;
    return <rect x={mark.x - 6} y={mark.y - 6} width={w + 12} height={h + 12} fill="none" stroke="#f0b429" strokeWidth="3.5" />;
  }
  if ("x" in mark && "y" in mark && typeof mark.x === "number" && typeof mark.y === "number") {
    return <circle cx={mark.x} cy={mark.y} r="28" fill="none" stroke="#f0b429" strokeWidth="3.5" />;
  }
  return null;
}

function Mark({ mark, real, font }: { mark: ChartMark; real: boolean; font: string }) {
  switch (mark.kind) {
    case "water":
      return <path d={mark.d} fill="#b7dff0" stroke="#2c6f99" strokeWidth="1.6" />;
    case "shade":
      return <path d={mark.d} fill={mark.fill} />;
    case "ring":
      return (
        <>
          <circle
            cx={mark.cx}
            cy={mark.cy}
            r={mark.r}
            fill={real ? "rgba(240,180,41,0.12)" : "none"}
            stroke={real ? "#f0b429" : mark.stroke}
            strokeWidth={mark.sw ?? 2.6}
            strokeDasharray={mark.dash}
          />
          {mark.label && !real ? (
            <text
              x={mark.lx ?? mark.cx}
              y={mark.ly ?? mark.cy - mark.r - 8}
              textAnchor="middle"
              fill={mark.stroke}
              fontSize="13"
              fontWeight="700"
              fontFamily={font}
            >
              {mark.label}
            </text>
          ) : null}
        </>
      );
    case "path":
      return <path d={mark.d} fill="none" stroke={mark.stroke} strokeWidth={mark.sw ?? 2.4} strokeDasharray={mark.dash} />;
    case "label":
      return real ? (
        <g>
          <rect x={mark.x - 4} y={mark.y - (mark.size ?? 14)} width={estimateLabelWidth(mark.text, mark.size ?? 14)} height={(mark.size ?? 14) + 8} fill="rgba(255,254,248,0.92)" stroke="#1d4e89" />
          <text x={mark.x} y={mark.y} fill={mark.fill ?? "#142033"} fontSize={mark.size ?? 13} fontWeight="700" fontFamily={font}>
            {mark.text}
          </text>
        </g>
      ) : (
        <text
          x={mark.x}
          y={mark.y}
          textAnchor={mark.anchor ?? "middle"}
          fill={mark.fill ?? "#1c1c1c"}
          fontSize={mark.size ?? 14}
          fontWeight="700"
          fontFamily={font}
        >
          {mark.text}
        </text>
      );
    case "airport":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke={mark.tower ? "#1a3f86" : "#d1006c"} fill="none" strokeWidth="2.3">
          <g transform={`rotate(${mark.rot ?? 0})`}>
            <line x1="0" y1="-28" x2="0" y2="28" />
            {mark.tower ? <line x1="-22" y1="0" x2="22" y2="0" /> : null}
          </g>
          <circle r="11" fill="#f4f0d8" />
          <text y="-34" textAnchor="middle" fill="#111" stroke="none" fontSize="13" fontWeight="700" fontFamily={font}>
            {mark.name}
          </text>
          <text y="42" textAnchor="middle" fill="#111" stroke="none" fontSize="11" fontFamily={font}>
            {mark.detail}
          </text>
        </g>
      );
    case "runway":
      return (
        <g transform={`translate(${mark.x} ${mark.y}) rotate(${mark.rot})`}>
          <rect x={-mark.len / 2} y="-5" width={mark.len} height="10" fill="#3a3a3a" stroke="#111" strokeWidth="0.6" />
          <line x1={-mark.len / 2 + 4} y1="0" x2={mark.len / 2 - 4} y2="0" stroke="#fffef8" strokeWidth="1.2" strokeDasharray="4 3" />
          <text y="-14" textAnchor="middle" fill="#111" fontSize="12" fontWeight="700" fontFamily={font}>
            {mark.name}
          </text>
        </g>
      );
    case "flag":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="#d1006c">
          <path d="M0 0 V-22" stroke="#d1006c" strokeWidth="1.5" />
          <path d="M0 -22 H14 L10 -16 H0 Z" />
          <text x="18" y="-12" fontSize="12" fontWeight="700" fontFamily={font}>
            {mark.name}
          </text>
        </g>
      );
    case "report":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`}>
          <rect x="-34" y="-14" width="68" height="22" fill="#fffef8" stroke="#1d4e89" strokeWidth="1.4" />
          <text textAnchor="middle" y="2" fill="#1d4e89" fontSize="11" fontWeight="700" fontFamily={font}>
            {mark.name}
          </text>
        </g>
      );
    case "mef":
      return (
        <text x={mark.x} y={mark.y} textAnchor="middle" fill="#1d4e89" fontSize="28" fontWeight="700" fontFamily={font}>
          {mark.text}
        </text>
      );
    case "obstruction":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="#1c1c1c" fontFamily={font}>
          <text y="-18" textAnchor="middle" fontSize="12" fontWeight="700">
            {mark.label}
          </text>
          <line x1="0" y1="-4" x2="0" y2="12" stroke="#1c1c1c" strokeWidth="1.5" />
          <polygon points="0,4 9,20 -9,20" fill="none" stroke="#1c1c1c" strokeWidth="1.5" />
          <circle cy="-4" r="2.2" />
        </g>
      );
    case "vor":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="none" stroke="#1d4e89" strokeWidth="1.6">
          <circle r="24" />
          <path d="M0 -30 V30 M-30 0 H30 M-18 -18 L18 18 M-18 18 L18 -18" strokeWidth="0.9" />
          <circle r="3.2" fill="#1d4e89" stroke="none" />
          <text y="-34" textAnchor="middle" stroke="none" fill="#1d4e89" fontSize="13" fontWeight="700" fontFamily={font}>
            {mark.name}
          </text>
          <text y="42" textAnchor="middle" stroke="none" fill="#1d4e89" fontSize="12" fontFamily={font}>
            {mark.freq}
          </text>
        </g>
      );
    case "box":
      return (
        <g fontFamily={font}>
          <rect x={mark.x} y={mark.y} width={mark.w} height={mark.h} fill={real ? "rgba(255,254,248,0.88)" : "rgba(29,78,137,0.1)"} stroke="#1d4e89" strokeWidth="1.6" />
          {!real ? <rect x={mark.x} y={mark.y} width={mark.w} height={mark.h} fill="url(#fly-hatch)" opacity="0.35" /> : null}
          <text x={mark.x + mark.w / 2} y={mark.y + mark.h / 2 + 5} textAnchor="middle" fill="#1d4e89" fontSize="13" fontWeight="700">
            {mark.label}
          </text>
        </g>
      );
    case "para":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="none" stroke="#1c1c1c" strokeWidth="1.5">
          <path d="M-14 0 Q0 -18 14 0" />
          <path d="M-7 0 L0 14 L7 0" />
          <text y="30" textAnchor="middle" stroke="none" fontSize="11" fontFamily={font}>
            JUMP
          </text>
        </g>
      );
    case "heli":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke="#1a3f86" fill="#f4f0d8" strokeWidth="1.8">
          <circle r="13" />
          <text textAnchor="middle" y="5" stroke="none" fill="#1a3f86" fontSize="13" fontWeight="700" fontFamily={font}>
            H
          </text>
          <text y="30" textAnchor="middle" stroke="none" fill="#1a3f86" fontSize="11" fontFamily={font}>
            {mark.name}
          </text>
        </g>
      );
    case "private":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke="#d1006c" fill="#f4f0d8" strokeWidth="1.8">
          <circle r="13" />
          <text textAnchor="middle" y="5" stroke="none" fill="#d1006c" fontSize="13" fontWeight="700" fontFamily={font}>
            R
          </text>
          <text y="30" textAnchor="middle" stroke="none" fill="#111" fontSize="11" fontFamily={font}>
            {mark.name}
          </text>
        </g>
      );
    case "holdshort":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke="#c4a000" strokeWidth="3.2">
          <line x1="-32" y1="-8" x2="32" y2="-8" />
          <line x1="-32" y1="-2" x2="32" y2="-2" />
          <line x1="-32" y1="6" x2="32" y2="6" strokeDasharray="6 4" />
          <line x1="-32" y1="12" x2="32" y2="12" strokeDasharray="6 4" />
        </g>
      );
    case "cone":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="none" stroke="#1c1c1c" strokeWidth="1.5">
          <circle r="17" strokeDasharray="3 3" />
          <path d="M-8 4 L0 -10 L5 7 Z" fill="#1c1c1c" />
          <text y="34" textAnchor="middle" stroke="none" fontSize="11" fontFamily={font}>
            WIND
          </text>
        </g>
      );
    case "note":
      return (
        <g fontFamily={font}>
          <rect
            x={mark.x}
            y={mark.y}
            width="158"
            height={18 + mark.lines.length * 16}
            fill="rgba(255,254,248,0.94)"
            stroke="#1d4e89"
            strokeWidth="1.4"
          />
          {mark.lines.map((line, index) => (
            <text key={line} x={mark.x + 8} y={mark.y + 16 + index * 16} fill="#142033" fontSize="12" fontWeight="700">
              {line}
            </text>
          ))}
        </g>
      );
    case "city":
      return (
        <g>
          <path d={mark.d} fill="#f6e4ae" />
          <path d={mark.d} fill="url(#fly-streets)" />
        </g>
      );
    default:
      return null;
  }
}

function estimateLabelWidth(text: string, size: number) {
  return Math.max(48, text.length * size * 0.62 + 12);
}
