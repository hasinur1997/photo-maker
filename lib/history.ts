import { useCallback, useRef } from "react";
import { useEditor } from "./store";

/**
 * Returns a debounced version of _pushHistory.
 * Sliders call this on every tick; the history entry is only written
 * 400ms after the user stops adjusting.
 */
export function useDebouncedHistoryPush(delayMs = 400): () => void {
  const pushHistory = useEditor((s) => s._pushHistory);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      pushHistory();
    }, delayMs);
  }, [pushHistory, delayMs]);
}
