# Photo Frame Maker — Product Requirements Document

> **Audience:** Claude Code (autonomous build agent)
> **Format:** Build this as a single Next.js application from scratch.
> **Build philosophy:** Build in the order given. Each section has acceptance criteria — verify them before moving on.

---

## 1. Product Summary

A professional, browser-based photo frame editor. Users upload a photo, pick a decorative frame (HTML/CSS overlay), customize the frame, add freely-positioned text layers with full formatting, and download a Facebook-post-ready image. No login, no backend — everything runs client-side and autosaves to `localStorage`.

**Key constraints:**
- Output is a 1080×1080 PNG or JPEG (Facebook/Instagram feed standard).
- All work persists to `localStorage` and is restored on reload.
- Frames are HTML/CSS components, exported via DOM-to-image rendering.
- Light theme is the default; dark theme is toggleable.

---

## 2. Tech Stack (locked)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | User requirement |
| Language | **TypeScript** (strict) | Catches state-bugs early in an editor |
| Styling | **Tailwind CSS** | Pairs with shadcn |
| Component library | **shadcn/ui** | User requirement |
| Theme | **next-themes** | Standard for shadcn dark mode |
| State | **Zustand** | Tiny, perfect for editor state |
| Drag/resize | **react-rnd** | Battle-tested for moveable text layers |
| Drag-and-drop upload | **react-dropzone** | Standard |
| Color picker | **react-colorful** | Lightweight, themeable |
| Icons | **lucide-react** | shadcn default |
| Font loader | **webfontloader** + Google Fonts CSS API | Runtime font loading |
| DOM → image export | **html-to-image** (primary) with **html2canvas** as fallback | html-to-image handles web fonts + box-shadows more reliably; expose both |
| ID generation | **nanoid** | For layer IDs |
| File saving | Native blob + anchor click (no extra dep) | |

> **Note on html-to-image vs html2canvas:** The user mentioned html2canvas. Use `html-to-image` as the primary export path because it renders Google Fonts and CSS shadows (a core requirement here) more faithfully. Keep `html2canvas` available as a fallback (toggle in the export modal advanced settings) in case a specific frame renders incorrectly.

---

## 3. File Structure

```
photo-frame-maker/
├── app/
│   ├── layout.tsx                # Root layout, theme provider, fonts
│   ├── page.tsx                  # Editor page (the only page)
│   ├── providers.tsx             # ThemeProvider + any client providers
│   └── globals.css               # Tailwind + CSS variables for shadcn
├── components/
│   ├── editor/
│   │   ├── EditorShell.tsx       # Top-level layout: navbar + rail + panel + canvas
│   │   ├── TopNavbar.tsx         # Brand, undo/redo, theme toggle, download
│   │   ├── ToolRail.tsx          # Narrow icon-only rail on far left
│   │   ├── ToolPanel.tsx         # Wider contextual panel (tool-specific UI)
│   │   ├── CanvasStage.tsx       # The 1080×1080 canvas wrapper (scales to viewport)
│   │   ├── PhotoLayer.tsx        # Renders uploaded photo
│   │   ├── FrameLayer.tsx        # Renders the active frame component
│   │   ├── TextLayerView.tsx     # Single text layer (react-rnd wrapper)
│   │   ├── PropertiesPanel.tsx   # Right-side panel for selected layer
│   │   └── tools/
│   │       ├── UploadTool.tsx
│   │       ├── FramesTool.tsx
│   │       ├── TextTool.tsx
│   │       ├── CustomizeFrameTool.tsx
│   │       └── ExportTool.tsx
│   ├── shared/
│   │   ├── ColorPicker.tsx       # Wraps react-colorful + hex input
│   │   ├── FontPicker.tsx        # Searchable Google Fonts dropdown
│   │   ├── SliderField.tsx       # Label + shadcn slider + numeric input
│   │   └── ThemeToggle.tsx
│   └── ui/                       # shadcn components (added via CLI)
├── frames/
│   ├── registry.ts               # Exports an array of FrameDefinition
│   ├── types.ts                  # FrameDefinition, TextSlot, FrameProps
│   ├── default/
│   │   ├── DefaultFrame.tsx      # React component built from user's HTML
│   │   ├── meta.ts               # Frame metadata
│   │   ├── frame.html            # USER-PROVIDED source (kept for reference)
│   │   └── thumbnail.png         # 200×200 preview
│   └── (additional frames go here)
├── lib/
│   ├── store.ts                  # Zustand store (single source of truth)
│   ├── types.ts                  # Shared TS types
│   ├── export.ts                 # html-to-image / html2canvas wrappers
│   ├── persistence.ts            # localStorage save/load with throttle
│   ├── google-fonts.ts           # Font list + dynamic loader (webfontloader)
│   ├── history.ts                # Undo/redo helpers
│   └── utils.ts                  # cn(), clamp(), etc.
├── public/
│   ├── frames/                   # Frame thumbnails served statically
│   └── samples/                  # Optional sample photos
├── components.json               # shadcn config
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 4. Layout Specification

The editor is a single full-viewport screen. No scrolling on the outer layout.

```
┌─────────────────────────────────────────────────────────────────┐
│  TopNavbar  (h-14, sticky)                                      │
│  [Logo]            [Undo] [Redo]      [Theme]  [Download ▼]    │
├──────┬──────────────┬───────────────────────────┬──────────────┤
│      │              │                           │              │
│ Tool │  Tool Panel  │       Canvas Stage        │  Properties  │
│ Rail │  (w-72)      │       (flex-1, center)    │  Panel       │
│ w-16 │              │                           │  (w-72)      │
│      │              │   ┌─────────────────┐    │              │
│ [📤] │  Frames:     │   │                 │    │  Text Layer  │
│ [🖼️] │  - Default   │   │  1080×1080      │    │  - Font: …  │
│ [T]  │  - Frame 2   │   │  scaled to fit  │    │  - Size: …  │
│ [🎨] │  - Frame 3   │   │                 │    │  - Color    │
│ [↗]  │              │   └─────────────────┘    │              │
│      │              │                           │              │
└──────┴──────────────┴───────────────────────────┴──────────────┘
```

**Behavior:**
- **Tool rail** (icon-only, 64px wide): Upload, Frames, Text, Customize Frame, Export. Active tool highlighted.
- **Tool panel** (288px wide): contextual to the active tool. Hides when no tool is active or can be collapsed.
- **Canvas stage**: centered, dark neutral backdrop (`bg-muted` or similar), canvas itself drawn in a card with subtle shadow. Canvas scales to fit available space while keeping 1:1 aspect ratio.
- **Properties panel** (288px wide): visible only when a text layer is selected; otherwise collapsed/hidden.
- **Top navbar** (56px tall): brand on left, undo/redo center-left, theme toggle + Download button on right.

**Responsive note:** Optimize for desktop (≥1280px). Below that, stack panels into shadcn `Sheet` drawers triggered from the top navbar. Mobile is not a v1 target but layout shouldn't break.

---

## 5. Core Data Model

Define in `lib/types.ts`:

```ts
export type CanvasSize = { width: 1080; height: 1080 };

export type Photo = {
  src: string;            // data URL or object URL
  // photo fills the canvas via "object-fit: cover" by default
  // future: pan/zoom controls (out of v1 scope)
};

export type FrameId = string;

export type FrameCustomization = {
  borderColor: string;     // hex
  borderWidth: number;     // px (0–80)
  opacity: number;         // 0–1
  shadow: {
    enabled: boolean;
    x: number;             // px
    y: number;
    blur: number;
    spread: number;
    color: string;         // hex/rgba
  };
};

export type TextLayer = {
  id: string;
  text: string;
  // position/size are stored in canvas-pixel space (1080×1080),
  // not screen space — keeps export pixel-perfect.
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;        // degrees
  fontFamily: string;      // Google Fonts family name
  fontWeight: number;      // 100–900
  fontStyle: 'normal' | 'italic';
  fontSize: number;        // px
  color: string;           // hex
  textAlign: 'left' | 'center' | 'right';
  lineHeight: number;      // unitless multiplier
  letterSpacing: number;   // px
  underline: boolean;
  // text shadow is OUT of scope (shadow applies to frame only per requirements)
};

export type EditorState = {
  canvas: CanvasSize;
  photo: Photo | null;
  frameId: FrameId;
  frameCustomization: FrameCustomization;
  textLayers: TextLayer[];
  selectedLayerId: string | null;
  activeTool: 'upload' | 'frames' | 'text' | 'customize' | 'export' | null;
  // history is managed separately
};
```

---

## 6. State Management (Zustand)

Single store in `lib/store.ts`. Use immer middleware for ergonomic mutations.

**Required actions:**
- `setPhoto(src)` / `clearPhoto()`
- `setFrame(frameId)` — also resets frame customization to that frame's defaults
- `updateFrameCustomization(partial)`
- `addTextLayer(layer?)` — generates ID via nanoid, defaults centered
- `updateTextLayer(id, partial)`
- `deleteTextLayer(id)`
- `selectLayer(id | null)`
- `setActiveTool(tool)`
- `loadFromStorage()` / `resetEditor()`
- Undo/redo: `undo()`, `redo()` (see §13)

**Persistence:** subscribe to the store and write to `localStorage` (throttled at 500ms). Restore on app mount before first render of the canvas. Skip persisting `activeTool` and `selectedLayerId`.

---

## 7. Frame System

Frames are React components that conform to a contract. This makes adding new frames trivial.

**`frames/types.ts`:**
```ts
export type TextSlot = {
  id: string;              // stable ID
  defaultText: string;
  // Where the placeholder sits on the 1080×1080 canvas.
  defaults: Pick<TextLayer,
    'x' | 'y' | 'width' | 'height' | 'fontFamily' | 'fontWeight'
    | 'fontSize' | 'color' | 'textAlign'>;
};

export type FrameComponentProps = {
  customization: FrameCustomization;
};

export type FrameDefinition = {
  id: string;
  name: string;
  thumbnail: string;       // /frames/<id>.png
  defaultCustomization: FrameCustomization;
  textSlots: TextSlot[];   // [] if frame has no built-in text
  Component: React.ComponentType<FrameComponentProps>;
};
```

**`frames/registry.ts`:** exports `FRAMES: FrameDefinition[]`. New frames are added by appending an entry.

**`frames/default/`:** the user will drop their HTML at `frames/default/frame.html`. Convert it to a React component (`DefaultFrame.tsx`) by:
1. Wrapping the HTML in a div sized to 1080×1080.
2. Replacing hardcoded colors/borders/opacity/shadow with the `customization` props.
3. Identifying any text spots in the original HTML and exposing them as `textSlots` (see "Text Slots Behavior" below).
4. Ensuring the frame's outer div has `pointer-events: none` so it doesn't block clicks on text layers underneath. Any decorative elements should also be non-interactive.

**Text Slots Behavior:**
- When a frame is selected, automatically materialize its `textSlots` as `TextLayer`s in state (so they're editable, draggable, deletable like user-added text — exactly as if the user had typed them in).
- Each slot has a stable ID; if the user has already edited a slot's text from a previous selection of the same frame, preserve their edits when re-selecting.

---

## 8. Feature Specifications & Acceptance Criteria

### 8.1 Photo Upload (Tool: Upload)

**UI:** Tool panel shows a `react-dropzone` area with "Drop a photo here, or click to browse." Below, an "Upload from device" button. If a photo is loaded, show a thumbnail with a "Replace" and "Remove" button.

**Logic:**
- Accept image/png, image/jpeg, image/webp. Max size: 15 MB.
- Convert to data URL via `FileReader.readAsDataURL` and store in `photo.src`.
- Photo renders behind the frame, sized to fully cover the 1080×1080 canvas (`object-fit: cover; object-position: center`).

**Acceptance criteria:**
- [ ] Drag-and-drop on the dropzone uploads the file.
- [ ] Drag-and-drop anywhere on the canvas stage also uploads (global drop target while no photo present).
- [ ] Invalid file type / oversized file shows a shadcn `toast` error.
- [ ] Photo persists across reloads (data URL in localStorage).
- [ ] Photo is rendered behind frame and below text layers.

### 8.2 Frame Selection (Tool: Frames)

**UI:** Tool panel shows a vertically scrolling grid of frame thumbnails (2 columns). Each thumbnail shows the frame name. Active frame has a ring (`ring-2 ring-primary`).

**Logic:**
- Selecting a frame: `setFrame(id)` → resets `frameCustomization` to that frame's defaults → materializes any new `textSlots` as text layers (preserve user-edited slots if same frame's slot ID was previously edited).

**Acceptance criteria:**
- [ ] At least one frame (the user-provided default) is shown and selectable.
- [ ] Adding a new frame requires only a new folder under `frames/` and an entry in `registry.ts`.
- [ ] Switching frames is instant (<100ms perceived).
- [ ] Frame selection persists.

### 8.3 Frame Customization (Tool: Customize Frame)

**UI:** Tool panel shows:
- **Border color**: ColorPicker
- **Border thickness**: Slider 0–80 px
- **Frame opacity**: Slider 0–100%
- **Shadow** (collapsible, with enable toggle):
  - X offset: −50 to 50
  - Y offset: −50 to 50
  - Blur: 0–100
  - Spread: −50 to 50
  - Shadow color: ColorPicker (with alpha)
- **Reset to default** button

**Logic:** Frame component reads `customization` props and applies them. Border + opacity apply to the outermost frame element. Shadow renders via `box-shadow` on the frame element.

**Acceptance criteria:**
- [ ] All sliders update the canvas in real-time (≤16ms frame).
- [ ] Reset button restores the active frame's `defaultCustomization`.
- [ ] Customization persists per-frame in localStorage (so switching frames and back keeps your tweaks).

### 8.4 Text Layers (Tool: Text)

**UI in tool panel:**
- "Add Text" button — adds a new `TextLayer` at canvas center with sensible defaults (Inter 48px, black, "Your text").
- List of existing text layers with click-to-select, drag-to-reorder (z-order), and delete buttons.

**UI on canvas:**
- Each text layer rendered via `react-rnd`. Selected layer shows resize handles + a rotation handle (nice-to-have, may be cut from v1).
- Double-click a text layer to enter edit mode (contentEditable). Press Esc or click outside to exit.

**Logic:**
- Position/size stored in canvas-pixel space (0–1080). When the canvas is rendered scaled, multiply by the current scale factor for display, divide back when storing.
- Selecting a text layer opens the **Properties Panel** (right side).

**Acceptance criteria:**
- [ ] Add multiple text layers; each is independently movable, resizable, and styleable.
- [ ] Double-click a text to edit; Enter creates newlines, Esc commits.
- [ ] Delete key removes the selected layer (when not in edit mode).
- [ ] Layer position is preserved exactly across reloads and across export.

### 8.5 Text Formatting (Properties Panel)

**Visible when a text layer is selected. Controls:**
- **Font family** — searchable Google Fonts picker (see §9)
- **Font weight** — dropdown of weights available for the chosen family
- **Italic / Underline** — toggle buttons
- **Font size** — slider 8–200 + numeric input
- **Color** — ColorPicker
- **Alignment** — left / center / right toggle group
- **Line height** — 0.8–3 slider
- **Letter spacing** — −5 to 20 slider
- **Rotation** — −180 to 180 slider
- **Z-order** — bring forward / send back buttons
- **Duplicate** + **Delete** buttons

**Acceptance criteria:**
- [ ] Every control updates the canvas immediately.
- [ ] Font picker shows live previews in the dropdown using each family's name rendered in that family.
- [ ] Switching fonts loads the font dynamically (no FOUT-flash on the canvas — use webfontloader's `active` callback before applying).

### 8.6 Theme Toggle

- `next-themes` with `defaultTheme="light"` and `enableSystem={false}` (per user's "default light" requirement; system theme is not the default).
- Toggle in top navbar: a Sun/Moon icon button.
- All colors via shadcn CSS variables — no hardcoded grays in components.

**Acceptance criteria:**
- [ ] Initial load is light mode.
- [ ] Toggle persists choice via next-themes' localStorage.
- [ ] Both modes look polished — verify no contrast or visibility issues.

### 8.7 Export / Download (Tool: Export, also in TopNavbar)

**UI:** A modal (shadcn `Dialog`) with:
- **Format**: PNG / JPEG (radio)
- **JPEG Quality**: slider 60–100% (visible only for JPEG)
- **Filename**: text input, default `photo-frame-<timestamp>`
- **Advanced** (collapsible): Render engine — html-to-image (default) / html2canvas
- **Download** button (primary)

**Export procedure:**
1. Hide UI affordances on the canvas: clear `selectedLayerId`, hide react-rnd handles via a CSS class on the stage (`.exporting`).
2. Wait one frame (`requestAnimationFrame`) so the DOM updates.
3. Confirm all Google Fonts used by text layers are loaded (`document.fonts.ready`).
4. Call `htmlToImage.toPng(canvasNode, { pixelRatio: 1, width: 1080, height: 1080, cacheBust: true })` (or `.toJpeg(node, { quality, ... })`).
5. Convert resulting data URL → Blob → object URL → trigger anchor click.
6. Restore UI state.

**Acceptance criteria:**
- [ ] Output is exactly 1080×1080.
- [ ] Photo, frame (with all customization), and all text layers appear pixel-correct.
- [ ] Selection rings, react-rnd handles, and any other UI chrome do NOT appear in the export.
- [ ] Google Fonts render correctly (no fallback fonts in output).
- [ ] Filename ends in `.png` or `.jpg` matching the chosen format.

---

## 9. Google Fonts Integration

**Source list:** Use the Google Fonts Developer API (`https://www.googleapis.com/webfonts/v1/webfonts`) requires a key. To avoid an API key dependency, ship a **bundled JSON snapshot** of the font list at `lib/google-fonts-list.ts`. Fetch it once at build time via a script under `scripts/fetch-fonts.mjs` (developer runs it; commits the JSON). Include for each family: `family`, `category`, `variants`, `subsets`.

**Loading at runtime:**
- Use **webfontloader** for runtime loading. When the user picks a font, call:
  ```ts
  WebFont.load({
    google: { families: [`${family}:${weights.join(',')}`] },
    active: () => resolve(),
  });
  ```
- Cache loaded family names in a `Set` to avoid double-loading.
- The font picker dropdown should also load each visible family lazily (intersection observer) to power the live previews without loading all 1500+ fonts.

**Text layer font field:** stores the family name as a string. When the layer mounts or font changes, ensure the family is loaded before the canvas reflects it.

---

## 10. localStorage Persistence

**Key:** `pfm:editor:v1`
**What's saved:** the entire `EditorState` minus `activeTool` and `selectedLayerId`.
**What's NOT saved (separately handled):**
- Theme — handled by next-themes under its own key.
- Undo/redo history — session-only.

**Strategy:**
- Throttle writes to 500ms.
- On boot, attempt to read; if parsing fails or schema mismatches, fall back to default state and clear the bad entry.
- Photo `src` is a base64 data URL — be mindful of localStorage 5MB limits. If a save would exceed 4.5MB, downscale photo to fit (resize to max 1080×1080 before storing) and notify via toast.

---

## 11. Undo / Redo

- Maintain `past: EditorState[]` and `future: EditorState[]` arrays (capped to 50 entries).
- Push current state to `past` on every "meaningful" action (any mutation EXCEPT `selectLayer`, `setActiveTool`, and live-dragging interim values).
- For drag interactions in react-rnd: push to history on `onDragStop` and `onResizeStop`, not on every move.
- For sliders (font size, frame customization): debounce history pushes by 400ms after the user stops adjusting.
- Keyboard: `⌘/Ctrl+Z` undo, `⌘/Ctrl+Shift+Z` redo. Disable buttons when stack empty.

---

## 12. Keyboard Shortcuts (v1)

| Action | Shortcut |
|---|---|
| Undo | ⌘/Ctrl + Z |
| Redo | ⌘/Ctrl + Shift + Z |
| Delete selected layer | Delete / Backspace (when not in text edit mode) |
| Duplicate selected layer | ⌘/Ctrl + D |
| Add text | T |
| Toggle theme | ⌘/Ctrl + . |
| Download | ⌘/Ctrl + S (intercept, open export dialog) |
| Deselect | Escape |

Use a single `useEffect` in `EditorShell` with a keydown listener, gated to ignore events when `e.target` is an input, textarea, or contentEditable element.

---

## 13. Visual Polish Checklist

These are required for the "professional" feel:
- [ ] Empty state on the canvas before a photo is uploaded — illustration + "Drop or upload a photo to start."
- [ ] Skeleton loaders while a frame thumbnail loads.
- [ ] Smooth 150ms transitions on panel open/close, theme toggle, and tool switch.
- [ ] Subtle hover states on all interactive elements.
- [ ] Tooltips (shadcn `Tooltip`) on all icon-only buttons in the tool rail and top navbar.
- [ ] Consistent spacing (Tailwind's 4/8/16/24 scale only).
- [ ] No layout shift when toggling theme.
- [ ] All toasts use shadcn `sonner`.

---

## 14. Build Order

Execute in this order. Run the app and visually verify each step before moving on.

1. **Bootstrap** — `npx create-next-app@latest` (TypeScript, Tailwind, App Router, ESLint, src/ off, alias `@/*`). Init shadcn (`npx shadcn@latest init`). Add components: `button`, `dialog`, `dropdown-menu`, `slider`, `tabs`, `tooltip`, `toggle`, `toggle-group`, `input`, `label`, `card`, `sonner`, `sheet`, `separator`, `scroll-area`.
2. **Theme provider** — install `next-themes`, set up `app/providers.tsx`, default light. Add `ThemeToggle` to a placeholder navbar to verify.
3. **Layout shell** — `EditorShell`, `TopNavbar`, `ToolRail`, `ToolPanel` (empty), `PropertiesPanel` (empty), `CanvasStage` (empty 1080×1080 box that scales). No state yet.
4. **Zustand store** — implement `lib/store.ts` with the actions in §6. Don't wire localStorage yet.
5. **Photo upload** — `UploadTool` + `PhotoLayer`. Verify drag/drop + file picker.
6. **Frame system** — implement registry, types, and a placeholder frame so the UI works. Then convert the user's `frame.html` → `DefaultFrame.tsx`. Wire `FramesTool` to switch frames.
7. **Frame customization** — `CustomizeFrameTool` + bind to `DefaultFrame` props.
8. **Text layers** — `TextTool`, `TextLayerView` with react-rnd, double-click-to-edit. Multiple layers, selection.
9. **Properties panel** — all formatting controls, color picker.
10. **Google Fonts** — font list JSON, `FontPicker`, dynamic loader, live previews.
11. **Persistence** — `lib/persistence.ts`, throttled save, boot-time restore, photo-too-large guard.
12. **Undo/redo** — history middleware on the store, keyboard shortcuts.
13. **Export** — `ExportTool` + modal, html-to-image, html2canvas fallback toggle, font-readiness wait.
14. **Polish pass** — keyboard shortcuts, tooltips, empty states, transitions, toast errors, dark-mode QA.

---

## 15. Out-of-Scope for v1

Document these clearly in the README so they don't creep in:
- User accounts / cloud save
- Image filters / brightness / contrast (photo adjustments)
- Pan/zoom/crop on the photo
- Stickers, shapes, or non-text decorative layers
- Multi-page or multi-canvas projects
- Mobile-first responsive layout (basic responsiveness only)
- Sharing directly to Facebook/Instagram (the user downloads then uploads themselves)
- Custom font upload (only Google Fonts)
- Text shadow (per requirement: shadow applies to frame only)
- Aspect ratios other than 1:1 (1080×1080) — future enhancement may add 4:5 portrait and 1.91:1 landscape

---

## 16. Dependencies (final list for `package.json`)

```jsonc
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-themes": "^0.3.0",
    "zustand": "^4.5.0",
    "immer": "^10.1.0",
    "react-rnd": "^10.4.0",
    "react-dropzone": "^14.2.0",
    "react-colorful": "^5.6.0",
    "lucide-react": "^0.400.0",
    "webfontloader": "^1.6.28",
    "html-to-image": "^1.11.13",
    "html2canvas": "^1.4.1",
    "nanoid": "^5.0.0",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.4.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/webfontloader": "^1.6.38",
    "@types/node": "^20.14.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

> Verify and bump versions at install time. shadcn components install themselves into `components/ui` via the CLI and pull their own deps as needed.

---

## 17. Definition of Done

The build is complete when:
1. All acceptance criteria checkboxes (§8) pass.
2. The user-provided default frame renders correctly with customization.
3. A user can: upload → pick frame → customize → add multiple styled text layers → download a 1080×1080 PNG that matches the canvas pixel-for-pixel.
4. Reload preserves all work.
5. Light and dark mode are both polished.
6. No TypeScript errors (`tsc --noEmit` clean), no ESLint errors.
7. Lighthouse desktop performance ≥ 85.

---

## 18. Notes for Claude Code

- **Commit per build-order step.** After each step in §14, commit with a clear message. Easier to roll back.
- **Verify exports visually.** After the export step, download a test image and open it — confirm dimensions are 1080×1080 and fonts are correct.
- **Don't pre-load all 1500+ Google Fonts.** Only load fonts that are actually used by a text layer + lazy-load previews in the picker.
- **Pointer events on frames.** Frames sit on top of photos but below text layers in z-index. Frame elements must have `pointer-events: none` (except interactive parts, which there are none in v1).
- **Use canvas-pixel coordinates everywhere.** The visible canvas is scaled; never store screen-pixel positions. Convert at the boundary.
- **The user will drop their HTML at `frames/default/frame.html`.** Open it, identify decorative SVG/divs and any text, and produce `DefaultFrame.tsx`. Hook customization props (border color/width, opacity, box-shadow) to the appropriate elements. If the HTML has hardcoded text, expose those positions as `textSlots`.
