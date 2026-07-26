import { useTypewriter } from "@/hooks/useTypewriter";

type Props = {
  text: string;
  className?: string;
  speedMs?: number;
  onDone?: () => void;
};

/**
 * Editorial typewriter. Fast, no cursor. Re-mounts on `text` change via `key`
 * at the call site if you want to reset explicitly.
 */
export function Typewriter({ text, className, speedMs = 22, onDone }: Props) {
  const { shown, done } = useTypewriter(text, speedMs);

  if (done && onDone) {
    // Fire on the tail render — safe because `done` becomes true only once per text.
    queueMicrotask(onDone);
  }

  return <span className={className}>{shown}</span>;
}
