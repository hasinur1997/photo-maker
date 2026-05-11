"use client";

import { useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  className?: string;
}

export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit,
  className,
}: SliderFieldProps) {
  const clamped = Math.min(max, Math.max(min, value));

  // base-ui slider passes `number | readonly number[]`
  const handleSlider = useCallback(
    (v: number | readonly number[]) => {
      const n = Array.isArray(v) ? (v as number[])[0] : (v as number);
      onChange(n);
    },
    [onChange]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = parseFloat(e.target.value);
      if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    },
    [min, max, onChange]
  );

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <div className="flex items-center gap-0.5">
          <Input
            type="number"
            className="h-6 w-14 text-xs text-right px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={clamped}
            min={min}
            max={max}
            step={step}
            onChange={handleInput}
          />
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
      </div>
      <Slider
        value={clamped}
        min={min}
        max={max}
        step={step}
        onValueChange={handleSlider}
        className="w-full"
      />
    </div>
  );
}
