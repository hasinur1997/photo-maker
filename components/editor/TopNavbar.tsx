"use client";

import { Redo2, Download, Undo2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
      {/* Brand */}
      <span className="font-semibold text-foreground mr-4">Photo Frame Maker</span>

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
      <Button onClick={openExport} disabled={!hasPhoto}>
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </header>
  );
}
