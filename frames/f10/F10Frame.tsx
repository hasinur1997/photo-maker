import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Pennant Banner — forest green header + footer bands; photo shows through full-width middle */
export function F10Frame({ customization: c }: FrameComponentProps) {
  const headerH = 108;
  const footerH = 108;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Forest green top header band */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: headerH, paddingLeft: 72, paddingRight: 72, background: C.forest }}
      >
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{ width: 54, height: 54, background: C.gold, color: C.forest, fontSize: 10, fontWeight: 700, marginRight: 14 }}
        >
          স.উ
        </div>
        <div>
          <div style={{ width: 200, height: 9, background: "rgba(255,255,255,0.2)", borderRadius: 2, marginBottom: 7 }} />
          <div style={{ width: 130, height: 7, background: "rgba(232,198,107,0.3)", borderRadius: 2 }} />
        </div>
      </div>

      {/* Thin gold accent line below header */}
      <div className="absolute left-0 right-0" style={{ top: headerH, height: 3, background: C.gold }} />

      {/* Forest green bottom footer band */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-around"
        style={{ height: footerH, background: C.forest }}
      >
        {["আমরা", "একই", "পরিবার"].map((word, i) => (
          <span key={i} style={{ color: C.cream, fontFamily: "Inter", fontSize: 15, fontWeight: 700, letterSpacing: 2 }}>
            {word}
          </span>
        ))}
      </div>

      {/* Thin gold accent line above footer */}
      <div className="absolute left-0 right-0" style={{ bottom: footerH, height: 3, background: C.gold }} />
    </div>
  );
}
