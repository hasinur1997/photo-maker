export type CanvasSize = { width: 1080; height: 1080 };

export type Photo = {
  src: string; // data URL or object URL
};

export type FrameId = string;

export type FrameCustomization = {
  borderColor: string; // hex
  borderWidth: number; // px 0–80
  opacity: number; // 0–1
  shadow: {
    enabled: boolean;
    x: number; // px
    y: number;
    blur: number;
    spread: number;
    color: string; // hex/rgba
  };
};

export type TextLayer = {
  id: string;
  text: string;
  // Stored in canvas-pixel space (1080×1080), never screen pixels
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // degrees
  fontFamily: string;
  fontWeight: number; // 100–900
  fontStyle: "normal" | "italic";
  fontSize: number; // px in canvas space
  color: string; // hex
  textAlign: "left" | "center" | "right";
  lineHeight: number; // unitless multiplier
  letterSpacing: number; // px
  underline: boolean;
};

export type ActiveTool =
  | "upload"
  | "frames"
  | "text"
  | "customize"
  | "export"
  | null;

export type EditorState = {
  canvas: CanvasSize;
  photo: Photo | null;
  frameId: FrameId;
  frameCustomization: FrameCustomization;
  textLayers: TextLayer[];
  selectedLayerId: string | null;
  activeTool: ActiveTool;
};
