import type { FrameCustomization } from "@/lib/types";

/** Compute CSS box-shadow from customization when shadow is enabled. */
export function frameShadowCss(c: FrameCustomization): string | undefined {
  if (!c.shadow.enabled) return undefined;
  const { x, y, blur, spread, color } = c.shadow;
  return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

/** Build inline style for the frame's main wrapper (opacity + optional border + shadow). */
export function frameWrapperStyle(c: FrameCustomization): React.CSSProperties {
  return {
    opacity: c.opacity,
    border: c.borderWidth > 0 ? `${c.borderWidth}px solid ${c.borderColor}` : undefined,
    boxShadow: frameShadowCss(c),
  };
}

// Brand colours shared across all frames
export const C = {
  cream: "#FAF6ED",
  creamWarm: "#F3ECDB",
  creamCard: "#FDFBF4",
  green: "#1C4A2B",
  forest: "#0F3A1D",
  gold: "#C8941A",
  goldLight: "#E8C66B",
  dark: "#1A1A14",
  white: "#FFFFFF",
  black: "#000000",
} as const;
