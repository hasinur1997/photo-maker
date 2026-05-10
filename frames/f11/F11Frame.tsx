import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Stamped Year — warm cream outer strips, card header + footer visible; photo shows through center */
export function F11Frame({ customization: c }: FrameComponentProps) {
  const inset = 45;
  const cardW = 1080 - 2 * inset; // 990
  const accentH = 4;
  const headerH = 111;
  const footerH = 75;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Warm cream outer margin strips */}
      <div className="absolute top-0 left-0 right-0" style={{ height: inset, background: C.creamWarm }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: inset, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: inset, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: inset, background: C.creamWarm }} />

      {/* Card shadow (transparent bg — photo shows through center) */}
      <div
        className="absolute"
        style={{
          top: inset, left: inset, width: cardW, height: cardW,
          boxShadow: "0 18px 45px -10px rgba(0,0,0,0.25)",
        }}
      />

      {/* Green accent line at top of card */}
      <div className="absolute" style={{ top: inset, left: inset, width: cardW, height: accentH, background: C.green }} />

      {/* Card header */}
      <div
        className="absolute flex items-center"
        style={{ top: inset + accentH, left: inset, width: cardW, height: headerH, paddingLeft: 22, paddingRight: 22, background: C.creamCard }}
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

      {/* Card footer */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: inset + cardW - footerH - accentH, left: inset, width: cardW, height: footerH, background: C.creamCard }}
      >
        <span style={{ color: `${C.green}99`, fontFamily: "Inter", fontSize: 11, letterSpacing: 2, fontStyle: "italic" }}>
          স্মৃতির খামে যত্নে রাখা
        </span>
      </div>

      {/* Green accent line at bottom of card */}
      <div
        className="absolute"
        style={{ top: inset + cardW - accentH, left: inset, width: cardW, height: accentH, background: C.green }}
      />
    </div>
  );
}
