import { UploadTool } from "./tools/UploadTool";
import { FramesTool } from "./tools/FramesTool";
import { CustomizeFrameTool } from "./tools/CustomizeFrameTool";
import type { ActiveTool } from "@/lib/types";

interface ToolPanelProps {
  activeTool: Exclude<ActiveTool, null>;
}

export function ToolPanel({ activeTool }: ToolPanelProps) {
  return (
    <aside className="w-72 shrink-0 border-r border-border bg-background overflow-y-auto">
      {activeTool === "upload" && <UploadTool />}
      {activeTool === "frames" && <FramesTool />}
      {activeTool === "text" && (
        <p className="p-4 text-sm text-muted-foreground">Text tool — Step 8</p>
      )}
      {activeTool === "customize" && <CustomizeFrameTool />}
      {activeTool === "export" && (
        <p className="p-4 text-sm text-muted-foreground">Export — Step 13</p>
      )}
    </aside>
  );
}
