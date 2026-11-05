"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** I link condivisi della bozza (/#servizio/mappa) portano alle nuove pagine dei servizi. */
export function LegacyHashRedirect({ hashes }: { hashes: Record<string, string> }) {
  const router = useRouter();
  useEffect(() => {
    const target = hashes[window.location.hash];
    if (target) router.replace(target);
  }, [router, hashes]);
  return null;
}
