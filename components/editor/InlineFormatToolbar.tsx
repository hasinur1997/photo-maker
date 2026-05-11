"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Toggle } from "@/components/ui/toggle";
import { loadFont } from "@/lib/google-fonts";

const INLINE_FONTS = [
  "Inter",
  "Plus Jakarta Sans",
  "Hind Siliguri",
  "Galada",
  "Roboto",
  "Lato",
  "Open Sans",
  "Merriweather",
  "Georgia",
];

function getInlineEditAncestor(node: Node | null): HTMLElement | null {
  if (!node) return null;
  const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
  return el?.closest<HTMLElement>("[data-inline-edit]") ?? null;
}

export function InlineFormatToolbar() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [color, setColor] = useState("#000000");
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  // Snapshot of the selection taken before font-select steals focus
  const savedRangeRef = useRef<Range | null>(null);

  function saveRange() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }

  function restoreRange() {
    const range = savedRangeRef.current;
    if (!range) return;
    const editable = getInlineEditAncestor(range.commonAncestorContainer as Node);
    if (editable) editable.focus();
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  function readState() {
    setBold(document.queryCommandState("bold"));
    setItalic(document.queryCommandState("italic"));
    setUnderline(document.queryCommandState("underline"));
  }

  const updateToolbar = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
      setVisible(false);
      return;
    }
    if (!getInlineEditAncestor(sel.anchorNode)) {
      setVisible(false);
      return;
    }
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    setPos({ top: Math.max(8, rect.top - 52), left: rect.left + rect.width / 2 });
    readState();
    setVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", updateToolbar);
    return () => document.removeEventListener("selectionchange", updateToolbar);
  }, [updateToolbar]);

  function exec(cmd: string, value?: string) {
    document.execCommand(cmd, false, value);
    readState();
  }

  if (!visible) return null;

  return (
    <div
      className="fixed z-200 flex items-center gap-0.5 rounded-lg border border-border bg-popover shadow-lg px-1.5 py-1 text-popover-foreground"
      style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}
      onMouseDown={(e) => {
        // Prevent all toolbar interactions from blurring the contentEditable
        // (which would clear the text selection). The <select> is excluded
        // because it needs its default mousedown to open the native dropdown.
        if ((e.target as HTMLElement).tagName !== "SELECT") e.preventDefault();
      }}
    >
      <Toggle
        size="sm"
        pressed={bold}
        onPressedChange={() => exec("bold")}
        aria-label="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={italic}
        onPressedChange={() => exec("italic")}
        aria-label="Italic"
      >
        <Italic className="w-3.5 h-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={underline}
        onPressedChange={() => exec("underline")}
        aria-label="Underline"
      >
        <Underline className="w-3.5 h-3.5" />
      </Toggle>

      <div className="w-px h-4 bg-border mx-0.5" />

      {/* Color button with a non-portal picker so focus never leaves the
          contentEditable. `onMouseDown={preventDefault}` on both the button
          and the picker div is the key: it blocks the default focus-change
          action without preventing the click / pointer events that operate
          the picker and the toggle button. */}
      <div className="relative">
        <button
          className="h-7 w-7 rounded flex flex-col items-center justify-center gap-px hover:bg-muted"
          onMouseDown={(e) => {
            e.preventDefault(); // Keep focus in contentEditable
            setColorPickerOpen((v) => !v);
          }}
          aria-label="Text color"
        >
          <span className="text-xs font-bold leading-none">A</span>
          <span className="w-4 h-1 rounded-sm" style={{ background: color }} />
        </button>

        {colorPickerOpen && (
          <div
            className="absolute top-full left-1/2 mt-1.5 z-50 rounded-lg border border-border bg-popover p-2 shadow-lg"
            style={{ transform: "translateX(-50%)" }}
            onMouseDown={(e) => e.preventDefault()} // Keep focus in contentEditable
          >
            <HexColorPicker
              color={color}
              onChange={(c) => {
                setColor(c);
                // Selection is still active — no restoreRange needed
                document.execCommand("foreColor", false, c);
              }}
            />
          </div>
        )}
      </div>

      <div className="w-px h-4 bg-border mx-0.5" />

      {/* Font family — native <select> steals focus when opened, so we save
          the range on mousedown and restore it before applying the command. */}
      <select
        className="h-7 rounded border border-input bg-transparent text-xs focus:outline-none focus:ring-1 focus:ring-ring px-1 max-w-27.5"
        defaultValue=""
        onMouseDown={saveRange}
        onChange={(e) => {
          const family = e.target.value;
          if (!family) return;
          restoreRange();
          loadFont(family, [400, 700]);
          exec("fontName", family);
          e.target.value = ""; // reset so same font can be re-selected
        }}
      >
        <option value="" disabled>
          Font
        </option>
        {INLINE_FONTS.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
}
