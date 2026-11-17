export function SymbolGlyph({ id }: { id: string }) {
  const tone = toneFor(id);
  return (
    <svg className="fly-glyph" viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" fill="#f4f0d8" />
      <Glyph id={id} tone={tone} />
    </svg>
  );
}

function toneFor(id: string) {
  if (id.startsWith("class-b") || id === "mode-c" || id === "mode-c-veil" || id === "skyline") return "#1a3f86";
  if (id.startsWith("class-c") || id === "class-e" || id === "vfr-checkpoint" || id === "magenta-airport") return "#d1006c";
  if (id === "restricted" || id === "hold-short") return "#1d4e89";
  return "#142033";
}

function Glyph({ id, tone }: { id: string; tone: string }) {
  if (id === "heliport") {
    return (
      <g fill="none" stroke={tone}>
        <circle cx="16" cy="16" r="8" />
        <text x="16" y="19" textAnchor="middle" stroke="none" fill={tone} fontSize="10" fontWeight="700">
          H
        </text>
      </g>
    );
  }
  if (id === "private-r") {
    return (
      <g fill="none" stroke="#d1006c">
        <circle cx="16" cy="16" r="8" />
        <text x="16" y="19" textAnchor="middle" stroke="none" fill="#d1006c" fontSize="10" fontWeight="700">
          R
        </text>
      </g>
    );
  }
  if (id === "beacon") {
    return (
      <text x="16" y="22" textAnchor="middle" fill={tone} fontSize="16">
        ★
      </text>
    );
  }
  if (id === "vfr-checkpoint") {
    return <path d="M10 24 V8 H20 L17 12 H10" fill="#d1006c" />;
  }
  if (id === "vor") {
    return (
      <g fill="none" stroke={tone}>
        <circle cx="16" cy="16" r="8" />
        <path d="M16 6 V26 M6 16 H26" />
      </g>
    );
  }
  if (id === "parachute") {
    return <path d="M8 16 Q16 6 24 16 L16 24 Z" fill="none" stroke={tone} />;
  }
  if (id === "hold-short") {
    return (
      <g stroke="#c4a000" strokeWidth="2">
        <path d="M6 12 H26 M6 16 H26" />
        <path d="M6 20 H26 M6 24 H26" strokeDasharray="3 2" />
      </g>
    );
  }
  if (id === "obstruction") {
    return <path d="M16 8 L22 24 H10 Z" fill="none" stroke={tone} />;
  }
  if (id === "mef") {
    return (
      <text x="16" y="22" textAnchor="middle" fill="#1d4e89" fontSize="14" fontWeight="700">
        16
      </text>
    );
  }
  if (id === "restricted" || id === "east-river") {
    return <rect x="7" y="8" width="18" height="16" fill="rgba(29,78,137,0.15)" stroke={tone} />;
  }
  if (id.includes("airport") || id === "blue-airport" || id === "field-elevation" || id === "runway-numbers" || id === "rp") {
    const ink = id === "blue-airport" || id === "rp" ? "#1a3f86" : "#d1006c";
    return (
      <g stroke={ink} fill="none">
        <circle cx="16" cy="16" r="5" />
        <path d="M16 6 V26" />
      </g>
    );
  }
  return <circle cx="16" cy="16" r="7" fill="none" stroke={tone} strokeWidth="2" />;
}
