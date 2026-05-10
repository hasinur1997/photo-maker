import type { ActiveTool } from "./EditorShell";

const PANEL_LABELS: Record<Exclude<ActiveTool, null>, string> = {
  upload: "Upload Photo — Step 5",
  frames: "Frames — Step 6",
  text: "Add Text — Step 8",
  customize: "Customize Frame — Step 7",
  export: "Export — Step 13",
};

interface ToolPanelProps {
  activeTool: Exclude<ActiveTool, null>;
}

export function ToolPanel({ activeTool }: ToolPanelProps) {
  return (
    <aside className="w-72 shrink-0 border-r border-border bg-background overflow-y-auto">
      <div className="p-4 text-sm text-muted-foreground">
        {PANEL_LABELS[activeTool]}
      </div>
    </aside>
  );
}
