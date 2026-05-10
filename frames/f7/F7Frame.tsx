import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Batch Badge — cream background, white photo card, gold badge top-left */
export function F7Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream background */}
      <div className="absolute inset-0" style={{ background: C.cream }} />

      {/* White photo card — photo shows through */}
      <div
        className="absolute"
        style={{
          left: 14, top: 155, width: 947, height: 846,
          boxShadow: "0 21px 43px -10px rgba(0,0,0,0.3)",
          background: "transparent",
          outline: `2px solid ${C.white}`,
        }}
      />

      {/* Gold badge square top-left */}
      <div
        className="absolute flex flex-col items-center justify-center gap-0"
        style={{
          left: 14, top: 0, width: 198, height: 198,
          background: C.gold,
          boxShadow: "0 10px 27px -5px rgba(0,0,0,0.35)",
        }}
      >
        <span style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 800, color: C.forest, letterSpacing: 2 }}>
          BATCH
        </span>
        <span style={{ fontFamily: "Inter", fontSize: 54, fontWeight: 700, color: C.forest, lineHeight: 1 }}>
          &#8226;&#8226;&#8226;
        </span>
        <span style={{ fontFamily: "Inter", fontSize: 14, fontWeight: 700, color: C.forest }}>
          SSC
        </span>
      </div>

      {/* Bottom cream strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{ height: 79, background: C.cream, paddingLeft: 20 }}
      >
        <div style={{ width: 160, height: 8, background: `${C.green}33`, borderRadius: 2 }} />
      </div>
    </div>
  );
}
