"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useEditor } from "@/lib/store";
import type { TextLayer } from "@/lib/types";

interface TextLayerViewProps {
  layer: TextLayer;
  scale: number; // canvas CSS scale factor (screen-px / canvas-px)
}

export function TextLayerView({ layer, scale }: TextLayerViewProps) {
  const selectedLayerId = useEditor((s) => s.selectedLayerId);
  const selectLayer = useEditor((s) => s.selectLayer);
  const updateTextLayer = useEditor((s) => s.updateTextLayer);
  const pushHistory = useEditor((s) => s._pushHistory);

  const isSelected = selectedLayerId === layer.id;
  const [editing, setEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  // Focus the contentEditable when entering edit mode
  useEffect(() => {
    if (editing && editableRef.current) {
      editableRef.current.focus();
      // Place cursor at end
      const range = document.createRange();
      range.selectNodeContents(editableRef.current);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const commitEdit = useCallback(() => {
    if (!editableRef.current) return;
    const text = editableRef.current.innerText;
    updateTextLayer(layer.id, { text });
    setEditing(false);
  }, [layer.id, updateTextLayer]);

  const handleDoubleClick = useCallback(() => {
    selectLayer(layer.id);
    setEditing(true);
  }, [layer.id, selectLayer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        commitEdit();
      }
      // Allow Enter for newlines — don't intercept it
    },
    [commitEdit]
  );

  const handleBlur = useCallback(() => {
    if (editing) commitEdit();
  }, [editing, commitEdit]);

  // Convert canvas-pixel position/size → screen pixels for react-rnd
  const screenX = layer.x * scale;
  const screenY = layer.y * scale;
  const screenW = layer.width * scale;
  const screenH = layer.height * scale;

  const textStyle: React.CSSProperties = {
    fontFamily: layer.fontFamily,
    fontWeight: layer.fontWeight,
    fontStyle: layer.fontStyle,
    fontSize: layer.fontSize * scale,
    color: layer.color,
    textAlign: layer.textAlign,
    lineHeight: layer.lineHeight,
    letterSpacing: `${layer.letterSpacing * scale}px`,
    textDecoration: layer.underline ? "underline" : "none",
    transform: `rotate(${layer.rotation}deg)`,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    userSelect: editing ? "text" : "none",
    cursor: editing ? "text" : "move",
  };

  return (
    <Rnd
      position={{ x: screenX, y: screenY }}
      size={{ width: screenW, height: screenH }}
      onDragStart={() => {
        if (!isSelected) selectLayer(layer.id);
      }}
      onDragStop={(_e, d) => {
        pushHistory();
        updateTextLayer(layer.id, {
          x: Math.round(d.x / scale),
          y: Math.round(d.y / scale),
        });
      }}
      onResizeStop={(_e, _dir, _ref, _delta, pos) => {
        const el = _ref as HTMLElement;
        pushHistory();
        updateTextLayer(layer.id, {
          x: Math.round(pos.x / scale),
          y: Math.round(pos.y / scale),
          width: Math.round(el.offsetWidth / scale),
          height: Math.round(el.offsetHeight / scale),
        });
      }}
      disableDragging={editing}
      enableResizing={isSelected && !editing}
      bounds="parent"
      style={{ zIndex: 10 }}
    >
      <div
        className="relative w-full h-full"
        onClick={() => {
          if (!editing) selectLayer(layer.id);
        }}
        onDoubleClick={handleDoubleClick}
      >
        {/* Selection ring */}
        {isSelected && !editing && (
          <div className="absolute inset-0 ring-2 ring-primary ring-offset-0 pointer-events-none" />
        )}

        {/* Text content */}
        <div
          ref={editableRef}
          contentEditable={editing}
          suppressContentEditableWarning
          style={textStyle}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          // Prevent drag from triggering when editing
          onMouseDown={editing ? (e) => e.stopPropagation() : undefined}
        >
          {layer.text}
        </div>
      </div>
    </Rnd>
  );
}
