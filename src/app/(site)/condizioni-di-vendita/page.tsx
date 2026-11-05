import { LegalPage, legalMetadata } from "@/components/LegalPage";

// Il testo predefinito è una BOZZA (src/content/pages.ts): da far verificare a un consulente
// prima della pubblicazione, in particolare regime fiscale, annullamenti e rimborsi.
export const generateMetadata = () => legalMetadata("condizioni");

export default function TermsPage() {
  return <LegalPage kind="condizioni" />;
}
