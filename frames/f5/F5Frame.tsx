import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Circular Portrait — warm cream background with SVG geometric cross overlay */
export function F5Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Warm cream background */}
      <div className="absolute inset-0" style={{ background: C.creamWarm }} />

      {/* SVG geometric overlay — cross/trophy shape from original */}
      <div className="absolute" style={{ left: 90, top: 441, width: 900, height: 540 }}>
        <svg viewBox="0 0 400 280" fill={C.dark} xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}>
          <ellipse cx="38" cy="200" rx="30" ry="55" opacity="0.12" />
          <ellipse cx="370" cy="210" rx="32" ry="48" opacity="0.1" />
          <rect x="80" y="120" width="240" height="140" opacity="0.08" />
          <rect x="170" y="60" width="60" height="200" opacity="0.08" />
          <polygon points="170,60 200,30 230,60" opacity="0.1" />
          <rect x="195" y="20" width="10" height="20" opacity="0.1" />
          <polygon points="80,120 120,95 200,95 200,120" opacity="0.08" />
          <polygon points="200,120 280,95 320,120" opacity="0.08" />
        </svg>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 6, background: C.dark }} />

      {/* Bottom accent bar with diamond text */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ height: 72, background: C.dark }}
      >
        <span style={{ color: C.cream, fontFamily: "Inter", fontSize: 12, letterSpacing: 4, fontWeight: 600 }}>
          ◆ ALUMNI ASSOCIATION ◆
        </span>
      </div>

      {/* Side accent lines */}
      <div className="absolute left-0 top-0 bottom-0" style={{ width: 6, background: C.dark }} />
      <div className="absolute right-0 top-0 bottom-0" style={{ width: 6, background: C.dark }} />
    </div>
  );
}
