import Link from "next/link";
import type { Settings } from "@/content/types";
import { Lockup } from "./brand/Logo";

export function Footer({ settings: s }: { settings: Settings }) {
  return (
    <footer id="contatti" className="footer">
      <div className="footer-inner">
        <div className="footer-main" data-reveal>
          <Link className="footer-logo" href="/" aria-label={`${s.name}, torna alla home`}>
            <Lockup tone="dark" />
          </Link>
          <address className="footer-contacts">
            <p className="footer-label">Contatti</p>
            <p>
              {s.ownerName} · {s.ownerRole}
              <br />
              <a href={`mailto:${s.email}`}>{s.email}</a>
              <br />
              <a href={s.instagram} target="_blank" rel="noopener noreferrer">
                Instagram @{s.handle}
              </a>
              <br />
              P. IVA {s.vat}
            </p>
          </address>
        </div>
        <div className="footer-copyright">
          <span>
            © {s.copyrightYear} {s.handle}
          </span>
          <Link href="/condizioni-di-vendita">Condizioni di vendita</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
