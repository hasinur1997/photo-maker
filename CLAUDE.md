# CLAUDE.md

Operational handbook for working in this repository. Read this every time before making changes. The PRD (`PRD.md`) covers *what* to build; this file covers *how* to work in the codebase day-to-day.

---

## Project

Photo Frame Maker — browser-based editor that produces a 1080×1080 PNG/JPEG for Facebook/Instagram feed posts. Photo + HTML/CSS frame overlay + freely-positioned text layers, exported via DOM-to-image. No backend, no auth, all state in `localStorage`.

---

## Stack (do not swap without a discussion)

- Next.js 14+ App Router · TypeScript (strict) · Tailwind · shadcn/ui
- State: **Zustand** + immer
- Theme: **next-themes** (default `light`, system theme disabled)
- Drag/resize: **react-rnd**
- Upload: **react-dropzone**
- Color: **react-colorful**
- Fonts: **webfontloader** + bundled Google Fonts list
- Export: **html-to-image** (primary), **html2canvas** (fallback)
- Toasts: **sonner**

---

## Commands

```bash
npm run dev         # Local dev at http://localhost:3000
npm run build       # Production build (must pass before merging)
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit (alias defined in package.json)
npm run fonts:sync  # Re-fetch Google Fonts list snapshot (devs only)
```

Always run `npm run typecheck && npm run lint` before declaring a task done.

---

## Architecture map

```
app/                 Pages, providers, global styles. Single editor page.
components/editor/   The editor UI: shell, navbar, rail, panels, canvas, layers
components/editor/tools/   One file per left-rail tool
components/shared/   Reusable building blocks (ColorPicker, FontPicker, …)
components/ui/       shadcn components — do not edit manually, use the CLI
frames/              Frame definitions, registry, and per-frame folders
lib/store.ts         Zustand store — single source of truth for editor state
lib/persistence.ts   localStorage save/load (throttled)
lib/export.ts        html-to-image / html2canvas wrappers
lib/google-fonts.ts  Font list + dynamic loader
lib/history.ts       Undo/redo
lib/types.ts         Shared TypeScript types
```

If a piece of logic could be reused, it goes in `lib/`. Components stay presentational where possible; talk to the store via hooks.

---

## State model (one source of truth)

All editor state lives in the Zustand store at `lib/store.ts`:

- `photo` — `{ src }` or null
- `frameId` — current frame ID
- `frameCustomization` — border color/width, opacity, shadow
- `textLayers` — array of `TextLayer` (positions in canvas-pixel space)
- `selectedLayerId`
- `activeTool`

Components must **not** keep duplicate copies of editor data in local `useState`. If you find yourself doing that, the action belongs in the store.

Selectors should be narrow (`useEditor((s) => s.textLayers)`) — never `useEditor((s) => s)` because it triggers re-renders on every change.

---

## Critical conventions (don't violate)

### 1. Coordinate system: canvas-pixel space, not screen-pixel space

Text layer `x/y/width/height/fontSize` are stored in **1080×1080 canvas pixels**. The visible canvas is scaled to fit the viewport. Convert at the boundary (in `TextLayerView` and react-rnd handlers) — never store screen pixels in the store. Export depends on this; positions will drift if you mix the two.

### 2. Theme via shadcn CSS variables only

No hardcoded greys, blacks, or whites in component code. Use Tailwind tokens that map to CSS variables (`bg-background`, `text-foreground`, `bg-muted`, `border-border`, etc.). If a color is missing, add it to the shadcn theme — don't inline it.

### 3. Frames must not block clicks

A frame's outermost element gets `pointer-events: none`. Decorative children inherit it. Without this, users can't grab text layers that sit beneath frame elements.

### 4. Text layers always editable, including frame placeholders

When a frame defines `textSlots`, the store materializes them as regular `TextLayer`s with stable IDs. The user edits, drags, and styles them like any other text. Don't render slot text via the frame component itself.

### 5. History (undo/redo) is not pushed on every interaction tick

- react-rnd: push on `onDragStop` / `onResizeStop`, never on `onDrag`.
- Sliders: debounce 400ms after the last change.
- `selectLayer` and `setActiveTool` are NOT history events.

### 6. localStorage budget

The photo data URL is the largest field. The persistence layer must downscale photos to ≤1080×1080 before saving and abort gracefully if the serialized state exceeds ~4.5 MB (toast the user).

### 7. Google Fonts: lazy

Never preload all families. Load on demand via `webfontloader` only when (a) a text layer uses the family, or (b) the family is currently visible in the picker dropdown (use IntersectionObserver for previews).

---

## How to add a new frame

This is the most common extension task. Steps:

1. Create `frames/<frame-id>/`.
2. Add `meta.ts` exporting a `FrameDefinition` (see `frames/types.ts`).
3. Add `<FrameId>Frame.tsx` — a React component with prop `customization: FrameCustomization`. Outermost element sized 1080×1080, with `pointer-events: none`. Wire `customization.borderColor`, `borderWidth`, `opacity`, and `shadow` to the appropriate elements (typically `box-shadow`, `border`, `opacity` styles on the frame's main container).
4. If the frame has built-in text, declare `textSlots` in the meta with default position/style. Don't render the text inside the frame component.
5. Drop a 200×200 thumbnail at `public/frames/<frame-id>.png`.
6. Import and append to the `FRAMES` array in `frames/registry.ts`.
7. Verify: switch to it, customize it, add text, export — check the PNG is correct.

No other file should need editing.

---

## Export pipeline (exact procedure)

Implemented in `lib/export.ts`. Any change to the canvas DOM may break it — re-test after changes.

1. `selectLayer(null)` to drop selection.
2. Add class `exporting` to the canvas root (CSS hides react-rnd handles, focus rings, selection outlines).
3. `await new Promise(requestAnimationFrame)` so the DOM repaints.
4. `await document.fonts.ready` so all loaded Google Fonts are committed.
5. Call `htmlToImage.toPng(node, { width: 1080, height: 1080, pixelRatio: 1, cacheBust: true })` (or `.toJpeg` with quality).
6. Convert the resulting data URL to a Blob, then to an object URL, then trigger an anchor click.
7. `URL.revokeObjectURL`, remove the `exporting` class.

If a frame ever renders wrong, expose the html2canvas fallback in the export modal's Advanced section.

---

## Persistence rules

- Storage key: `pfm:editor:v1`. Bump the version suffix on breaking schema changes and write a migration in `lib/persistence.ts`.
- Saved fields: everything in the store **except** `selectedLayerId` and `activeTool`.
- Theme is owned by `next-themes` under its own key — don't touch it from our store.
- Throttle writes to 500 ms.
- On boot, load before the first canvas render so the user never sees a flash of empty state when their work exists.

---

## Theming rules

- Default theme is `light`. `next-themes` config: `defaultTheme="light"`, `enableSystem={false}`.
- Toggle is in the top navbar. Both modes must be polished — verify any new component in both before committing.
- No layout shift between themes.

---

## Don'ts

- Don't add a backend, API route, or external network call beyond Google Fonts CDN. The app is fully client-side.
- Don't introduce a CSS-in-JS lib (styled-components, emotion). Tailwind only.
- Don't import from `node:` modules in client components.
- Don't store screen-pixel coordinates in the store.
- Don't render frame placeholder text inside the frame component — go through `textSlots` → `TextLayer`.
- Don't preload the entire Google Fonts list.
- Don't hardcode colors. Use CSS variables.
- Don't add features marked out-of-scope in the PRD without explicit approval.
- Don't use `dangerouslySetInnerHTML` to render frames — convert HTML to JSX.
- Don't add new shadcn components by copy-paste; use `npx shadcn@latest add <name>`.

---

## Verification before declaring done

For any change, run:

1. `npm run typecheck` — clean.
2. `npm run lint` — clean.
3. Manual: upload a photo → pick a frame → customize → add 2+ text layers → export PNG → open the file → confirm 1080×1080 and matches the canvas.
4. Reload the page → confirm work is restored.
5. Toggle to dark mode → confirm no contrast issues, no layout shift.
6. If you touched the store: undo/redo your change-flow back and forward.

---

## When in doubt

- Re-read the relevant section of `PRD.md`.
- Prefer adding to `lib/` over expanding component files.
- Prefer Zustand actions over component-local state.
- Smaller, type-safe diffs over clever ones.
