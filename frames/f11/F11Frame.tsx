import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Stamped Year — warm cream outer, white inner card with green accent line at top, stamp badge */
export function F11Frame({ customization: c }: FrameComponentProps) {
  // Card: 45px inset → 990×990 (original: 50px inset 1000×1000 in 1200px, scaled ×0.9)
  const inset = 45;
  const cardSize = 1080 - 2 * inset; // 990

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Warm cream outer */}
      <div className="absolute inset-0" style={{ background: C.creamWarm }} />

      {/* Inner card with shadow */}
      <div
        className="absolute"
        style={{
          top: inset, left: inset, width: cardSize, height: cardSize,
          background: C.creamCard,
          boxShadow: "0 18px 45px -10px rgba(0,0,0,0.25)",
        }}
      />

      {/* Green accent line at top of card */}
      <div
        className="absolute"
        style={{ top: inset, left: inset, width: cardSize, height: 4, background: C.green }}
      />

      {/* Header row inside card */}
      <div
        className="absolute flex items-center"
        style={{ top: inset + 4, left: inset, width: cardSize, height: 111, paddingLeft: 22, paddingRight: 22, background: C.creamCard }}
      >
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{ width: 54, height: 54, background: C.green, color: C.cream, fontSize: 10, fontWeight: 700, marginRight: 14 }}
        >
          স.উ
        </div>
        <div>
          <div style={{ width: 210, height: 9, background: `${C.green}33`, borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: 130, height: 7, background: `${C.gold}55`, borderRadius: 2 }} />
        </div>
        <div className="flex-1" />
        <div
          style={{
            border: `2px solid ${C.gold}`, borderRadius: 4, padding: "4px 10px",
            color: C.gold, fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: 2,
          }}
        >
          SSC BATCH
        </div>
      </div>

      {/* Bottom footer inside card */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: inset + cardSize - 75, left: inset, width: cardSize, height: 75, background: C.creamCard }}
      >
        <span style={{ color: `${C.green}99`, fontFamily: "Inter", fontSize: 11, letterSpacing: 2, fontStyle: "italic" }}>
          স্মৃতির খামে যত্নে রাখা
        </span>
      </div>

      {/* Green accent line at bottom of card */}
      <div
        className="absolute"
        style={{ top: inset + cardSize - 4, left: inset, width: cardSize, height: 4, background: C.green }}
      />

      {/* Outer cream strips */}
      <div className="absolute top-0 left-0 right-0" style={{ height: inset, background: C.creamWarm }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: inset, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: inset, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: inset, background: C.creamWarm }} />
    </div>
  );
}
