"use client";

import { useEffect } from "react";
import { useEditor } from "@/lib/store";
import { TopNavbar } from "./TopNavbar";
import { ToolRail } from "./ToolRail";
import { ToolPanel } from "./ToolPanel";
import { CanvasStage } from "./CanvasStage";
import { PropertiesPanel } from "./PropertiesPanel";
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
  const selectLayer = useEditor((s) => s.selectLayer);
  const addTextLayer = useEditor((s) => s.addTextLayer);
  const undo = useEditor((s) => s.undo);
  const redo = useEditor((s) => s.redo);

  function handleToolChange(tool: ActiveTool) {
    setActiveTool(activeTool === tool ? null : tool);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isEditableTarget(e.target)) return;

      const meta = e.metaKey || e.ctrlKey;

      // Undo / Redo
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

      // Duplicate
      if (meta && e.key === "d") {
        e.preventDefault();
        // handled in Step 9 Properties Panel
        return;
      }

      // Add text layer
      if (e.key === "t" && !meta) {
        e.preventDefault();
        addTextLayer();
        return;
      }

      // Delete selected layer
      if ((e.key === "Delete" || e.key === "Backspace") && selectedLayerId) {
        e.preventDefault();
        deleteTextLayer(selectedLayerId);
        return;
      }

      // Deselect
      if (e.key === "Escape") {
        e.preventDefault();
        selectLayer(null);
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedLayerId, deleteTextLayer, selectLayer, addTextLayer, undo, redo]);

  return (
    <div className="flex flex-col h-full">
      <TopNavbar />
      <div className="flex flex-1 min-h-0">
        <ToolRail activeTool={activeTool} onToolChange={handleToolChange} />
        {activeTool !== null && <ToolPanel activeTool={activeTool} />}
        <CanvasStage />
        {selectedLayerId !== null && <PropertiesPanel />}
      </div>
    </div>
  );
}
