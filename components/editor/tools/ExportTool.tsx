"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/lib/store";

export function ExportTool() {
  const openExport = useEditor((s) => s.openExport);
  const photo = useEditor((s) => s.photo);

  return (
    <div className="p-4 space-y-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        Export
      </p>
      <p className="text-xs text-muted-foreground">
        Download your composition as a 1080×1080 PNG or JPEG.
      </p>
      <Button
        className="w-full gap-2"
        onClick={openExport}
        disabled={!photo}
      >
        <Download className="w-4 h-4" />
        Download Image
      </Button>
      {!photo && (
        <p className="text-xs text-muted-foreground text-center">
          Upload a photo first.
        </p>
      )}
    </div>
  );
}
