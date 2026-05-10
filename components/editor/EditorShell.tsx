"use client";

import { useEditor } from "@/lib/store";
import { TopNavbar } from "./TopNavbar";
import { ToolRail } from "./ToolRail";
import { ToolPanel } from "./ToolPanel";
import { CanvasStage } from "./CanvasStage";
import { PropertiesPanel } from "./PropertiesPanel";
import type { ActiveTool } from "@/lib/types";

export type { ActiveTool };

export function EditorShell() {
  const activeTool = useEditor((s) => s.activeTool);
  const selectedLayerId = useEditor((s) => s.selectedLayerId);
  const setActiveTool = useEditor((s) => s.setActiveTool);

  function handleToolChange(tool: ActiveTool) {
    setActiveTool(activeTool === tool ? null : tool);
  }

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
