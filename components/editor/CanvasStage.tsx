"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import { useEditor } from "@/lib/store";
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_PHOTO_BYTES,
  handlePhotoFile,
} from "@/lib/photo";
import { PhotoLayer } from "./PhotoLayer";
import { FrameLayer } from "./FrameLayer";
import { TextLayerView } from "./TextLayerView";
import { cn } from "@/lib/utils";

const CANVAS_SIZE = 1080;

export function CanvasStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const photo = useEditor((s) => s.photo);
  const setPhoto = useEditor((s) => s.setPhoto);
  const textLayers = useEditor((s) => s.textLayers);
  const selectLayer = useEditor((s) => s.selectLayer);

  // Scale the 1080×1080 canvas to fill available space
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const s = Math.min(width / CANVAS_SIZE, height / CANVAS_SIZE);
      setScale(Math.max(Math.min(s, 1), 0.05));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Global drop target — only active when no photo is loaded
  const onGlobalDrop = useCallback(
    ([file]: File[]) => handlePhotoFile(file, setPhoto),
    [setPhoto]
  );

  const { getRootProps, isDragActive } = useDropzone({
    accept: Object.fromEntries(ACCEPTED_PHOTO_TYPES.map((t) => [t, []])),
    maxSize: MAX_PHOTO_BYTES,
    multiple: false,
    noClick: true, // UploadTool handles click-to-browse
    disabled: !!photo, // disable when photo already loaded
    onDropAccepted: onGlobalDrop,
  });

  const scaledSize = Math.round(CANVAS_SIZE * scale);

  return (
    <div
      ref={containerRef}
      {...getRootProps()}
      className={cn(
        "flex-1 min-w-0 flex items-center justify-center bg-muted overflow-hidden transition-colors",
        isDragActive && !photo && "bg-primary/10"
      )}
    >
      {/* Wrapper sized to scaled canvas dimensions */}
      <div
        className="relative"
        style={{ width: scaledSize, height: scaledSize }}
      >
        {/* The actual 1080×1080 canvas, scaled via CSS transform.
            Clicking the canvas background (photo/frame area) deselects layers. */}
        <div
          data-canvas-root
          className="absolute top-0 left-0 bg-white overflow-hidden"
          style={{
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          onClick={() => selectLayer(null)}
        >
          {/* Layer order: photo → frame */}
          <PhotoLayer />
          <FrameLayer />

          {/* Empty state — shown before any photo is loaded */}
          {!photo && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
              style={{ gap: 24 }}
            >
              <ImageIcon style={{ width: 120, height: 120, opacity: 0.15 }} />
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 500,
                  color: "var(--muted-foreground)",
                  opacity: 0.5,
                }}
              >
                Drop or upload a photo to start
              </span>
            </div>
          )}
        </div>

        {/* Text layers rendered in screen-pixel space (scale applied manually) */}
        {textLayers.map((layer) => (
          <TextLayerView key={layer.id} layer={layer} scale={scale} />
        ))}
      </div>

      {/* Global drop overlay hint */}
      {isDragActive && !photo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-background/90 border-2 border-primary border-dashed rounded-xl px-8 py-6 text-primary font-medium text-sm">
            Drop to set as photo
          </div>
        </div>
      )}
    </div>
  );
}
