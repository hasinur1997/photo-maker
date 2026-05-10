import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Modern Editorial Border — dark green header/side/footer borders, photo shows through cream card window */
export function F2Frame({ customization: c }: FrameComponentProps) {
  // Card window: top=153, left=54, w=947, h=810 → photo shows through here
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Dark green fills outer borders */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 153, background: C.green }} />
      <div className="absolute left-0 right-0" style={{ top: 963, bottom: 0, background: C.green }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 54, background: C.green }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 79, background: C.green }} />

      {/* Header content: logo circle + school name placeholders */}
      <div
        className="absolute flex items-center"
        style={{ top: 0, left: 0, right: 0, height: 153, paddingLeft: 72, paddingRight: 72 }}
      >
        {/* Gold logo circle */}
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{ width: 60, height: 60, background: C.gold, color: C.forest, fontSize: 11, fontWeight: 700, marginRight: 16 }}
        >
          স.উ
        </div>
        {/* Name block placeholders */}
        <div className="flex flex-col gap-2">
          <div style={{ width: 220, height: 11, background: "rgba(250,246,237,0.25)", borderRadius: 2 }} />
          <div style={{ width: 130, height: 8, background: "rgba(232,198,107,0.3)", borderRadius: 2 }} />
        </div>
        <div className="flex-1" />
        <div style={{ color: C.goldLight, fontSize: 12, fontFamily: "Inter", letterSpacing: 3, fontWeight: 700 }}>
          ALUMNI
        </div>
      </div>

      {/* Subtle separator line below header */}
      <div
        className="absolute"
        style={{ top: 153, left: 54, right: 79, height: 1, background: "rgba(255,255,255,0.15)" }}
      />

      {/* Bottom footer */}
      <div
        className="absolute flex items-center justify-between"
        style={{ top: 963, left: 0, right: 0, bottom: 0, paddingLeft: 72, paddingRight: 72 }}
      >
        <div style={{ color: C.goldLight, fontSize: 10, fontFamily: "Inter", letterSpacing: 2, fontWeight: 600 }}>
          আমাদের অতীত স্মৃতি, আমাদের বন্ধন
        </div>
      </div>
    </div>
  );
}
