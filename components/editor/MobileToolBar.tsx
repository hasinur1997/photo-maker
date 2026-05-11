"use client";

import { Download, LayoutTemplate, Paintbrush, Type, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "@/lib/types";

const TOOLS: { id: Exclude<ActiveTool, null>; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "upload",    label: "Photo",   icon: Upload },
  { id: "frames",    label: "Frames",  icon: LayoutTemplate },
  { id: "text",      label: "Text",    icon: Type },
  { id: "customize", label: "Style",   icon: Paintbrush },
  { id: "export",    label: "Export",  icon: Download },
];

interface MobileToolBarProps {
  activeTool: ActiveTool;
  onToolChange: (tool: ActiveTool) => void;
}

export function MobileToolBar({ activeTool, onToolChange }: MobileToolBarProps) {
  return (
    <nav
      className="shrink-0 border-t border-border bg-background flex items-center justify-around"
      style={{ height: 60, paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {TOOLS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onToolChange(activeTool === id ? null : id)}
          className={cn(
            "flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors",
            activeTool === id
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          <span className="text-[10px] font-medium leading-none">{label}</span>
        </button>
      ))}
    </nav>
  );
}
