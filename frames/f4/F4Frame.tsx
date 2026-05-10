import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Bold Color Block — gold triangle top-right, green block bottom-left, photo shows through center card */
export function F4Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream outer margins (photo shows through card area 81-873 × 81-873) */}
      <div className="absolute top-0 left-0 right-0" style={{ height: 81, background: C.cream }} />
      <div className="absolute left-0 right-0" style={{ top: 873, bottom: 0, background: C.cream }} />
      <div className="absolute top-0 bottom-0 left-0" style={{ width: 81, background: C.cream }} />
      <div className="absolute top-0 bottom-0 right-0" style={{ width: 207, background: C.cream }} />

      {/* Gold triangle — TOP-RIGHT corner */}
      <div
        className="absolute"
        style={{
          top: 0, left: 648, width: 432, height: 432,
          background: C.gold,
          clipPath: "polygon(20% 0%, 100% 0%, 100% 80%)",
        }}
      />

      {/* Green block — BOTTOM-LEFT corner */}
      <div
        className="absolute"
        style={{ top: 756, left: 0, width: 486, height: 324, background: C.green }}
      />

      {/* Shadow-only card frame (transparent bg so photo shows through) */}
      <div
        className="absolute"
        style={{
          top: 81, left: 81, width: 792, height: 792,
          boxShadow: "0 27px 54px -13px rgba(0,0,0,0.35), 0 8px 20px -5px rgba(0,0,0,0.15)",
        }}
      />

      {/* White label strip at bottom-right of card */}
      <div
        className="absolute"
        style={{
          top: 855, left: 680, width: 313, height: 54,
          background: C.white,
          boxShadow: "0 10px 27px -6px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}
