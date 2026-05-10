import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Yearbook Card — warm cream outer strips, card header + footer visible; photo shows through center */
export function F9Frame({ customization: c }: FrameComponentProps) {
  const inset = 63;
  const cardW = 1080 - 2 * inset; // 954
  const headerH = 66;
  const footerH = 57;

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
          boxShadow: "0 24px 48px -12px rgba(0,0,0,0.3)",
        }}
      />

      {/* Card header bar */}
      <div
        className="absolute flex items-center"
        style={{ top: inset, left: inset, width: cardW, height: headerH, paddingLeft: 18, paddingRight: 18, background: C.creamCard }}
      >
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{ width: 42, height: 42, background: C.green, color: C.cream, fontSize: 9, fontWeight: 700, marginRight: 12 }}
        >
          স.উ
        </div>
        <div>
          <div style={{ width: 200, height: 9, background: `${C.green}33`, borderRadius: 2, marginBottom: 5 }} />
          <div style={{ width: 120, height: 7, background: `${C.gold}55`, borderRadius: 2 }} />
        </div>
        <div className="flex-1" />
        <div style={{ color: C.gold, fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>
          YEARBOOK
        </div>
      </div>

      {/* Card footer bar */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: inset + cardW - footerH, left: inset, width: cardW, height: footerH, background: C.creamCard }}
      >
        <span style={{ color: C.green, fontFamily: "Inter", fontSize: 11, letterSpacing: 3, fontWeight: 600 }}>
          ★ ALUMNI ASSOCIATION ★
        </span>
      </div>
    </div>
  );
}
