import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Classic Polaroid — cream border frame with white card and wide bottom margin */
export function F1Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream background fills the canvas */}
      <div className="absolute inset-0" style={{ background: C.cream }} />

      {/* White Polaroid card — photo shows through (no bg on photo portion) */}
      <div
        className="absolute"
        style={{
          left: 126, top: 81, width: 828, height: 918,
          boxShadow: "0 27px 54px -13px rgba(0,0,0,0.35), 0 7px 18px -4px rgba(0,0,0,0.15)",
        }}
      >
        {/* Bottom white footer (Polaroid writing area) — top portion stays transparent */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 270, background: C.creamCard }}
        />
      </div>

      {/* Cream left/right borders overlay the card edges */}
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 126, background: C.cream }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 126, background: C.cream }} />
      <div className="absolute top-0 left-0 right-0" style={{ height: 81, background: C.cream }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 81, background: C.cream }} />
    </div>
  );
}
