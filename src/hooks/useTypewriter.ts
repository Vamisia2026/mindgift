import { useEffect, useState, useCallback } from "react";

/**
 * Fast, skippable typewriter reveal.
 * - Respects prefers-reduced-motion (renders instantly)
 * - Click or keydown anywhere completes it early
 * - Resets whenever `text` changes
 */
export function useTypewriter(text: string, speedMs = 22) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  const skip = useCallback(() => {
    setShown(text);
    setDone(true);
  }, [text]);

  useEffect(() => {
    if (!text) {
      setShown("");
      setDone(true);
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setShown(text);
      setDone(true);
      return;
    }

    setShown("");
    setDone(false);

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speedMs);

    return () => window.clearInterval(id);
  }, [text, speedMs]);

  // Global skip on click / key while animating
  useEffect(() => {
    if (done) return;
    const handler = () => skip();
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [done, skip]);

  return { shown, done, skip };
}
