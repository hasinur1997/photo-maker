import type { FrameComponentProps } from "../types";
import { frameWrapperStyle, C } from "../shared";

/** Year Frame Giant — cream background, subtle large-year watermark, photo fills center */
export function F8Frame({ customization: c }: FrameComponentProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={frameWrapperStyle(c)}
    >
      {/* Cream top banner — year text slot will render here */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 270, background: C.cream }}
      />

      {/* Cream bottom banner — school name text slot renders here */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 126, background: C.cream }}
      />

      {/* Thin gold accent dividers */}
      <div
        className="absolute left-0 right-0"
        style={{ top: 270, height: 2, background: C.gold, opacity: 0.4 }}
      />
      <div
        className="absolute left-0 right-0"
        style={{ bottom: 126, height: 2, background: C.gold, opacity: 0.4 }}
      />
    </div>
  );
}
