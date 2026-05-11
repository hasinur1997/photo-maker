"use client";

import { Trash2, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/lib/store";

export function TextTool() {
  const textLayers = useEditor((s) => s.textLayers);
  const selectedLayerId = useEditor((s) => s.selectedLayerId);
  const addTextLayer = useEditor((s) => s.addTextLayer);
  const deleteTextLayer = useEditor((s) => s.deleteTextLayer);
  const selectLayer = useEditor((s) => s.selectLayer);

  function handleAdd() {
    addTextLayer();
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <span className="text-sm font-semibold">Text Layers</span>
      </div>

      <div className="px-4 py-3">
        <Button className="w-full gap-2" size="sm" onClick={handleAdd}>
          <Type className="w-4 h-4" />
          Add Text
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {textLayers.length === 0 && (
          <p className="px-2 text-xs text-muted-foreground">
            No text layers yet. Add one above.
          </p>
        )}
        {[...textLayers].reverse().map((layer) => (
          <div
            key={layer.id}
            onClick={() => selectLayer(layer.id)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer group transition-colors ${
              layer.id === selectedLayerId
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            }`}
          >
            <Type className="w-3.5 h-3.5 shrink-0 opacity-60" />
            <span className="flex-1 text-xs truncate min-w-0">
              {layer.text || <em className="opacity-50">empty</em>}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTextLayer(layer.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity p-0.5 rounded"
              aria-label="Delete layer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
