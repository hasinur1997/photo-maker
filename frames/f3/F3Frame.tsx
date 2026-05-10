import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

const StampCorner = () => (
  <svg width="54" height="54" viewBox="0 0 60 60" fill="none">
    <path d="M5 5 L20 5 M5 5 L5 20 M5 5 Q15 8 20 20 M5 5 Q8 15 20 20"
      stroke={C.gold} strokeWidth="1.5" fill="none" />
    <circle cx="22" cy="22" r="2" fill={C.gold} />
  </svg>
);

/** Vintage Stamp — cream background with nested border frames and SVG corner stamps */
export function F3Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream background */}
      <div className="absolute inset-0" style={{ background: C.cream }} />

      {/* Outer border frame */}
      <div
        className="absolute"
        style={{ inset: 27, border: `2px solid rgba(28,74,43,0.25)` }}
      />
      {/* Inner border frame */}
      <div
        className="absolute"
        style={{ inset: 45, border: `1.5px solid rgba(200,148,26,0.4)` }}
      />

      {/* Corner stamps — each rotated to face their corner */}
      <div className="absolute" style={{ top: 18, left: 18 }}>
        <StampCorner />
      </div>
      <div className="absolute" style={{ top: 18, right: 18, transform: "scaleX(-1)" }}>
        <StampCorner />
      </div>
      <div className="absolute" style={{ bottom: 18, left: 18, transform: "scaleY(-1)" }}>
        <StampCorner />
      </div>
      <div className="absolute" style={{ bottom: 18, right: 18, transform: "scale(-1,-1)" }}>
        <StampCorner />
      </div>

      {/* Bottom decorative text stripe */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ height: 54, background: "rgba(28,74,43,0.06)" }}
      >
        <span style={{ color: C.green, fontFamily: "Inter", fontSize: 11, letterSpacing: 3, fontWeight: 600, opacity: 0.7 }}>
          ❦  স্মৃতির বন্ধনে আবদ্ধ আমরা সবাই  ❦
        </span>
      </div>
    </div>
  );
}
