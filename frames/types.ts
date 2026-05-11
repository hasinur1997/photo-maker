import type { FrameCustomization, TextLayer } from "@/lib/types";

export type TextSlot = {
  id: string;
  defaultText: string;
  defaults: Pick<
    TextLayer,
    "x" | "y" | "width" | "height" | "fontFamily" | "fontWeight" | "fontSize" | "color" | "textAlign"
  > & { letterSpacing?: number; lineHeight?: number };
};

export type FrameComponentProps = {
  customization: FrameCustomization;
};

export type FrameDefinition = {
  id: string;
  name: string;
  thumbnail: string; // /frames/<id>.png
  defaultCustomization: FrameCustomization;
  textSlots: TextSlot[];
  Component: React.ComponentType<FrameComponentProps>;
};
