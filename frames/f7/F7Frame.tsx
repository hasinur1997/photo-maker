import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Batch Badge — cream bg, white photo card, circular gold badge at top-right */
export function F7Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream outer margins (card area 54-1001 × 54-900 is transparent for photo) */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 54, background: C.cream }} />
      <div className="absolute left-0 right-0" style={{ top: 900, bottom: 0, background: C.cream }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 54, background: C.cream }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 79, background: C.cream }} />

      {/* Shadow for the white card (transparent so photo shows through) */}
      <div
        className="absolute"
        style={{
          top: 54, left: 54, width: 947, height: 846,
          boxShadow: "0 21px 43px -10px rgba(0,0,0,0.3)",
        }}
      />

      {/* Gold circular badge — TOP-RIGHT of canvas, overlapping card edge */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          top: 27, left: 844, width: 198, height: 198,
          background: C.gold,
          borderRadius: "50%",
          border: `5px solid ${C.cream}`,
          boxShadow: "0 10px 27px -5px rgba(0,0,0,0.35)",
        }}
      >
        <span style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 800, color: C.forest, letterSpacing: 2, textAlign: "center" }}>
          BATCH
        </span>
        <span style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, color: C.forest, textAlign: "center", lineHeight: 1.2 }}>
          SSC
        </span>
      </div>

      {/* Dark green bottom bar */}
      <div
        className="absolute left-0 right-0"
        style={{ top: 999, height: 45, background: C.green }}
      />
    </div>
  );
}
