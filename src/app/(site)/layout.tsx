import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/SiteShell";
import { getSettings } from "@/lib/cms";
import { LOCALE, OG_IMAGE, SITE_URL } from "@/lib/site";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: s.title, template: `%s | ${s.name}` },
    description: s.description,
    applicationName: s.name,
    authors: [{ name: s.ownerName, url: SITE_URL }],
    creator: s.ownerName,
    publisher: s.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: LOCALE,
      url: "/",
      siteName: s.name,
      title: s.title,
      description: s.description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: [OG_IMAGE] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    formatDetection: { telephone: false },
    category: "interior design",
  };
}

export const viewport: Viewport = {
  themeColor: "#EEE9E2",
  colorScheme: "light",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
