import type { Metadata } from "next";
import { Suspense } from "react";
import { getSettings, getThankYou } from "@/lib/cms";
import { ThankYou, ThankYouContent } from "./ThankYou";

// Pagina di arrivo dopo il pagamento (Stripe) o la prenotazione (Cal.com): non va indicizzata.
export const metadata: Metadata = {
  title: "Grazie",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const [content, settings] = await Promise.all([getThankYou(), getSettings()]);
  return (
    <div className="page-offset">
      <article className="wrap legal thank-you" data-reveal-group>
        <Suspense fallback={<ThankYouContent content={content} email={settings.email} />}>
          <ThankYou content={content} email={settings.email} />
        </Suspense>
      </article>
    </div>
  );
}
