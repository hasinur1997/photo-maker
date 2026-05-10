"use client";

import { useState } from "react";
import { TopNavbar } from "./TopNavbar";
import { ToolRail } from "./ToolRail";
import { ToolPanel } from "./ToolPanel";
import { CanvasStage } from "./CanvasStage";
import { PropertiesPanel } from "./PropertiesPanel";

export type ActiveTool = "upload" | "frames" | "text" | "customize" | "export" | null;

export function EditorShell() {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  // selectedLayerId will come from the Zustand store in Step 4
  const selectedLayerId: string | null = null;

  function handleToolChange(tool: ActiveTool) {
    setActiveTool((prev) => (prev === tool ? null : tool));
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
