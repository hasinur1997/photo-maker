import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Vintage Stamp — cream bg, prominent green double-border at 27px, gold solid border at 45px, corner ornaments */
export function F3Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 10%, rgba(200,148,26,0.04), transparent 50%), radial-gradient(circle at 80% 90%, rgba(28,74,43,0.05), transparent 60%), ${C.cream}`,
        }}
      />

      {/* Outer double border — green, 3px double-line at inset 27px */}
      <div
        className="absolute"
        style={{ inset: 27, border: `3px double ${C.green}` }}
      />

      {/* Inner solid border — gold, 1px at inset 45px */}
      <div
        className="absolute"
        style={{ inset: 45, border: `1px solid ${C.gold}` }}
      />

      {/* Corner ornaments — small L-shaped flourishes */}
      {[
        { top: 18, left: 18 },
        { top: 18, right: 18, transform: "scaleX(-1)" },
        { bottom: 18, left: 18, transform: "scaleY(-1)" },
        { bottom: 18, right: 18, transform: "scale(-1,-1)" },
      ].map((style, i) => (
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
        style={{ height: 50, background: `rgba(28,74,43,0.05)` }}
      >
        <span style={{ color: C.green, fontFamily: "Inter", fontSize: 10, letterSpacing: 3, fontWeight: 600, opacity: 0.8 }}>
          ❦ স্মৃতির বন্ধনে আবদ্ধ আমরা সবাই ❦
        </span>
      </div>
    </div>
  );
}
