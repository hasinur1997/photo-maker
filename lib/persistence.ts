import { useEffect } from "react";
import { toast } from "sonner";
import { useEditor, type ContentSnapshot } from "./store";

// ─── Config ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = "pfm:editor:v1";
const THROTTLE_MS = 500;
const MAX_BYTES = 4.5 * 1024 * 1024; // 4.5 MB
const MAX_PHOTO_DIM = 1080;

// ─── Photo downscaling ────────────────────────────────────────────────────────

async function downscalePhoto(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_PHOTO_DIM / img.width, MAX_PHOTO_DIM / img.height);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")?.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

// ─── Save ─────────────────────────────────────────────────────────────────────

let saveTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSave(snapshot: ContentSnapshot): void {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => void flushSave(snapshot), THROTTLE_MS);
}

async function flushSave(snapshot: ContentSnapshot): Promise<void> {
  try {
    let serialized = JSON.stringify(snapshot);

    if (serialized.length > MAX_BYTES) {
      if (snapshot.photo?.src) {
        const smaller = await downscalePhoto(snapshot.photo.src);
        const patched: ContentSnapshot = { ...snapshot, photo: { src: smaller } };
        serialized = JSON.stringify(patched);
      }
      if (serialized.length > MAX_BYTES) {
        toast.warning("Photo too large to save", {
          description: "Your work is not persisted. Try a smaller photo.",
        });
        return;
      }
    }

    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    toast.error("Could not save", {
      description: "localStorage may be full. Try clearing some browser data.",
    });
  }
}

// ─── Load ─────────────────────────────────────────────────────────────────────

function isValidSnapshot(v: unknown): v is ContentSnapshot {
  if (!v || typeof v !== "object") return false;
  const s = v as Record<string, unknown>;
  return (
    typeof s.frameId === "string" &&
    s.frameCustomization !== undefined &&
    Array.isArray(s.textLayers)
  );
}

export function loadFromLocalStorage(): ContentSnapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidSnapshot(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

// ─── React hook ───────────────────────────────────────────────────────────────

export function usePersistence(): void {
  useEffect(() => {
    const unsub = useEditor.subscribe((state) => {
      scheduleSave({
        photo: state.photo,
        frameId: state.frameId,
        frameCustomization: state.frameCustomization,
        textLayers: state.textLayers,
      });
    });
    return unsub;
  }, []);
}
