"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useEditor } from "@/lib/store";
import {
  ACCEPTED_PHOTO_TYPES,
  MAX_PHOTO_BYTES,
  handlePhotoFile,
} from "@/lib/photo";
import { PhotoLayer } from "./PhotoLayer";
import { FrameLayer } from "./FrameLayer";
import { cn } from "@/lib/utils";

const CANVAS_SIZE = 1080;

export function CanvasStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  const photo = useEditor((s) => s.photo);
  const setPhoto = useEditor((s) => s.setPhoto);

  // Scale the 1080×1080 canvas to fill available space
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const s = Math.min((width - 32) / CANVAS_SIZE, (height - 32) / CANVAS_SIZE);
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
        className="relative shadow-xl"
        style={{ width: scaledSize, height: scaledSize }}
      >
        {/* The actual 1080×1080 canvas, scaled via CSS transform */}
        <div
          data-canvas-root
          className="absolute top-0 left-0 bg-white overflow-hidden"
          style={{
            width: CANVAS_SIZE,
            height: CANVAS_SIZE,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Layer order: photo → frame → text */}
          <PhotoLayer />
          <FrameLayer />
        </div>
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
