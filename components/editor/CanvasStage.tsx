"use client";

import { useEffect, useRef, useState } from "react";

const CANVAS_SIZE = 1080;

export function CanvasStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // 32px padding on each axis (p-4 = 16px × 2)
      const s = Math.min((width - 32) / CANVAS_SIZE, (height - 32) / CANVAS_SIZE);
      setScale(Math.max(Math.min(s, 1), 0.05));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaledSize = Math.round(CANVAS_SIZE * scale);

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-0 flex items-center justify-center bg-muted overflow-hidden"
    >
      {/* Wrapper sized to scaled canvas so it doesn't overflow the parent */}
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
          {/* PhotoLayer, FrameLayer, and TextLayerViews rendered here in later steps */}
        </div>
      </div>
    </div>
  );
}
