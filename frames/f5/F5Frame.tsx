import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Circular Portrait — warm cream background with circular photo crop and ring borders */
export function F5Frame({ customization: c }: FrameComponentProps) {
  // Circle: center at 50% 45% of 1080px → cx=540, cy=486, r≈380
  const cx = 540;
  const cy = 460;
  const r = 370;
  const rGold = r + 10;
  const rGreen = r + 20;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* SVG overlay: cream mask with circular hole + ring borders */}
      <svg
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Warm cream mask with circle cut-out — photo shows through */}
        <path
          fillRule="evenodd"
          d={`M0 0 L1080 0 L1080 1080 L0 1080 Z M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx} ${cy + r} A${r} ${r} 0 1 1 ${cx} ${cy - r}`}
          fill={C.creamWarm}
        />

        {/* Gold ring border */}
        <circle cx={cx} cy={cy} r={rGold} fill="none" stroke={C.gold} strokeWidth="7" />

        {/* Dark green ring border */}
        <circle cx={cx} cy={cy} r={rGreen} fill="none" stroke={C.green} strokeWidth="5" />
      </svg>

      {/* Solid bottom text area (below circle at y≈830) — reinforces SVG mask */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 250, background: C.creamWarm }}
      />
    </div>
  );
}
