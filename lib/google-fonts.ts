import type WebFont from "webfontloader";

const loaded = new Set<string>();
let _WebFont: typeof WebFont | null = null;

async function getWebFont(): Promise<typeof WebFont> {
  if (_WebFont) return _WebFont;
  const mod = await import("webfontloader");
  _WebFont = mod.default ?? (mod as unknown as typeof WebFont);
  return _WebFont;
}

/**
 * Dynamically load a Google Font family at specific weights.
 * Safe to call multiple times — already-loaded families are skipped.
 */
export async function loadFont(family: string, weights: number[] = [400]): Promise<void> {
  const key = `${family}:${weights.sort().join(",")}`;
  if (loaded.has(key)) return;

  return new Promise<void>(async (resolve) => {
    const wf = await getWebFont();
    const weightStr = weights
      .map((w) => (w === 400 ? "regular" : String(w)))
      .join(",");
    wf.load({
      google: { families: [`${family}:${weightStr}`] },
      active: () => {
        loaded.add(key);
        resolve();
      },
      inactive: () => {
        // Font failed to load — resolve anyway so callers don't hang
        resolve();
      },
    });
  });
}

/** Check if a family (at any weight) has been loaded. */
export function isFontLoaded(family: string): boolean {
  for (const key of loaded) {
    if (key.startsWith(`${family}:`)) return true;
  }
  return false;
}
