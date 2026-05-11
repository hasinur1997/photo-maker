"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useEditor } from "@/lib/store";
import { loadFont } from "@/lib/google-fonts";
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

  // Track whether the pointer actually moved during the drag, to distinguish
  // a real drag from a plain click. We use a ref so it's never stale in callbacks.
  const hasDragged = useRef(false);

  // Keep a stable ref to the current scale so onDragStop reads the value
  // that was in effect when the drag STARTED, not after any resize triggered
  // by a panel opening mid-gesture.
  const scaleAtDragStart = useRef(scale);

  useEffect(() => {
    loadFont(layer.fontFamily, [layer.fontWeight]);
  }, [layer.fontFamily, layer.fontWeight]);

  // When entering edit mode: set content imperatively so React never
  // touches the DOM children while the user is typing.
  useEffect(() => {
    if (!editing || !editableRef.current) return;
    const el = editableRef.current;
    el.innerText = layer.text;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]); // intentionally omits layer.text — set once on entry only

  const commitEdit = useCallback(() => {
    if (!editableRef.current) return;
    updateTextLayer(layer.id, { text: editableRef.current.innerText });
    setEditing(false);
  }, [layer.id, updateTextLayer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        commitEdit();
      }
    },
    [commitEdit]
  );

  const handleBlur = useCallback(() => {
    if (editing) commitEdit();
  }, [editing, commitEdit]);

  const screenX = layer.x * scale;
  const screenY = layer.y * scale;
  const screenW = layer.width * scale;
  const screenH = layer.height * scale;

  const baseStyle: React.CSSProperties = {
    fontFamily: `'${layer.fontFamily}', sans-serif`,
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
  };

  return (
    <Rnd
      position={{ x: screenX, y: screenY }}
      size={{ width: screenW, height: screenH }}
      onDragStart={() => {
        hasDragged.current = false;
        scaleAtDragStart.current = scale;
      }}
      onDrag={() => {
        hasDragged.current = true;
      }}
      onDragStop={(_e, d) => {
        if (!hasDragged.current) return; // plain click — don't update position
        hasDragged.current = false;
        pushHistory();
        const s = scaleAtDragStart.current;
        updateTextLayer(layer.id, {
          x: Math.round(d.x / s),
          y: Math.round(d.y / s),
        });
      }}
      onResizeStop={(_e, _dir, ref, _delta, pos) => {
        pushHistory();
        updateTextLayer(layer.id, {
          x: Math.round(pos.x / scale),
          y: Math.round(pos.y / scale),
          width: Math.round((ref as HTMLElement).offsetWidth / scale),
          height: Math.round((ref as HTMLElement).offsetHeight / scale),
        });
      }}
      disableDragging={editing}
      enableResizing={isSelected && !editing}
      bounds="parent"
      style={{ zIndex: 10 }}
    >
      {/* stopPropagation prevents the canvas wrapper's onClick from
          deselecting this layer immediately after we select it. */}
      <div
        className="relative w-full h-full"
        onClick={(e) => {
          e.stopPropagation();
          if (!editing) selectLayer(layer.id);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          selectLayer(layer.id);
          setEditing(true);
        }}
      >
        {/* Selection ring */}
        {isSelected && !editing && (
          <div className="absolute inset-0 ring-2 ring-primary pointer-events-none" />
        )}

        {/* Display mode — React controls this element */}
        {!editing && (
          <div style={{ ...baseStyle, cursor: "move", userSelect: "none" }}>
            {layer.text}
          </div>
        )}

        {/* Edit mode — no JSX children; content is set imperatively via ref
            so React never overwrites what the user is typing. */}
        {editing && (
          <div
            ref={editableRef}
            contentEditable
            suppressContentEditableWarning
            style={{ ...baseStyle, cursor: "text", outline: "none" }}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            // Prevent the Rnd drag handler from capturing mousedown while typing
            onMouseDown={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </Rnd>
  );
}
