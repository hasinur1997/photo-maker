"use client";

import { useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { useEditor } from "@/lib/store";
import { loadFromLocalStorage, usePersistence } from "@/lib/persistence";
import { useIsMobile } from "@/lib/useIsMobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TopNavbar } from "./TopNavbar";
import { ToolRail } from "./ToolRail";
import { ToolPanel } from "./ToolPanel";
import { CanvasStage } from "./CanvasStage";
import { PropertiesPanel } from "./PropertiesPanel";
import { MobileToolBar } from "./MobileToolBar";
import { ExportCanvas } from "./ExportCanvas";
import { ExportDialog } from "./ExportDialog";
import { InlineFormatToolbar } from "./InlineFormatToolbar";
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
  const isMobile = useIsMobile();

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

      {/* ── Desktop layout (md+) ── */}
      <div className="hidden md:flex flex-1 min-h-0">
        <ToolRail activeTool={activeTool} onToolChange={handleToolChange} />
        <div className={cn("overflow-hidden shrink-0 transition-[width] duration-150", activeTool !== null ? "w-60" : "w-0")}>
          {activeTool !== null && <ToolPanel activeTool={activeTool} />}
        </div>
        <CanvasStage />
        <div className={cn("overflow-hidden shrink-0 transition-[width] duration-150", selectedLayerId !== null ? "w-60" : "w-0")}>
          {selectedLayerId !== null && <PropertiesPanel />}
        </div>
      </div>

      {/* ── Mobile layout (<md) ── */}
      <div className="flex md:hidden flex-1 flex-col min-h-0">
        <CanvasStage />
        <MobileToolBar activeTool={activeTool} onToolChange={handleToolChange} />
      </div>

      {/* Mobile: tool panel bottom sheet */}
      <Sheet
        open={isMobile && activeTool !== null}
        onOpenChange={(open) => { if (!open) setActiveTool(null); }}
      >
        <SheetContent side="bottom" showCloseButton={false} className="max-h-[70vh] p-0 flex flex-col rounded-t-2xl">
          <div className="flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="overflow-y-auto flex-1 pb-4">
            {activeTool !== null && <ToolPanel activeTool={activeTool} />}
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile: properties panel bottom sheet */}
      <Sheet
        open={isMobile && selectedLayerId !== null}
        onOpenChange={(open) => { if (!open) selectLayer(null); }}
      >
        <SheetContent side="bottom" showCloseButton={false} className="max-h-[70vh] p-0 flex flex-col rounded-t-2xl">
          <div className="flex justify-center pt-3 pb-2 shrink-0">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="overflow-y-auto flex-1 pb-4">
            {selectedLayerId !== null && <PropertiesPanel />}
          </div>
        </SheetContent>
      </Sheet>

      {/* Off-screen capture target */}
      <div aria-hidden style={{ position: "fixed", top: -9999, left: 0, pointerEvents: "none" }}>
        <ExportCanvas />
      </div>
      <ExportDialog />
      <InlineFormatToolbar />
    </div>
  );
}
