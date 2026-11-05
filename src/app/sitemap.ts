import type { MetadataRoute } from "next";
import { servicePath } from "@/content/services";
import { getServices } from "@/lib/cms";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: absoluteUrl(servicePath(s)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/condizioni-di-vendita"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
