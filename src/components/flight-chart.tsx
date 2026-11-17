import type { ChartMark } from "@/lib/flight-types";

export function FlightChart({
  title,
  marks,
  track,
  activeId,
  x,
  y,
  heading,
}: {
  title: string;
  marks: ChartMark[];
  track: string;
  activeId: string;
  x: number;
  y: number;
  heading: number;
}) {
  return (
    <svg className="fly-chart" viewBox="0 0 1000 640" role="img" aria-label={title}>
      <rect width="1000" height="640" fill="#f4f0d8" />
      <g stroke="#d9d0b4" strokeWidth="0.6">
        <path d="M250 0 V640 M500 0 V640 M750 0 V640 M0 213 H1000 M0 426 H1000" />
      </g>
      <path d={track} fill="none" stroke="#8d8680" strokeWidth="1.4" strokeDasharray="4 4" />
      {marks.map((mark, index) => (
        <g key={index} className={mark.id === activeId ? "is-hot" : undefined}>
          <Mark mark={mark} />
        </g>
      ))}
      <g className="fly-chart__ship" transform={`translate(${x} ${y}) rotate(${heading})`}>
        <path d="M0 -18 L11 16 L0 9 L-11 16 Z" fill="#142033" stroke="#fffef8" strokeWidth="2.4" />
      </g>
      <g transform="translate(948 46)" fill="#142033">
        <path d="M0 -18 L5 6 L0 2 L-5 6 Z" />
        <text y="20" textAnchor="middle" fontSize="11" fontWeight="700">
          N
        </text>
      </g>
      <rect x="14" y="600" width="210" height="26" fill="#fffef8" stroke="#1d4e89" />
      <text x="22" y="617" fill="#5c5346" fontSize="11">
        TRAINING — NOT FOR NAVIGATION
      </text>
    </svg>
  );
}

function Mark({ mark }: { mark: ChartMark }) {
  switch (mark.kind) {
    case "water":
      return <path d={mark.d} fill="#b7dff0" stroke="#2c6f99" strokeWidth="1.4" />;
    case "shade":
      return <path d={mark.d} fill={mark.fill} />;
    case "ring":
      return (
        <>
          <circle
            cx={mark.cx}
            cy={mark.cy}
            r={mark.r}
            fill="none"
            stroke={mark.stroke}
            strokeWidth={mark.sw ?? 2.4}
            strokeDasharray={mark.dash}
          />
          {mark.label ? (
            <text x={mark.lx ?? mark.cx} y={mark.ly ?? mark.cy - mark.r - 8} textAnchor="middle" fill={mark.stroke} fontSize="14" fontWeight="700">
              {mark.label}
            </text>
          ) : null}
        </>
      );
    case "path":
      return <path d={mark.d} fill="none" stroke={mark.stroke} strokeWidth={mark.sw ?? 2} strokeDasharray={mark.dash} />;
    case "label":
      return (
        <text x={mark.x} y={mark.y} textAnchor={mark.anchor ?? "middle"} fill={mark.fill ?? "#1c1c1c"} fontSize={mark.size ?? 14} fontWeight="700">
          {mark.text}
        </text>
      );
    case "airport":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke={mark.tower ? "#1a3f86" : "#d1006c"} fill="none" strokeWidth="2">
          <g transform={`rotate(${mark.rot ?? 0})`}>
            <line x1="0" y1="-26" x2="0" y2="26" />
          </g>
          <circle r="11" fill="#f4f0d8" />
          <text y="-34" textAnchor="middle" fill="#111" stroke="none" fontSize="13" fontWeight="700">
            {mark.name}
          </text>
          <text y="40" textAnchor="middle" fill="#111" stroke="none" fontSize="11">
            {mark.detail}
          </text>
        </g>
      );
    case "runway":
      return (
        <g transform={`translate(${mark.x} ${mark.y}) rotate(${mark.rot})`}>
          <rect x={-mark.len / 2} y="-5" width={mark.len} height="10" fill="#3a3a3a" />
          <text y="-14" textAnchor="middle" fill="#111" fontSize="12" fontWeight="700">
            {mark.name}
          </text>
        </g>
      );
    case "flag":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="#d1006c">
          <path d="M0 0 V-22" stroke="#d1006c" strokeWidth="1.4" />
          <path d="M0 -22 H14 L10 -16 H0 Z" />
          <text x="18" y="-12" fontSize="12" fontWeight="700">
            {mark.name}
          </text>
        </g>
      );
    case "report":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`}>
          <rect x="-28" y="-14" width="56" height="20" fill="#fffef8" stroke="#1d4e89" />
          <text textAnchor="middle" y="0" fill="#1d4e89" fontSize="11" fontWeight="700">
            {mark.name}
          </text>
        </g>
      );
    case "mef":
      return (
        <text x={mark.x} y={mark.y} textAnchor="middle" fill="#1d4e89" fontSize="28" fontWeight="700">
          {mark.text}
        </text>
      );
    case "obstruction":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="#1c1c1c">
          <text y="-16" textAnchor="middle" fontSize="12" fontWeight="700">
            {mark.label}
          </text>
          <polygon points="0,0 8,16 -8,16" fill="none" stroke="#1c1c1c" />
        </g>
      );
    case "vor":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="none" stroke="#1d4e89">
          <circle r="22" />
          <path d="M0 -26 V26 M-26 0 H26 M-16 -16 L16 16 M-16 16 L16 -16" strokeWidth="0.8" />
          <text y="-30" textAnchor="middle" stroke="none" fill="#1d4e89" fontSize="13" fontWeight="700">
            {mark.name}
          </text>
          <text y="40" textAnchor="middle" stroke="none" fill="#1d4e89" fontSize="12">
            {mark.freq}
          </text>
        </g>
      );
    case "box":
      return (
        <g>
          <rect x={mark.x} y={mark.y} width={mark.w} height={mark.h} fill="rgba(29,78,137,0.08)" stroke="#1d4e89" />
          <text x={mark.x + mark.w / 2} y={mark.y + mark.h / 2} textAnchor="middle" fill="#1d4e89" fontSize="14" fontWeight="700">
            {mark.label}
          </text>
        </g>
      );
    case "para":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="none" stroke="#1c1c1c">
          <path d="M-12 0 Q0 -16 12 0" />
          <path d="M-6 0 L0 12 L6 0" />
          <text y="28" textAnchor="middle" stroke="none" fontSize="11">
            JUMP
          </text>
        </g>
      );
    case "heli":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke="#1a3f86" fill="#f4f0d8">
          <circle r="12" />
          <text textAnchor="middle" y="4" stroke="none" fill="#1a3f86" fontSize="12" fontWeight="700">
            H
          </text>
          <text y="28" textAnchor="middle" stroke="none" fill="#1a3f86" fontSize="11">
            {mark.name}
          </text>
        </g>
      );
    case "private":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke="#d1006c" fill="#f4f0d8">
          <circle r="12" />
          <text textAnchor="middle" y="4" stroke="none" fill="#d1006c" fontSize="12" fontWeight="700">
            R
          </text>
          <text y="28" textAnchor="middle" stroke="none" fill="#111" fontSize="11">
            {mark.name}
          </text>
        </g>
      );
    case "holdshort":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} stroke="#c4a000" strokeWidth="3">
          <line x1="-30" y1="-8" x2="30" y2="-8" />
          <line x1="-30" y1="-2" x2="30" y2="-2" />
          <line x1="-30" y1="6" x2="30" y2="6" strokeDasharray="6 4" />
          <line x1="-30" y1="12" x2="30" y2="12" strokeDasharray="6 4" />
        </g>
      );
    case "cone":
      return (
        <g transform={`translate(${mark.x} ${mark.y})`} fill="none" stroke="#1c1c1c">
          <circle r="16" strokeDasharray="3 3" />
          <path d="M-8 4 L0 -8 L4 6 Z" fill="#1c1c1c" />
          <text y="32" textAnchor="middle" stroke="none" fontSize="11">
            WIND
          </text>
        </g>
      );
    case "note":
      return (
        <g>
          <rect x={mark.x} y={mark.y} width="150" height={18 + mark.lines.length * 16} fill="#fffef8" stroke="#1d4e89" />
          {mark.lines.map((line, index) => (
            <text key={line} x={mark.x + 8} y={mark.y + 16 + index * 16} fill="#142033" fontSize="12" fontWeight="700">
              {line}
            </text>
          ))}
        </g>
      );
    default:
      return null;
  }
}
