export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const PROJECT_IMAGES = {
  living: {
    src: "/images/progetti/living-equilibrio-naturale.webp",
    alt: "Living dai toni naturali, con libreria bianca, poltrona e materiali morbidi",
    width: 1024,
    height: 1536,
  },
  bagno: {
    src: "/images/progetti/bagno-materia-e-luce.webp",
    alt: "Bagno con materiali caldi, toni continui e luce integrata",
    width: 993,
    height: 1234,
  },
} satisfies Record<string, SiteImage>;

export const HERO_SLIDES: SiteImage[] = [PROJECT_IMAGES.living, PROJECT_IMAGES.bagno];

export const MOODBOARDS: SiteImage[] = [
  "Travertino, legno chiaro e metallo brunito",
  "Terracotta, legno scuro, lino e verde salvia",
  "Lino oliva, legno di rovere e intonaco avorio",
  "Terracotta, ottone, sabbia e legno naturale",
  "Marmo verde, noce, salvia e acciaio spazzolato",
  "Noce, bronzo, lino grigio e pietra chiara",
  "Marmo calacatta, rovere a spina, paglia di Vienna e prugna",
  "Noce, travertino, ottone e pavimento a scacchi",
].map((theme, i) => ({
  src: `/images/moodboard/moodboard-${String(i + 1).padStart(2, "0")}.webp`,
  alt: `Moodboard di colori e materiali: ${theme.toLowerCase()}`,
  width: 420,
  height: 530,
}));

export const REELS = [
  "Come scegliere il divano",
  "Piante: quali scegliere?",
  "Le nostre case ci fanno stare davvero insieme?",
  "Isola cucina",
  "Sì o no?",
  "Come scegliere i colori",
].map((title, i) => ({
  title,
  src: `/images/reel/reel-${String(i + 1).padStart(2, "0")}.jpg`,
}));

export const PORTRAIT: SiteImage = {
  src: "/images/marianna-mancini.webp",
  alt: "Marianna Mancini, interior designer",
  width: 431,
  height: 914,
};
