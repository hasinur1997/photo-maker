import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Classic Polaroid — cream outer border + white footer strip; photo shows through card window */
export function F1Frame({ customization: c }: FrameComponentProps) {
  // Card: left=126, top=81, w=828, h=918 (scaled from 1200px original)
  // Photo window: x 126–954, y 81–729 (card top portion; footer covers 729–999)
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream outer margin strips — leave card interior transparent */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 81, background: C.cream }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 81, background: C.cream }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 126, background: C.cream }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 126, background: C.cream }} />

      {/* Polaroid footer strip — covers bottom 270px of card */}
      <div
        className="absolute"
        style={{ left: 126, top: 729, width: 828, height: 270, background: C.creamCard }}
      />

      {/* Card shadow (transparent bg so photo shows through) */}
      <div
        className="absolute"
        style={{
          left: 126, top: 81, width: 828, height: 918,
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.35), 0 8px 20px -5px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
}
