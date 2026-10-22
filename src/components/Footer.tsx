import Link from "next/link";
import { SITE } from "@/lib/site";
import { Lockup } from "./brand/Logo";

export function Footer() {
  return (
    <footer id="contatti" className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <Link className="footer-logo" href="/" aria-label="Marianna Interiors, torna alla home">
            <Lockup tone="dark" />
          </Link>
          <address className="footer-contacts">
            <p className="footer-label">Contatti</p>
            <p>
              {SITE.owner.name} · Interior Designer
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Instagram @{SITE.handle}
              </a>
              <br />
              P. IVA {SITE.vat}
            </p>
          </address>
        </div>
        <div className="footer-copyright">
          <span>
            © {SITE.copyrightYear} {SITE.handle}
          </span>
          <Link href="/condizioni-di-vendita">Condizioni di vendita</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
