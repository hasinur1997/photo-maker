import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Bold Color Block — gold block + green block composition with white card centre */
export function F4Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream base */}
      <div className="absolute inset-0" style={{ background: C.cream }} />

      {/* Gold top-left block */}
      <div className="absolute" style={{ top: 0, left: 0, width: 432, height: 432, background: C.gold }} />

      {/* Dark green bottom-right block */}
      <div className="absolute" style={{ bottom: 0, right: 0, width: 486, height: 324, background: C.green }} />

      {/* White card in centre — photo shows through (no background set on card) */}
      <div
        className="absolute"
        style={{
          left: 100, top: 100, width: 880, height: 880,
          background: C.white,
          boxShadow: "0 27px 54px -13px rgba(0,0,0,0.35)",
        }}
      />

      {/* Transparent photo window on top of white card */}
      <div className="absolute" style={{ left: 100, top: 100, width: 880, height: 792, background: "transparent" }} />

      {/* Bottom label strip inside card */}
      <div
        className="absolute flex items-center"
        style={{ left: 100, top: 892, width: 880, height: 88, background: C.white, paddingLeft: 20 }}
      >
        <div>
          <div style={{ width: 180, height: 9, background: `${C.dark}22`, borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: 110, height: 7, background: `${C.gold}44`, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}
