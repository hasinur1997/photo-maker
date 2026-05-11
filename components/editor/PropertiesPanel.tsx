"use client";

import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Italic,
  Underline,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ColorPicker } from "@/components/shared/ColorPicker";
import { SliderField } from "@/components/shared/SliderField";
import { useEditor } from "@/lib/store";
import type { TextLayer } from "@/lib/types";

const FONT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const WEIGHT_LABELS: Record<number, string> = {
  100: "100 Thin",
  200: "200 Extra Light",
  300: "300 Light",
  400: "400 Regular",
  500: "500 Medium",
  600: "600 Semi Bold",
  700: "700 Bold",
  800: "800 Extra Bold",
  900: "900 Black",
};

export function PropertiesPanel() {
  const selectedLayerId = useEditor((s) => s.selectedLayerId);
  const textLayers = useEditor((s) => s.textLayers);
  const updateTextLayer = useEditor((s) => s.updateTextLayer);
  const deleteTextLayer = useEditor((s) => s.deleteTextLayer);
  const duplicateTextLayer = useEditor((s) => s.duplicateTextLayer);
  const moveLayerUp = useEditor((s) => s.moveLayerUp);
  const moveLayerDown = useEditor((s) => s.moveLayerDown);

  const layer = textLayers.find((l) => l.id === selectedLayerId);

  if (!layer) {
    return (
      <aside className="w-72 shrink-0 border-l border-border bg-background overflow-y-auto">
        <div className="p-4 text-xs text-muted-foreground">
          Select a text layer to edit properties.
        </div>
      </aside>
    );
  }

  function update(partial: Partial<Omit<TextLayer, "id">>) {
    if (!layer) return;
    updateTextLayer(layer.id, partial);
  }

  return (
    <aside className="w-72 shrink-0 border-l border-border bg-background overflow-y-auto">
      <div className="px-4 py-3 border-b border-border">
        <span className="text-sm font-semibold">Text Properties</span>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Font family — replaced by FontPicker in Step 10 */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Font family</Label>
          <Input
            className="h-8 text-xs"
            value={layer.fontFamily}
            onChange={(e) => update({ fontFamily: e.target.value })}
            placeholder="e.g. Inter"
          />
        </div>

        {/* Font weight */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Font weight</Label>
          <select
            className="w-full h-8 rounded-md border border-input bg-transparent px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            value={layer.fontWeight}
            onChange={(e) => update({ fontWeight: Number(e.target.value) })}
          >
            {FONT_WEIGHTS.map((w) => (
              <option key={w} value={w}>
                {WEIGHT_LABELS[w]}
              </option>
            ))}
          </select>
        </div>

        {/* Style toggles */}
        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            pressed={layer.fontStyle === "italic"}
            onPressedChange={(p) => update({ fontStyle: p ? "italic" : "normal" })}
            aria-label="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={layer.underline}
            onPressedChange={(p) => update({ underline: p })}
            aria-label="Underline"
          >
            <Underline className="w-3.5 h-3.5" />
          </Toggle>
        </div>

        <Separator />

        {/* Font size */}
        <SliderField
          label="Font size"
          value={layer.fontSize}
          min={8}
          max={200}
          unit="px"
          onChange={(v) => update({ fontSize: v })}
        />

        {/* Color */}
        <ColorPicker
          label="Text color"
          value={layer.color}
          onChange={(v) => update({ color: v })}
        />

        <Separator />

        {/* Alignment */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Alignment</Label>
          <div className="flex items-center gap-1">
            <Toggle
              size="sm"
              pressed={layer.textAlign === "left"}
              onPressedChange={() => update({ textAlign: "left" })}
              aria-label="Align left"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={layer.textAlign === "center"}
              onPressedChange={() => update({ textAlign: "center" })}
              aria-label="Align center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={layer.textAlign === "right"}
              onPressedChange={() => update({ textAlign: "right" })}
              aria-label="Align right"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </Toggle>
          </div>
        </div>

        <Separator />

        {/* Line height */}
        <SliderField
          label="Line height"
          value={Math.round(layer.lineHeight * 10) / 10}
          min={0.8}
          max={3}
          step={0.1}
          onChange={(v) => update({ lineHeight: v })}
        />

        {/* Letter spacing */}
        <SliderField
          label="Letter spacing"
          value={layer.letterSpacing}
          min={-5}
          max={20}
          step={0.5}
          unit="px"
          onChange={(v) => update({ letterSpacing: v })}
        />

        {/* Rotation */}
        <SliderField
          label="Rotation"
          value={layer.rotation}
          min={-180}
          max={180}
          unit="°"
          onChange={(v) => update({ rotation: v })}
        />

        <Separator />

        {/* Z-order */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Layer order</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1 text-xs"
              onClick={() => moveLayerUp(layer.id)}
            >
              <ChevronUp className="w-3.5 h-3.5" />
              Forward
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1 text-xs"
              onClick={() => moveLayerDown(layer.id)}
            >
              <ChevronDown className="w-3.5 h-3.5" />
              Back
            </Button>
          </div>
        </div>

        <Separator />

        {/* Duplicate + Delete */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1 text-xs"
            onClick={() => duplicateTextLayer(layer.id)}
          >
            <Copy className="w-3.5 h-3.5" />
            Duplicate
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1 gap-1 text-xs"
            onClick={() => deleteTextLayer(layer.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      </div>
    </aside>
  );
}
