import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Year Frame Giant — cream background, giant year behind a white square card */
export function F8Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream background */}
      <div className="absolute inset-0" style={{ background: C.cream }} />

      {/* Giant year text — rendered in the frame, behind the card */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: 0, left: 0, right: 0, height: 291 }}
      >
        <span
          style={{
            fontFamily: "'Hind Siliguri', sans-serif",
            fontSize: 342,
            fontWeight: 500,
            color: C.green,
            lineHeight: 1,
            letterSpacing: -10,
            userSelect: "none",
          }}
        >
          &#8226;&#8226;&#8226;&#8226;
        </span>
      </div>

      {/* White square card — photo shows through (transparent) */}
      <div
        className="absolute"
        style={{
          left: 160, top: 160, width: 760, height: 760,
          background: "transparent",
          outline: `2px solid ${C.white}`,
          boxShadow: "0 21px 45px -10px rgba(0,0,0,0.35)",
        }}
      />

      {/* Bottom strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
        style={{ height: 160, paddingBottom: 10 }}
      >
        <div style={{ color: C.green, fontSize: 10, fontFamily: "Inter", letterSpacing: 3 }}>
          ❦ SSC BATCH ❦
        </div>
      </div>
    </div>
  );
}
