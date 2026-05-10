import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Stamped Year — warm cream with white inner card, envelope/letter aesthetics */
export function F11Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Warm cream background */}
      <div className="absolute inset-0" style={{ background: C.creamWarm }} />

      {/* White inner card — photo shows through */}
      <div
        className="absolute"
        style={{
          left: 40, top: 45, width: 1000, height: 1000,
          background: C.creamCard,
          boxShadow: "0 18px 45px -10px rgba(0,0,0,0.25)",
        }}
      />

      {/* Top border accent inside card */}
      <div
        className="absolute"
        style={{ left: 40, top: 45, width: 1000, height: 4, background: C.green }}
      />

      {/* Header row inside card */}
      <div
        className="absolute flex items-center"
        style={{ left: 40, top: 49, height: 117, width: 1000, paddingLeft: 20, paddingRight: 20, background: C.creamCard }}
      >
        <div
          className="rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ width: 58, height: 58, background: C.green, color: C.cream, fontSize: 10, fontWeight: 700, marginRight: 14 }}
        >
          স.উ
        </div>
        <div>
          <div style={{ width: 200, height: 9, background: `${C.green}33`, borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: 130, height: 7, background: `${C.gold}55`, borderRadius: 2 }} />
        </div>
        <div className="flex-1" />
        {/* Stamp-like badge */}
        <div
          style={{ border: `2px solid ${C.gold}`, borderRadius: 4, padding: "4px 10px",
            color: C.gold, fontFamily: "Inter", fontSize: 10, fontWeight: 700, letterSpacing: 2 }}
        >
          SSC BATCH
        </div>
      </div>

      {/* Photo area transparent — photo shows through */}

      {/* Bottom footer inside card */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 40, top: 960, width: 1000, height: 85, background: C.creamCard }}
      >
        <span style={{ color: "rgba(28,74,43,0.6)", fontFamily: "Inter", fontSize: 11, letterSpacing: 2, fontStyle: "italic" }}>
          স্মৃতির খামে যত্নে রাখা
        </span>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute"
        style={{ left: 40, top: 1041, width: 1000, height: 4, background: C.green }}
      />

      {/* Outer cream strips */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 45, background: C.creamWarm }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 35, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 40, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 40, background: C.creamWarm }} />
    </div>
  );
}
