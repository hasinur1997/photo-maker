"use client";

import { Download, LayoutTemplate, Paintbrush, Type, Upload } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ActiveTool } from "./EditorShell";

const TOOLS: {
  id: Exclude<ActiveTool, null>;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "upload", label: "Upload Photo", icon: Upload },
  { id: "frames", label: "Frames", icon: LayoutTemplate },
  { id: "text", label: "Add Text", icon: Type },
  { id: "customize", label: "Customize Frame", icon: Paintbrush },
  { id: "export", label: "Export", icon: Download },
];

interface ToolRailProps {
  activeTool: ActiveTool;
  onToolChange: (tool: ActiveTool) => void;
}

export function ToolRail({ activeTool, onToolChange }: ToolRailProps) {
  return (
    <aside className="w-16 shrink-0 border-r border-border bg-background flex flex-col items-center py-2 gap-1">
      {TOOLS.map(({ id, label, icon: Icon }) => (
        <Tooltip key={id}>
          <TooltipTrigger
            aria-label={label}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-10 w-10",
              activeTool === id && "bg-accent text-accent-foreground"
            )}
            onClick={() => onToolChange(id)}
          >
            <Icon className="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      ))}
    </aside>
  );
}
