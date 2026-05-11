import { UploadTool } from "./tools/UploadTool";
import { FramesTool } from "./tools/FramesTool";
import { CustomizeFrameTool } from "./tools/CustomizeFrameTool";
import { TextTool } from "./tools/TextTool";
import { ExportTool } from "./tools/ExportTool";
import type { ActiveTool } from "@/lib/types";

interface ToolPanelProps {
  activeTool: Exclude<ActiveTool, null>;
}

export function ToolPanel({ activeTool }: ToolPanelProps) {
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-background overflow-y-auto">
      {activeTool === "upload" && <UploadTool />}
      {activeTool === "frames" && <FramesTool />}
      {activeTool === "text" && <TextTool />}
      {activeTool === "customize" && <CustomizeFrameTool />}
      {activeTool === "export" && <ExportTool />}
    </aside>
  );
}
