import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Magazine Cover — black background, full-canvas photo, gradient overlays top/bottom */
export function F6Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Top gradient overlay */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 252,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Top header content area */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: 68, paddingLeft: 60, paddingRight: 60 }}
      >
        <div
          className="flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ width: 48, height: 48, background: C.gold, color: C.forest, marginRight: 12, fontSize: 10 }}
        >
          স.উ
        </div>
        <div style={{ color: C.white, fontFamily: "Inter", fontSize: 11, letterSpacing: 2 }}>
          ALUMNI &#39;26
        </div>
        <div className="flex-1" />
        <div style={{ color: C.gold, fontSize: 10, fontFamily: "Inter", letterSpacing: 3, fontWeight: 700 }}>
          VOL. 01
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 324,
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Bottom content bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
        style={{ height: 54, paddingLeft: 60, paddingRight: 60 }}
      >
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, fontFamily: "Inter", letterSpacing: 2 }}>
          SARATGANJ · MEMORIES
        </div>
        <div
          style={{ width: 36, height: 36, borderRadius: "50%",
            background: C.gold, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.forest }}
        >
          &#9733;
        </div>
      </div>
    </div>
  );
}
