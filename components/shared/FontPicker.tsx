"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useDeferredValue,
} from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { GOOGLE_FONTS } from "@/lib/google-fonts-list";
import { loadFont } from "@/lib/google-fonts";

interface FontPickerProps {
  value: string;
  onChange: (family: string) => void;
  label?: string;
  className?: string;
}

/** Loads a font for preview when the row enters the viewport. */
function FontPreviewItem({
  family,
  selected,
  onSelect,
}: {
  family: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadFont(family, [400]).then(() => setReady(true));
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [family]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors text-left",
        selected && "bg-primary/10 text-primary"
      )}
    >
      <span
        style={ready ? { fontFamily: `'${family}', sans-serif` } : undefined}
        className={cn("truncate", !ready && "opacity-60")}
      >
        {family}
      </span>
      {selected && <Check className="w-3.5 h-3.5 shrink-0 ml-2" />}
    </button>
  );
}

export function FontPicker({ value, onChange, label, className }: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [loadedFamily, setLoadedFamily] = useState<string | null>(null);

  // Load current font for trigger button preview
  useEffect(() => {
    let cancelled = false;
    loadFont(value, [400]).then(() => {
      if (!cancelled) setLoadedFamily(value);
    });
    return () => { cancelled = true; };
  }, [value]);

  const triggerReady = loadedFamily === value;

  const filtered = deferredQuery.trim()
    ? GOOGLE_FONTS.filter((f) =>
        f.family.toLowerCase().includes(deferredQuery.toLowerCase())
      )
    : GOOGLE_FONTS;

  const handleSelect = useCallback(
    (family: string) => {
      onChange(family);
      setOpen(false);
      setQuery("");
    },
    [onChange]
  );

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <Label className="text-xs text-muted-foreground">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="flex w-full items-center justify-between h-8 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          style={triggerReady ? { fontFamily: `'${value}', sans-serif` } : undefined}
        >
          <span className="truncate">{value}</span>
          <ChevronDown className="w-3.5 h-3.5 shrink-0 opacity-50 ml-1" />
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="w-64 p-0"
        >
          {/* Search input */}
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            <Input
              autoFocus
              className="h-7 border-0 p-0 text-xs focus-visible:ring-0 shadow-none"
              placeholder="Search fonts…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Font list */}
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-xs text-muted-foreground text-center">
                No fonts found
              </p>
            ) : (
              filtered.map((f) => (
                <FontPreviewItem
                  key={f.family}
                  family={f.family}
                  selected={f.family === value}
                  onSelect={() => handleSelect(f.family)}
                />
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
