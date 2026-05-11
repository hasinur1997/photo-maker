// Bundled snapshot of Google Fonts metadata.
// Re-generate with: node scripts/fetch-fonts.mjs
// Last updated: 2025-05

export type GoogleFontItem = {
  family: string;
  category: "sans-serif" | "serif" | "monospace" | "display" | "handwriting";
  variants: string[]; // e.g. ["100","300","regular","700","italic","700italic"]
  subsets: string[];
};

export const GOOGLE_FONTS: GoogleFontItem[] = [
  // ── Sans-serif ──────────────────────────────────────────────────────────────
  { family: "Inter", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext"] },
  { family: "Roboto", category: "sans-serif", variants: ["100","300","regular","500","700","900","100italic","300italic","italic","500italic","700italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Open Sans", category: "sans-serif", variants: ["300","regular","500","600","700","800","300italic","italic","500italic","600italic","700italic","800italic"], subsets: ["latin","latin-ext","cyrillic","greek"] },
  { family: "Lato", category: "sans-serif", variants: ["100","300","regular","700","900","100italic","300italic","italic","700italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Montserrat", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Poppins", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","devanagari"] },
  { family: "Raleway", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Nunito", category: "sans-serif", variants: ["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Nunito Sans", category: "sans-serif", variants: ["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Oswald", category: "sans-serif", variants: ["200","300","regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Ubuntu", category: "sans-serif", variants: ["300","regular","500","700","300italic","italic","500italic","700italic"], subsets: ["latin","latin-ext","cyrillic","greek"] },
  { family: "Mukta", category: "sans-serif", variants: ["200","300","regular","500","600","700","800"], subsets: ["latin","devanagari"] },
  { family: "Noto Sans", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic","greek","devanagari"] },
  { family: "Work Sans", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Rubik", category: "sans-serif", variants: ["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","hebrew","cyrillic","arabic"] },
  { family: "DM Sans", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Figtree", category: "sans-serif", variants: ["300","regular","500","600","700","800","900","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Plus Jakarta Sans", category: "sans-serif", variants: ["200","300","regular","500","600","700","800","200italic","300italic","italic","500italic","600italic","700italic","800italic"], subsets: ["latin","latin-ext"] },
  { family: "Outfit", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext"] },
  { family: "Barlow", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Barlow Condensed", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext"] },
  { family: "Exo 2", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Quicksand", category: "sans-serif", variants: ["300","regular","500","600","700"], subsets: ["latin","latin-ext","vietnamese"] },
  { family: "Josefin Sans", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"], subsets: ["latin","latin-ext"] },
  { family: "Lexend", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","vietnamese"] },
  { family: "Manrope", category: "sans-serif", variants: ["200","300","regular","500","600","700","800"], subsets: ["latin","latin-ext","cyrillic"] },

  // ── Serif ────────────────────────────────────────────────────────────────────
  { family: "Playfair Display", category: "serif", variants: ["regular","500","600","700","800","900","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Merriweather", category: "serif", variants: ["300","regular","700","900","300italic","italic","700italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Lora", category: "serif", variants: ["regular","500","600","700","italic","500italic","600italic","700italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "PT Serif", category: "serif", variants: ["regular","700","italic","700italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Libre Baskerville", category: "serif", variants: ["regular","700","italic"], subsets: ["latin","latin-ext"] },
  { family: "EB Garamond", category: "serif", variants: ["regular","500","600","700","800","italic","500italic","600italic","700italic","800italic"], subsets: ["latin","latin-ext","cyrillic","greek"] },
  { family: "Cormorant Garamond", category: "serif", variants: ["300","regular","500","600","700","300italic","italic","500italic","600italic","700italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Crimson Text", category: "serif", variants: ["regular","600","700","italic","600italic","700italic"], subsets: ["latin","latin-ext"] },
  { family: "Noto Serif", category: "serif", variants: ["regular","700","italic","700italic"], subsets: ["latin","latin-ext","cyrillic","greek","devanagari"] },
  { family: "Source Serif 4", category: "serif", variants: ["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Bitter", category: "serif", variants: ["100","200","300","regular","500","600","700","800","900","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },

  // ── Monospace ────────────────────────────────────────────────────────────────
  { family: "Roboto Mono", category: "monospace", variants: ["100","200","300","regular","500","600","700","100italic","200italic","300italic","italic","500italic","600italic","700italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Source Code Pro", category: "monospace", variants: ["200","300","regular","500","600","700","800","900","200italic","300italic","italic","500italic","600italic","700italic","800italic","900italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "JetBrains Mono", category: "monospace", variants: ["100","200","300","regular","500","600","700","800","100italic","200italic","300italic","italic","500italic","600italic","700italic","800italic"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Fira Code", category: "monospace", variants: ["300","regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic","greek"] },
  { family: "Space Mono", category: "monospace", variants: ["regular","700","italic","700italic"], subsets: ["latin","latin-ext"] },

  // ── Display ─────────────────────────────────────────────────────────────────
  { family: "Anton", category: "display", variants: ["regular"], subsets: ["latin","latin-ext","vietnamese"] },
  { family: "Bebas Neue", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Fjalla One", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Righteous", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Alfa Slab One", category: "display", variants: ["regular"], subsets: ["latin","latin-ext","vietnamese"] },
  { family: "Lobster", category: "display", variants: ["regular"], subsets: ["latin","latin-ext","cyrillic","vietnamese"] },
  { family: "Lobster Two", category: "display", variants: ["regular","700","italic","700italic"], subsets: ["latin","latin-ext"] },
  { family: "Abril Fatface", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Calistoga", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Titan One", category: "display", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Black Han Sans", category: "sans-serif", variants: ["regular"], subsets: ["latin","korean"] },
  { family: "Big Shoulders Display", category: "display", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","latin-ext","vietnamese"] },
  { family: "Syne", category: "sans-serif", variants: ["regular","500","600","700","800"], subsets: ["latin","latin-ext","greek"] },

  // ── Handwriting ──────────────────────────────────────────────────────────────
  { family: "Dancing Script", category: "handwriting", variants: ["regular","500","600","700"], subsets: ["latin","latin-ext","vietnamese"] },
  { family: "Pacifico", category: "handwriting", variants: ["regular"], subsets: ["latin","latin-ext","cyrillic","vietnamese"] },
  { family: "Caveat", category: "handwriting", variants: ["regular","500","600","700"], subsets: ["latin","latin-ext","cyrillic"] },
  { family: "Indie Flower", category: "handwriting", variants: ["regular"], subsets: ["latin"] },
  { family: "Satisfy", category: "handwriting", variants: ["regular"], subsets: ["latin"] },
  { family: "Kalam", category: "handwriting", variants: ["300","regular","700"], subsets: ["latin","devanagari"] },
  { family: "Amatic SC", category: "handwriting", variants: ["regular","700"], subsets: ["latin","latin-ext","cyrillic","hebrew"] },
  { family: "Sacramento", category: "handwriting", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Great Vibes", category: "handwriting", variants: ["regular"], subsets: ["latin","latin-ext"] },
  { family: "Courgette", category: "handwriting", variants: ["regular"], subsets: ["latin","latin-ext"] },

  // ── Bengali / South Asian ────────────────────────────────────────────────────
  { family: "Hind Siliguri", category: "sans-serif", variants: ["300","regular","500","600","700"], subsets: ["latin","bengali"] },
  { family: "Galada", category: "display", variants: ["regular"], subsets: ["latin","bengali"] },
  { family: "Anek Bangla", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800"], subsets: ["latin","bengali"] },
  { family: "Baloo Da 2", category: "display", variants: ["regular","500","600","700","800"], subsets: ["latin","latin-ext","bengali"] },
  { family: "Noto Sans Bengali", category: "sans-serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","bengali"] },
  { family: "Noto Serif Bengali", category: "serif", variants: ["100","200","300","regular","500","600","700","800","900"], subsets: ["latin","bengali"] },
  { family: "Mitra Mono", category: "monospace", variants: ["regular"], subsets: ["latin","bengali"] },
];

/** Weights available for a given font family (as numbers). */
export function getAvailableWeights(family: string): number[] {
  const font = GOOGLE_FONTS.find((f) => f.family === family);
  if (!font) return [400];
  return font.variants
    .filter((v) => !v.includes("italic"))
    .map((v) => (v === "regular" ? 400 : parseInt(v, 10)))
    .filter(Boolean)
    .sort((a, b) => a - b);
}
