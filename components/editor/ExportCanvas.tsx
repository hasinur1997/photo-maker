"use client";

import { useEditor } from "@/lib/store";
import { getFrame } from "@/frames/registry";
import { exportCanvasRef } from "@/lib/export-ref";

/**
 * Off-screen 1080×1080 render of the full canvas: photo + frame + text layers
 * at true canvas-pixel coordinates — no CSS scaling tricks.
 * html-to-image captures this node during export.
 */
export function ExportCanvas() {
  const photo = useEditor((s) => s.photo);
  const frameId = useEditor((s) => s.frameId);
  const frameCustomization = useEditor((s) => s.frameCustomization);
  const textLayers = useEditor((s) => s.textLayers);

  const frame = getFrame(frameId);

  return (
    <div
      ref={exportCanvasRef}
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Photo */}
      {photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.src}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}

      {/* Frame overlay */}
      {frame && <frame.Component customization={frameCustomization} />}

      {/* Text layers at canvas-pixel coordinates — no react-rnd, no selection chrome */}
      {textLayers.map((layer) => (
        <div
          key={layer.id}
          style={{
            position: "absolute",
            left: layer.x,
            top: layer.y,
            width: layer.width,
            height: layer.height,
            fontFamily: `'${layer.fontFamily}', sans-serif`,
            fontWeight: layer.fontWeight,
            fontStyle: layer.fontStyle,
            fontSize: layer.fontSize,
            color: layer.color,
            textAlign: layer.textAlign,
            lineHeight: layer.lineHeight,
            letterSpacing: `${layer.letterSpacing}px`,
            textDecoration: layer.underline ? "underline" : "none",
            transform: `rotate(${layer.rotation}deg)`,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflow: "hidden",
          }}
        >
          {layer.text}
        </div>
      ))}
    </div>
  );
}
