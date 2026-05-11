"use client";

import { useState } from "react";
import { useEditor } from "@/lib/store";
import { FRAMES } from "@/frames/registry";
import { cn } from "@/lib/utils";

export function FramesTool() {
  const frameId = useEditor((s) => s.frameId);
  const setFrame = useEditor((s) => s.setFrame);
  const addTextLayer = useEditor((s) => s.addTextLayer);
  const textLayers = useEditor((s) => s.textLayers);

  // Track which slot IDs have user edits so we can preserve them
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const [loadedImgs, setLoadedImgs] = useState<Set<string>>(new Set());

  function handleSelectFrame(id: string) {
    const frame = FRAMES.find((f) => f.id === id);
    if (!frame) return;

    setFrame(id, frame.defaultCustomization);

    // Materialize text slots that aren't already in state (preserve existing edits)
    for (const slot of frame.textSlots) {
      const alreadyExists = textLayers.some((l) => l.id === slot.id);
      if (!alreadyExists) {
        addTextLayer(
          {
            ...slot.defaults,
            text: slot.defaultText,
            rotation: 0,
            fontStyle: "normal",
            lineHeight: 1.4,
            letterSpacing: 0,
            underline: false,
          },
          slot.id // stable slot ID — preserved if user switches frames and back
        );
      }
    }
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <p className="text-sm font-medium text-foreground">Frames</p>
      <div className="grid grid-cols-2 gap-2">
        {FRAMES.map((frame) => (
          <button
            key={frame.id}
            onClick={() => handleSelectFrame(frame.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-md p-1 border-2 transition-all hover:border-primary/60",
              frameId === frame.id ? "border-primary" : "border-transparent"
            )}
          >
            <div className="w-full aspect-square rounded overflow-hidden bg-muted relative">
              {!imgErrors.has(frame.id) ? (
                <>
                  {/* Skeleton shown until image loads */}
                  {!loadedImgs.has(frame.id) && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={frame.thumbnail}
                    alt={frame.name}
                    className={cn("w-full h-full object-cover transition-opacity duration-150", loadedImgs.has(frame.id) ? "opacity-100" : "opacity-0")}
                    onLoad={() => setLoadedImgs((s) => new Set([...s, frame.id]))}
                    onError={() => setImgErrors((s) => new Set([...s, frame.id]))}
                  />
                </>
              ) : (
                <FrameThumbnailFallback id={frame.id} />
              )}
              {frameId === frame.id && (
                <div className="absolute inset-0 ring-2 ring-primary ring-inset rounded" />
              )}
            </div>
            <span className="text-xs text-center text-foreground/80 leading-tight line-clamp-2">
              {frame.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Colored placeholder when thumbnail PNG isn't available
const FALLBACK_COLORS: Record<string, string> = {
  f1: "#FAF6ED", f2: "#1C4A2B", f3: "#FAF6ED", f4: "#C8941A",
  f5: "#F3ECDB", f6: "#000000", f7: "#FAF6ED", f8: "#FAF6ED",
  f9: "#F3ECDB", f10: "#0F3A1D", f11: "#F3ECDB",
};

function FrameThumbnailFallback({ id }: { id: string }) {
  const bg = FALLBACK_COLORS[id] ?? "#e5e7eb";
  const isLight = bg === "#FAF6ED" || bg === "#F3ECDB" || bg === "#C8941A";
  return (
    <div
      className="w-full h-full flex items-center justify-center text-xs font-medium"
      style={{ background: bg, color: isLight ? "#1C4A2B" : "#FAF6ED" }}
    >
      {id.toUpperCase()}
    </div>
  );
}
