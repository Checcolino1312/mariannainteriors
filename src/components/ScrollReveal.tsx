"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Animazioni d'ingresso quando gli elementi entrano nel viewport.
 *
 * - `data-reveal`            sale e compare in dissolvenza
 * - `data-reveal="fade"`     solo dissolvenza
 * - `data-reveal="image"`    l'immagine si scopre dal basso con un leggero zoom
 * - `data-reveal-group`      i figli diretti compaiono uno dopo l'altro (a cascata)
 *
 * La classe `reveal-ready`, che nasconde gli elementi in attesa, viene aggiunta da uno script
 * in <head> prima del primo disegno (vedi REVEAL_BOOT in layout.tsx): così anche ciò che è
 * già visibile al caricamento entra animato, senza sfarfallii. Senza JavaScript o con
 * "riduci movimento" la classe non c'è e tutto resta visibile.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __reveal?: boolean }).__reveal = true;
    if (!document.documentElement.classList.contains("reveal-ready")) return;

    for (const group of document.querySelectorAll<HTMLElement>("[data-reveal-group]")) {
      Array.from(group.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--i", String(Math.min(i, 8)));
      });
    }

    const items = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not(.is-visible), [data-reveal-group]:not(.is-visible)",
    );
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
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** Eseguito in <head> prima del rendering. Se l'app non parte entro 3,5 s, mostra comunque tutto. */
export const REVEAL_BOOT = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('reveal-ready');setTimeout(function(){if(!window.__reveal)d.classList.remove('reveal-ready')},3500)}catch(e){}})();`;
