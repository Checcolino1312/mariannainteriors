import type { SVGProps } from "react";
import { MONOGRAM, WORDMARK } from "./paths";

type SvgProps = Omit<SVGProps<SVGSVGElement>, "viewBox">;

/** Pittogramma "im". Il punto e l'asta+m sono tracciati separati per poterli animare. */
export function Monogram({ title, ...props }: SvgProps & { title?: string }) {
  return (
    <svg
      viewBox={MONOGRAM.viewBox}
      fill="currentColor"
      fillRule="evenodd"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path className="monogram-dot" d={MONOGRAM.dot} />
      <path className="monogram-body" d={MONOGRAM.body} pathLength={1} />
    </svg>
  );
}

/** "marianna.interiors" + payoff "ARCHITETTURA E PERCEZIONE" (Montserrat, tracciati dal logo ufficiale). */
export function Wordmark({ title, ...props }: SvgProps & { title?: string }) {
  return (
    <svg
      viewBox={WORDMARK.viewBox}
      fillRule="evenodd"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path className="wordmark-name" d={WORDMARK.name} />
      <path className="wordmark-payoff" d={WORDMARK.payoff} />
    </svg>
  );
}

/**
 * Lockup orizzontale per header e footer.
 * tone="light": su fondi scuri/materici (pittogramma e wordmark beige, payoff burro).
 * tone="dark": su beige (pittogramma terracotta, wordmark noce, payoff terracotta).
 */
export function Lockup({ tone, className = "" }: { tone: "light" | "dark"; className?: string }) {
  return (
    <span className={`lockup lockup--${tone} ${className}`}>
      <Monogram className="lockup-monogram" />
      <Wordmark className="lockup-wordmark" />
    </span>
  );
}
