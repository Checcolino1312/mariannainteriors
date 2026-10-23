"use client";

import { getCalApi } from "@calcom/embed-react";
import { useRef, type MouseEvent } from "react";
import { calUrl } from "@/lib/site";
import { ArrowUpRight } from "@/components/Icons";

const NAMESPACE = "consulenza";

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

/**
 * Pulsante "prenota e paga" della consulenza.
 * È un normale link alla pagina Cal.com (funziona anche senza JavaScript);
 * con JavaScript apre il calendario in un popup sul sito. Lo script di Cal.com
 * viene caricato solo quando l'utente si avvicina al pulsante, non all'apertura della pagina.
 */
export function BookConsultation({ calLink, label }: { calLink: string; label: string }) {
  const api = useRef<Promise<CalApi> | null>(null);
  const href = calUrl(calLink);

  const load = () => {
    if (!api.current) {
      api.current = getCalApi({ namespace: NAMESPACE }).then((cal) => {
        cal("ui", {
          theme: "light",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: {
            light: { "cal-brand": "#A26238", "cal-brand-emphasis": "#A26238", "cal-brand-text": "#F4E9B6" },
            dark: { "cal-brand": "#A26238" },
          },
        });
        // Fine prenotazione: il reindirizzo di Cal.com è solo nei piani a pagamento,
        // quindi è il sito a portare il cliente sulla pagina "Grazie" quando la prenotazione
        // è confermata (per gli eventi a pagamento: dopo il pagamento).
        cal("on", {
          action: "bookingSuccessfulV2",
          callback: (e) => {
            const { status, paymentRequired } = e.detail.data;
            if (paymentRequired && status?.toUpperCase() !== "ACCEPTED") return;
            // Navigazione completa voluta: Cal.com non espone un comando per chiudere il popup,
            // e ricaricare la pagina lo rimuove insieme ai blocchi di scroll che applica al body.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.assign("/grazie?servizio=consulenza");
          },
        });
        return cal;
      });
      api.current.catch(() => {
        api.current = null;
      });
    }
    return api.current;
  };

  const open = async (e: MouseEvent<HTMLAnchorElement>) => {
    // Clic con modificatori (nuova scheda ecc.): lascia fare al browser.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    try {
      const cal = await load();
      cal("modal", { calLink, config: { layout: "month_view" } });
    } catch {
      window.open(href, "_blank", "noopener");
    }
  };

  return (
    <a
      className="service-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={load}
      onFocus={load}
      onTouchStart={load}
      onClick={open}
    >
      {label}
      <ArrowUpRight className="arrow" />
    </a>
  );
}
