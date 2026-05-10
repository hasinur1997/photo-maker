import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Modern Editorial Border — dark green background with editorial header/footer overlay */
export function F2Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Dark green background — photo shows through centre */}
      <div className="absolute inset-0" style={{ background: C.green }} />

      {/* Top header strip */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center"
        style={{ height: 68, paddingLeft: 60, paddingRight: 60, background: C.green }}
      >
        {/* Logo placeholder */}
        <div
          className="flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ width: 48, height: 48, background: C.gold, color: C.forest, marginRight: 12, fontSize: 10 }}
        >
          স.উ
        </div>
        {/* Name block placeholder area */}
        <div className="flex flex-col">
          <div style={{ width: 200, height: 10, background: "rgba(250,246,237,0.3)", borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: 120, height: 7, background: "rgba(232,198,107,0.3)", borderRadius: 2 }} />
        </div>
        <div className="flex-1" />
        {/* Star accent */}
        <div style={{ color: C.goldLight, fontSize: 13, letterSpacing: 4 }}>★ ALUMNI ★</div>
      </div>

      {/* Transparent photo area — leaves canvas center clear */}
      <div
        className="absolute left-0 right-0"
        style={{ top: 68, height: 944, background: "transparent" }}
      />

      {/* Bottom footer strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between"
        style={{ height: 68, paddingLeft: 60, paddingRight: 60, background: C.green }}
      >
        <div style={{ color: C.goldLight, fontSize: 10, fontFamily: "Inter", fontWeight: 700, letterSpacing: 2 }}>
          ESTD · 2026
        </div>
        <div style={{ color: "rgba(250,246,237,0.5)", fontSize: 9, fontFamily: "Inter", letterSpacing: 1 }}>
          আমাদের অতীত স্মৃতি, আমাদের বন্ধন
        </div>
      </div>
    </div>
  );
}
