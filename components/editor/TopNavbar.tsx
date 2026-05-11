"use client";

import { Redo2, Download, Undo2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useEditor } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TopNavbar() {
  const canUndo = useEditor((s) => s._past.length > 0);
  const canRedo = useEditor((s) => s._future.length > 0);
  const undo = useEditor((s) => s.undo);
  const redo = useEditor((s) => s.redo);
  const openExport = useEditor((s) => s.openExport);
  const hasPhoto = useEditor((s) => s.photo !== null);

  return (
    <header className="h-14 shrink-0 border-b border-border bg-background flex items-center px-4 gap-2">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mr-4 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary-foreground">
            <rect x="1.25" y="1.25" width="13.5" height="13.5" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3.5 11.5L5.75 8L7.75 10.5L9.5 8.5L12.5 11.5H3.5Z" fill="currentColor" fillOpacity="0.7"/>
            <circle cx="11" cy="5" r="1.25" fill="currentColor"/>
          </svg>
        </div>
        <span className="hidden sm:inline font-semibold text-sm tracking-tight text-foreground leading-none">
          Photo Frame Maker
        </span>
      </div>

      {/* Undo */}
      <Tooltip>
        <TooltipTrigger
          aria-label="Undo"
          disabled={!canUndo}
          onClick={undo}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <Undo2 className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Undo (⌘Z)</TooltipContent>
      </Tooltip>

      {/* Redo */}
      <Tooltip>
        <TooltipTrigger
          aria-label="Redo"
          disabled={!canRedo}
          onClick={redo}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <Redo2 className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Redo (⌘⇧Z)</TooltipContent>
      </Tooltip>

      {/* Spacer */}
      <div className="flex-1" />

      <Separator orientation="vertical" className="h-6" />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Download */}
      <Tooltip>
        <TooltipTrigger
          onClick={openExport}
          disabled={!hasPhoto}
          className={cn(buttonVariants({ size: "sm" }), "gap-2")}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </TooltipTrigger>
        <TooltipContent>Export as PNG or JPEG</TooltipContent>
      </Tooltip>
    </header>
  );
}
