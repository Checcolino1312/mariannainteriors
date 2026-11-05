import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Motori di ricerca e assistenti AI sono esplicitamente ammessi: il sito vuole essere trovato e citato.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Studio (area riservata a Marianna) e webhook non vanno nei risultati
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/studio", "/api/"] },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
