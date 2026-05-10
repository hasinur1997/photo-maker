import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Pennant Banner — dark forest green full-canvas overlay with header and footer bands */
export function F10Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Dark green background (photo shows through centre when photo is set) */}
      <div className="absolute inset-0" style={{ background: C.forest }} />

      {/* Top header band */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: 108, paddingLeft: 72, paddingRight: 72, background: C.forest }}
      >
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: 54, height: 54, background: C.gold, color: C.forest, fontSize: 10, fontWeight: 700, marginRight: 14 }}
        >
          স.উ
        </div>
        <div>
          <div style={{ width: 200, height: 9, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginBottom: 7 }} />
          <div style={{ width: 130, height: 7, background: "rgba(232,198,107,0.3)", borderRadius: 2 }} />
        </div>
      </div>

      {/* Photo show-through window */}
      <div
        className="absolute left-0 right-0"
        style={{ top: 108, height: 864, background: "transparent" }}
      />

      {/* Bottom tripartite banner */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-around"
        style={{ height: 108, background: C.forest, borderTop: `2px solid ${C.gold}44` }}
      >
        {["আমরা", "একই", "পরিবার"].map((word, i) => (
          <span key={i} style={{ color: C.cream, fontFamily: "Inter", fontSize: 15, fontWeight: 700, letterSpacing: 2 }}>
            {word}
          </span>
        ))}
      </div>

      {/* Thin gold accent lines */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: C.gold }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 3, background: C.gold }} />
    </div>
  );
}
