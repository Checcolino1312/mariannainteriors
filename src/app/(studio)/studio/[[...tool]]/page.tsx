"use client";

/**
 * Sanity Studio incorporato nel sito, su /studio: qui Marianna modifica i contenuti.
 * La rotta è catch-all perché lo Studio gestisce la propria navigazione interna.
 * `'use client'` è necessario: lo Studio usa API React disponibili solo nel browser.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
