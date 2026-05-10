import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Vintage Stamp — cream outer border strips + nested rectangular borders; photo shows through center */
export function F3Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream outer margin strips (0–45px on each side) — leave center transparent for photo */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 45, background: C.cream }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 45, background: C.cream }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 45, background: C.cream }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 45, background: C.cream }} />

      {/* Outer double border — green at inset 27px */}
      <div
        className="absolute"
        style={{ inset: 27, border: `3px double ${C.green}` }}
      />

      {/* Inner solid border — gold at inset 45px */}
      <div
        className="absolute"
        style={{ inset: 45, border: `1px solid ${C.gold}` }}
      />

      {/* Corner ornaments */}
      {([
        { top: 18, left: 18 },
        { top: 18, right: 18, transform: "scaleX(-1)" },
        { bottom: 18, left: 18, transform: "scaleY(-1)" },
        { bottom: 18, right: 18, transform: "scale(-1,-1)" },
      ] as React.CSSProperties[]).map((style, i) => (
        <div key={i} className="absolute" style={style}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M6 6 L18 6 M6 6 L6 18" stroke={C.green} strokeWidth="2" strokeLinecap="square" />
            <path d="M10 10 L16 10 M10 10 L10 16" stroke={C.gold} strokeWidth="1" strokeLinecap="square" />
            <circle cx="19" cy="19" r="1.5" fill={C.gold} />
          </svg>
        </div>
      ))}

      {/* Bottom decorative strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ height: 50, background: `rgba(250,246,237,0.85)` }}
      >
        <span style={{ color: C.green, fontFamily: "Inter", fontSize: 10, letterSpacing: 3, fontWeight: 600, opacity: 0.8 }}>
          ❦ স্মৃতির বন্ধনে আবদ্ধ আমরা সবাই ❦
        </span>
      </div>
    </div>
  );
}
