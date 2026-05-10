import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Yearbook Card — warm cream with white inner card and yearbook header */
export function F9Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Warm cream background */}
      <div className="absolute inset-0" style={{ background: C.creamWarm }} />

      {/* White inner card — photo shows through centre */}
      <div
        className="absolute"
        style={{
          left: 60, top: 63, width: 960, height: 960,
          background: C.creamCard,
          boxShadow: "0 27px 54px -13px rgba(0,0,0,0.3)",
        }}
      />

      {/* Header bar inside card */}
      <div
        className="absolute flex items-center"
        style={{ left: 60, top: 63, width: 960, height: 63, paddingLeft: 16, paddingRight: 16, background: C.creamCard }}
      >
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: 45, height: 45, background: C.green, color: C.cream, fontSize: 9, fontWeight: 700, marginRight: 10 }}
        >
          স.উ
        </div>
        <div>
          <div style={{ width: 190, height: 8, background: `${C.green}44`, borderRadius: 2, marginBottom: 5 }} />
          <div style={{ width: 120, height: 7, background: `${C.gold}66`, borderRadius: 2 }} />
        </div>
        <div className="flex-1" />
        <div style={{ color: C.gold, fontFamily: "Inter", fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>
          ALUMNI ASSOCIATION · YEARBOOK
        </div>
      </div>

      {/* Photo area is transparent inside the card */}

      {/* Bottom footer inside card */}
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 60, top: 970, width: 960, height: 53, background: C.creamCard }}
      >
        <span style={{ color: C.green, fontFamily: "Inter", fontSize: 11, letterSpacing: 3, fontWeight: 600 }}>
          ★ ESTD 1985 ★
        </span>
      </div>

      {/* Outer cream padding strips */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 63, background: C.creamWarm }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 57, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 60, background: C.creamWarm }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 60, background: C.creamWarm }} />
    </div>
  );
}
