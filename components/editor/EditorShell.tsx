"use client";

import { useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { useEditor } from "@/lib/store";
import { loadFromLocalStorage, usePersistence } from "@/lib/persistence";
import { TopNavbar } from "./TopNavbar";
import { ToolRail } from "./ToolRail";
import { ToolPanel } from "./ToolPanel";
import { CanvasStage } from "./CanvasStage";
import { PropertiesPanel } from "./PropertiesPanel";
import { ExportCanvas } from "./ExportCanvas";
import { ExportDialog } from "./ExportDialog";
import type { ActiveTool } from "@/lib/types";

export type { ActiveTool };

function isEditableTarget(target: EventTarget | null): boolean {
  if (!target) return false;
  const el = target as HTMLElement;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.isContentEditable
  );
}

export function EditorShell() {
  const activeTool = useEditor((s) => s.activeTool);
  const selectedLayerId = useEditor((s) => s.selectedLayerId);
  const setActiveTool = useEditor((s) => s.setActiveTool);
  const deleteTextLayer = useEditor((s) => s.deleteTextLayer);
  const duplicateTextLayer = useEditor((s) => s.duplicateTextLayer);
  const selectLayer = useEditor((s) => s.selectLayer);
  const addTextLayer = useEditor((s) => s.addTextLayer);
  const loadFromStorage = useEditor((s) => s.loadFromStorage);
  const undo = useEditor((s) => s.undo);
  const redo = useEditor((s) => s.redo);

  // Restore persisted state before the browser paints so there's no empty-canvas flash
  useLayoutEffect(() => {
    const snapshot = loadFromLocalStorage();
    if (snapshot) loadFromStorage(snapshot);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Subscribe to store changes and throttle-save to localStorage
  usePersistence();

  function handleToolChange(tool: ActiveTool) {
    setActiveTool(activeTool === tool ? null : tool);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isEditableTarget(e.target)) return;

      const meta = e.metaKey || e.ctrlKey;

      if (meta && e.shiftKey && e.key === "Z") {
        e.preventDefault();
        redo();
        return;
      }
      if (meta && e.key === "z") {
        e.preventDefault();
        undo();
        return;
      }
      if (meta && e.key === "d") {
        e.preventDefault();
        if (selectedLayerId) duplicateTextLayer(selectedLayerId);
        return;
      }
      if (e.key === "t" && !meta) {
        e.preventDefault();
        addTextLayer();
        return;
      }
      if ((e.key === "Delete" || e.key === "Backspace") && selectedLayerId) {
        e.preventDefault();
        deleteTextLayer(selectedLayerId);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        selectLayer(null);
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedLayerId, deleteTextLayer, duplicateTextLayer, selectLayer, addTextLayer, undo, redo]);

  return (
    <div className="flex flex-col h-full">
      <TopNavbar />
      <div className="flex flex-1 min-h-0">
        <ToolRail activeTool={activeTool} onToolChange={handleToolChange} />
        <div className={cn("overflow-hidden shrink-0 transition-[width] duration-150", activeTool !== null ? "w-60" : "w-0")}>
          {activeTool !== null && <ToolPanel activeTool={activeTool} />}
        </div>
        <CanvasStage />
        <div className={cn("overflow-hidden shrink-0 transition-[width] duration-150", selectedLayerId !== null ? "w-60" : "w-0")}>
          {selectedLayerId !== null && <PropertiesPanel />}
        </div>
      </div>
      {/* Off-screen capture target — wrapper handles hiding, ExportCanvas root stays position:relative so html-to-image renders it correctly inside SVG foreignObject */}
      <div aria-hidden style={{ position: "fixed", top: -9999, left: 0, pointerEvents: "none" }}>
        <ExportCanvas />
      </div>
      <ExportDialog />
    </div>
  );
}
