type BrandVariant = "dark" | "light";

export function Brand({
  compact = false,
  variant = "dark"
}: {
  compact?: boolean;
  variant?: BrandVariant;
  priority?: boolean;
}) {
  const isLight = variant === "light";
  const primary = isLight ? "#ffffff" : "#003399";
  const secondary = "#ffcc00";
  const muted = isLight ? "rgba(255,255,255,.72)" : "#5b6d82";

  return (
    <span className={`brand ${compact ? "brand-compact" : ""} brand-${variant}`}>
      <span className="brand-logo-frame">
        <svg
          className="brand-logo"
          viewBox="0 0 360 177"
          role="img"
          aria-label="Capital European - consultanță fonduri europene și servicii administrative"
          focusable="false"
        >
          <defs>
            <linearGradient id={`ce-mark-${variant}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={secondary} />
              <stop offset="1" stopColor="#ffe071" />
            </linearGradient>
          </defs>
          <rect x="8" y="22" width="86" height="86" rx="24" fill={`url(#ce-mark-${variant})`} />
          <path d="M34 72.5c0-16.5 11.3-29.1 27.7-29.1 8.6 0 16.1 3.5 20.8 9.4l-10.1 8.4c-2.7-3.2-6-5-10.4-5-8.2 0-13.7 6.7-13.7 16.3 0 9.8 5.7 16.4 14.1 16.4 4.9 0 8.4-2 11.2-5.8l10.2 8.1c-4.8 6.8-12.6 10.7-22 10.7C45.1 101.9 34 89.2 34 72.5Z" fill="#021b52" />
          <path d="M23 125h62" stroke={secondary} strokeWidth="8" strokeLinecap="round" />
          <text x="112" y="70" fill={primary} fontFamily="Segoe UI, Arial, sans-serif" fontSize="34" fontWeight="900" letterSpacing="-.5">
            CAPITAL
          </text>
          <text x="112" y="105" fill={secondary} fontFamily="Segoe UI, Arial, sans-serif" fontSize="34" fontWeight="900" letterSpacing="-.5">
            EUROPEAN
          </text>
          <text x="114" y="132" fill={muted} fontFamily="Segoe UI, Arial, sans-serif" fontSize="13" fontWeight="700">
            fonduri europene · servicii administrative
          </text>
          <g fill={secondary} opacity={isLight ? ".95" : ".9"}>
            <circle cx="302" cy="42" r="3" />
            <circle cx="318" cy="55" r="3" />
            <circle cx="323" cy="75" r="3" />
            <circle cx="313" cy="93" r="3" />
            <circle cx="294" cy="101" r="3" />
            <circle cx="275" cy="93" r="3" />
            <circle cx="265" cy="75" r="3" />
            <circle cx="270" cy="55" r="3" />
          </g>
        </svg>
      </span>
    </span>
  );
}
