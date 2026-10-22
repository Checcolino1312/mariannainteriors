"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Lockup } from "./brand/Logo";

const NAV = [
  { href: "/#servizi", label: "Servizi" },
  { href: "/#chi-sono", label: "Chi sono" },
  { href: "/#contatti", label: "Contattami" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  // In home l'header resta trasparente sopra l'intro e diventa materico quando la si supera.
  const [overIntro, setOverIntro] = useState(true);
  const transparent = isHome && overIntro && !open;

  useEffect(() => {
    if (!isHome) return;
    const intro = document.getElementById("intro");
    if (!intro) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setOverIntro(intro.getBoundingClientRect().bottom > 96);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header" data-over-intro={transparent ? "true" : "false"}>
      <div className="wrap header-inner">
        <Link className="header-logo" href="/" aria-label="Marianna Interiors, vai alla home" onClick={() => setOpen(false)}>
          <Lockup tone="light" />
        </Link>
        <button
          className="menu"
          type="button"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-icon" aria-hidden="true" />
          <span>{open ? "Chiudi" : "Menu"}</span>
        </button>
        <nav id="nav" className={`nav${open ? " open" : ""}`} aria-label="Navigazione principale">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
