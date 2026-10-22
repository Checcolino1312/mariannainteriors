import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYou, ThankYouContent } from "./ThankYou";

// Pagina di arrivo dopo il pagamento (Stripe) o la prenotazione (Cal.com): non va indicizzata.
export const metadata: Metadata = {
  title: "Grazie",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="page-offset">
      <article className="wrap legal thank-you" data-reveal-group>
        <Suspense fallback={<ThankYouContent />}>
          <ThankYou />
        </Suspense>
      </article>
    </div>
  );
}
