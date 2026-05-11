"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SliderField } from "@/components/shared/SliderField";
import { useEditor } from "@/lib/store";
import { exportImage, type ExportFormat, type ExportEngine } from "@/lib/export";

export function ExportDialog() {
  const open = useEditor((s) => s.exportOpen);
  const closeExport = useEditor((s) => s.closeExport);
  const selectLayer = useEditor((s) => s.selectLayer);

  const [format, setFormat] = useState<ExportFormat>("png");
  const [quality, setQuality] = useState(90);
  const [filename, setFilename] = useState(() => {
    const date = new Date().toISOString().slice(0, 10);
    const hash = Math.random().toString(36).slice(2, 7);
    return `photo-frame-${date}-${hash}`;
  });
  const [engine, setEngine] = useState<ExportEngine>("html-to-image");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  async function handleDownload() {
    setExporting(true);
    selectLayer(null); // drop selection handles
    await new Promise<void>((r) => requestAnimationFrame(() => r()));

    try {
      await exportImage({ format, quality: quality / 100, filename, engine });
      toast.success("Downloaded successfully");
      closeExport();
    } catch (err) {
      console.error(err);
      toast.error("Export failed", {
        description: "Try the html2canvas engine in Advanced settings.",
      });
    } finally {
      setExporting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) closeExport(); }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Download Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Format */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Format</Label>
            <div className="flex gap-2">
              {(["png", "jpeg"] as ExportFormat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors ${
                    format === f
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* JPEG quality */}
          {format === "jpeg" && (
            <SliderField
              label="Quality"
              value={quality}
              min={60}
              max={100}
              unit="%"
              onChange={setQuality}
            />
          )}

          {/* Filename */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Filename</Label>
            <Input
              className="h-8 text-xs"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>

          {/* Advanced */}
          <div className="space-y-2">
            <button
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setAdvancedOpen((o) => !o)}
            >
              {advancedOpen ? "▾" : "▸"} Advanced
            </button>
            {advancedOpen && (
              <>
                <Separator />
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Render engine</Label>
                  <div className="flex gap-2">
                    {(["html-to-image", "html2canvas"] as ExportEngine[]).map((e) => (
                      <button
                        key={e}
                        onClick={() => setEngine(e)}
                        className={`flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors ${
                          engine === e
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={closeExport} disabled={exporting}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleDownload} disabled={exporting} className="gap-2">
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {exporting ? "Exporting…" : "Download"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
