import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
};

/**
 * Subtle 320ms opacity + 4px translateY reveal. Uses the `editorial-fade`
 * utility from styles.css. Stagger by passing `delay` on siblings.
 */
export function FadeIn({ children, delay = 0, className }: Props) {
  const style: CSSProperties = { animationDelay: `${delay}ms` };
  return (
    <div className={`editorial-fade ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
