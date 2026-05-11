"use client";

import { useState, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function isValidHex(v: string) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v);
}

export function ColorPicker({ label, value, onChange, className }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);

  const handlePickerChange = useCallback((color: string) => {
    setInputValue(color);
    onChange(color);
  }, [onChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    const normalized = raw.startsWith("#") ? raw : `#${raw}`;
    if (isValidHex(normalized)) onChange(normalized);
  }, [onChange]);

  const handleInputBlur = useCallback(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <Label className="text-xs text-muted-foreground">{label}</Label>}
      <div className="flex items-center gap-2">
        <Popover>
          {/* base-ui Trigger renders as <button> — apply swatch styles directly */}
          <PopoverTrigger
            className="w-8 h-8 rounded border border-border shrink-0 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            style={{ background: value }}
            aria-label={`Color: ${value}`}
          />
          <PopoverContent side="right" align="start">
            <HexColorPicker color={value} onChange={handlePickerChange} />
          </PopoverContent>
        </Popover>
        <Input
          className="h-8 font-mono text-xs"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          maxLength={7}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
