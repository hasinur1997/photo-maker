"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "@/components/shared/ColorPicker";
import { SliderField } from "@/components/shared/SliderField";
import { useEditor } from "@/lib/store";
import { useDebouncedHistoryPush } from "@/lib/history";
import { getFrame } from "@/frames/registry";

export function CustomizeFrameTool() {
  const frameId = useEditor((s) => s.frameId);
  const c = useEditor((s) => s.frameCustomization);
  const updateFrameCustomization = useEditor((s) => s.updateFrameCustomization);
  const pushHistory = useEditor((s) => s._pushHistory);
  const debouncedPush = useDebouncedHistoryPush();
  const [shadowOpen, setShadowOpen] = useState(false);

  function reset() {
    const frame = getFrame(frameId);
    if (frame) {
      pushHistory(); // immediate push before reset
      updateFrameCustomization(frame.defaultCustomization);
    }
  }

  // Wrapper: update immediately (for real-time preview) + debounce the history push
  function update(patch: Parameters<typeof updateFrameCustomization>[0]) {
    updateFrameCustomization(patch);
    debouncedPush();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-sm font-semibold">Customize Frame</span>
        <Button variant="ghost" size="sm" onClick={reset} className="h-7 px-2 text-xs gap-1">
          <RotateCcw className="w-3 h-3" />
          Reset
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Border color */}
        <ColorPicker
          label="Border color"
          value={c.borderColor}
          onChange={(v) => update({ borderColor: v })}
        />

        {/* Border thickness */}
        <SliderField
          label="Border thickness"
          value={c.borderWidth}
          min={0}
          max={80}
          unit="px"
          onChange={(v) => update({ borderWidth: v })}
        />

        <Separator />

        {/* Opacity */}
        <SliderField
          label="Frame opacity"
          value={Math.round(c.opacity * 100)}
          min={0}
          max={100}
          unit="%"
          onChange={(v) => update({ opacity: v / 100 })}
        />

        <Separator />

        {/* Shadow section */}
        <div className="space-y-3">
          <button
            className="flex items-center gap-1.5 w-full text-sm font-medium hover:text-foreground transition-colors"
            onClick={() => setShadowOpen((o) => !o)}
          >
            {shadowOpen ? (
              <ChevronDown className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 shrink-0" />
            )}
            Shadow
          </button>

          {shadowOpen && (
            <div className="space-y-4 pl-1">
              {/* Enable toggle — immediate history push (discrete action) */}
              <div className="flex items-center gap-2">
                <Switch
                  id="shadow-enabled"
                  checked={c.shadow.enabled}
                  onCheckedChange={(v) => {
                    pushHistory();
                    updateFrameCustomization({ shadow: { enabled: v } });
                  }}
                />
                <Label htmlFor="shadow-enabled" className="text-xs cursor-pointer">
                  Enable shadow
                </Label>
              </div>

              {c.shadow.enabled && (
                <>
                  <SliderField
                    label="X offset"
                    value={c.shadow.x}
                    min={-50}
                    max={50}
                    unit="px"
                    onChange={(v) => update({ shadow: { x: v } })}
                  />
                  <SliderField
                    label="Y offset"
                    value={c.shadow.y}
                    min={-50}
                    max={50}
                    unit="px"
                    onChange={(v) => update({ shadow: { y: v } })}
                  />
                  <SliderField
                    label="Blur"
                    value={c.shadow.blur}
                    min={0}
                    max={100}
                    unit="px"
                    onChange={(v) => update({ shadow: { blur: v } })}
                  />
                  <SliderField
                    label="Spread"
                    value={c.shadow.spread}
                    min={-50}
                    max={50}
                    unit="px"
                    onChange={(v) => update({ shadow: { spread: v } })}
                  />
                  <ColorPicker
                    label="Shadow color"
                    value={c.shadow.color.startsWith("#") ? c.shadow.color : "#000000"}
                    onChange={(v) => update({ shadow: { color: v } })}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
