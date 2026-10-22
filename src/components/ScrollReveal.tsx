"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Comparsa morbida degli elementi [data-reveal] quando entrano nel viewport.
 * Senza JavaScript (o con prefers-reduced-motion) i contenuti restano sempre visibili:
 * la classe `reveal-ready` che li nasconde viene aggiunta solo qui.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    // Ciò che è già in vista non deve lampeggiare.
    for (const el of items) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
    }
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => !el.classList.contains("is-visible") && observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
