import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import type {
  ActiveTool,
  EditorState,
  FrameCustomization,
  TextLayer,
} from "./types";

// ─── Constants ────────────────────────────────────────────────────────────────

const HISTORY_LIMIT = 50;

export const DEFAULT_FRAME_CUSTOMIZATION: FrameCustomization = {
  borderColor: "#ffffff",
  borderWidth: 0,
  opacity: 1,
  shadow: {
    enabled: false,
    x: 0,
    y: 4,
    blur: 16,
    spread: 0,
    color: "rgba(0,0,0,0.3)",
  },
};

const DEFAULT_TEXT_LAYER: Omit<TextLayer, "id"> = {
  text: "Your text",
  x: 300, // (1080 - 480) / 2
  y: 465, // (1080 - 150) / 2
  width: 480,
  height: 150,
  rotation: 0,
  fontFamily: "Inter",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: 48,
  color: "#000000",
  textAlign: "center",
  lineHeight: 1.4,
  letterSpacing: 0,
  underline: false,
};

const INITIAL_STATE: EditorState = {
  canvas: { width: 1080, height: 1080 },
  photo: null,
  frameId: "default",
  frameCustomization: DEFAULT_FRAME_CUSTOMIZATION,
  textLayers: [],
  selectedLayerId: null,
  activeTool: null,
};

// ─── History snapshot (content only — not UI state) ───────────────────────────

export type ContentSnapshot = Pick<
  EditorState,
  "photo" | "frameId" | "frameCustomization" | "textLayers"
>;

function takeSnapshot(s: EditorState): ContentSnapshot {
  return {
    photo: s.photo,
    frameId: s.frameId,
    frameCustomization: structuredClone(s.frameCustomization),
    textLayers: structuredClone(s.textLayers),
  };
}

// ─── Store type ───────────────────────────────────────────────────────────────

type FrameCustomizationPatch = Omit<Partial<FrameCustomization>, "shadow"> & {
  shadow?: Partial<FrameCustomization["shadow"]>;
};

type Store = EditorState & {
  _past: ContentSnapshot[];
  _future: ContentSnapshot[];

  // ── Actions ──────────────────────────────────────────────────────────────
  setPhoto: (src: string) => void;
  clearPhoto: () => void;
  /** setFrame resets customization to defaults; pass the frame's defaultCustomization from the registry (wired in Step 6). */
  setFrame: (frameId: string, defaults?: FrameCustomization) => void;
  updateFrameCustomization: (patch: FrameCustomizationPatch) => void;
  /** Adds a new text layer and selects it. Returns the layer's id.
   *  Pass `slotId` to use a stable ID (for frame text slots). */
  addTextLayer: (partial?: Partial<Omit<TextLayer, "id">>, slotId?: string) => string;
  updateTextLayer: (id: string, partial: Partial<Omit<TextLayer, "id">>) => void;
  deleteTextLayer: (id: string) => void;
  duplicateTextLayer: (id: string) => void;
  moveLayerUp: (id: string) => void;
  moveLayerDown: (id: string) => void;
  selectLayer: (id: string | null) => void;
  setActiveTool: (tool: ActiveTool) => void;
  loadFromStorage: (snapshot: ContentSnapshot) => void;
  resetEditor: () => void;
  undo: () => void;
  redo: () => void;
  /** Push current content to undo history. Called by actions that mutate content. Debounced calls are set up in Step 12. */
  _pushHistory: () => void;
  // ── Export modal ──────────────────────────────────────────────────────────
  exportOpen: boolean;
  openExport: () => void;
  closeExport: () => void;
};

// ─── Store ────────────────────────────────────────────────────────────────────

const useEditorStore = create<Store>()(
  immer((set, get) => ({
    ...INITIAL_STATE,
    _past: [],
    _future: [],
    exportOpen: false,
    openExport() { set((d) => { d.exportOpen = true; }); },
    closeExport() { set((d) => { d.exportOpen = false; }); },

    _pushHistory() {
      const snap = takeSnapshot(get());
      set((draft) => {
        if (draft._past.length >= HISTORY_LIMIT) draft._past.shift();
        draft._past.push(snap as ContentSnapshot);
        draft._future = [];
      });
    },

    setPhoto(src) {
      get()._pushHistory();
      set((draft) => {
        draft.photo = { src };
      });
    },

    clearPhoto() {
      get()._pushHistory();
      set((draft) => {
        draft.photo = null;
      });
    },

    setFrame(frameId, defaults = DEFAULT_FRAME_CUSTOMIZATION) {
      get()._pushHistory();
      set((draft) => {
        draft.frameId = frameId;
        draft.frameCustomization = defaults as FrameCustomization;
      });
    },

    updateFrameCustomization(patch) {
      // History push is debounced 400ms from Step 12; called directly here for now.
      set((draft) => {
        const c = draft.frameCustomization;
        if (patch.borderColor !== undefined) c.borderColor = patch.borderColor;
        if (patch.borderWidth !== undefined) c.borderWidth = patch.borderWidth;
        if (patch.opacity !== undefined) c.opacity = patch.opacity;
        if (patch.shadow) Object.assign(c.shadow, patch.shadow);
      });
    },

    addTextLayer(partial, slotId) {
      const id = slotId ?? nanoid();
      get()._pushHistory();
      set((draft) => {
        draft.textLayers.push({ ...DEFAULT_TEXT_LAYER, ...partial, id } as TextLayer);
        draft.selectedLayerId = id;
      });
      return id;
    },

    updateTextLayer(id, partial) {
      set((draft) => {
        const layer = draft.textLayers.find((l) => l.id === id);
        if (layer) Object.assign(layer, partial);
      });
    },

    deleteTextLayer(id) {
      get()._pushHistory();
      set((draft) => {
        draft.textLayers = draft.textLayers.filter((l) => l.id !== id);
        if (draft.selectedLayerId === id) draft.selectedLayerId = null;
      });
    },

    duplicateTextLayer(id) {
      const src = get().textLayers.find((l) => l.id === id);
      if (!src) return;
      const newId = nanoid();
      get()._pushHistory();
      set((draft) => {
        const clone = { ...structuredClone(src), id: newId, x: src.x + 20, y: src.y + 20 };
        draft.textLayers.push(clone as TextLayer);
        draft.selectedLayerId = newId;
      });
    },

    moveLayerUp(id) {
      get()._pushHistory();
      set((draft) => {
        const i = draft.textLayers.findIndex((l) => l.id === id);
        if (i < draft.textLayers.length - 1) {
          [draft.textLayers[i], draft.textLayers[i + 1]] = [draft.textLayers[i + 1], draft.textLayers[i]];
        }
      });
    },

    moveLayerDown(id) {
      get()._pushHistory();
      set((draft) => {
        const i = draft.textLayers.findIndex((l) => l.id === id);
        if (i > 0) {
          [draft.textLayers[i], draft.textLayers[i - 1]] = [draft.textLayers[i - 1], draft.textLayers[i]];
        }
      });
    },

    selectLayer(id) {
      // Not a history event
      set((draft) => {
        draft.selectedLayerId = id;
      });
    },

    setActiveTool(tool) {
      // Not a history event
      set((draft) => {
        draft.activeTool = tool;
      });
    },

    loadFromStorage(snapshot) {
      set((draft) => {
        draft.photo = snapshot.photo;
        draft.frameId = snapshot.frameId;
        draft.frameCustomization = snapshot.frameCustomization as FrameCustomization;
        draft.textLayers = snapshot.textLayers as TextLayer[];
      });
    },

    resetEditor() {
      set((draft) => {
        Object.assign(draft, INITIAL_STATE);
        draft._past = [];
        draft._future = [];
      });
    },

    undo() {
      const { _past } = get();
      if (_past.length === 0) return;
      const snap = takeSnapshot(get());
      set((draft) => {
        draft._future.unshift(snap as ContentSnapshot);
        const prev = draft._past.pop()!;
        draft.photo = prev.photo;
        draft.frameId = prev.frameId;
        draft.frameCustomization = prev.frameCustomization as FrameCustomization;
        draft.textLayers = prev.textLayers as TextLayer[];
        draft.selectedLayerId = null;
      });
    },

    redo() {
      const { _future } = get();
      if (_future.length === 0) return;
      const snap = takeSnapshot(get());
      set((draft) => {
        draft._past.push(snap as ContentSnapshot);
        if (draft._past.length > HISTORY_LIMIT) draft._past.shift();
        const next = draft._future.shift()!;
        draft.photo = next.photo;
        draft.frameId = next.frameId;
        draft.frameCustomization = next.frameCustomization as FrameCustomization;
        draft.textLayers = next.textLayers as TextLayer[];
        draft.selectedLayerId = null;
      });
    },
  }))
);

export const useEditor = useEditorStore;
