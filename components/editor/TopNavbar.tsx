"use client";

import { Redo2, Download, Undo2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

export function TopNavbar() {
  return (
    <header className="h-14 shrink-0 border-b border-border bg-background flex items-center px-4 gap-2">
      {/* Brand */}
      <span className="font-semibold text-foreground mr-4">Photo Frame Maker</span>

      {/* Undo */}
      <Tooltip>
        <TooltipTrigger
          aria-label="Undo"
          disabled
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
          disabled
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
        >
          <Redo2 className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Redo (⌘⇧Z)</TooltipContent>
      </Tooltip>

      {/* Spacer */}
      <div className="flex-1" />

      <Separator orientation="vertical" className="h-6" />

      {/* Theme toggle — has its own aria-label */}
      <ThemeToggle />

      {/* Download (placeholder — wired in Step 13) */}
      <Button disabled>
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </header>
  );
}
