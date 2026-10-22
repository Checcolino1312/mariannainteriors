"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LEGACY_HASHES } from "@/content/services";

/** I link condivisi della bozza (/#servizio/mappa) portano alle nuove pagine dei servizi. */
export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const target = LEGACY_HASHES[window.location.hash];
    if (target) router.replace(target);
  }, [router]);
  return null;
}
