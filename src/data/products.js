import king from "/King.webp";
import queen from "/Queen.webp";

export const products = [
  {
    slug: "scrub-king",
    name: "Scrub King",
    tagline: "Dual-Texture Scrubber",
    price: 8.99,
    compareAt: 11.99,
    image: king,
    accent: "king",
    blurb:
      "Soft in warm water, firm in cool water. The shape-shifting scrubber that reads the room and never scratches your pans.",
    perks: ["Scratch free on every surface", "Resists odors for weeks", "Rinses clean in seconds"],
    specs: [
      { label: "Texture", value: "Soft / Firm" },
      { label: "Best for", value: "Pots, pans, glass" },
      { label: "Lifespan", value: "~2 months" },
    ],
  },
  {
    slug: "scrub-queen",
    name: "Scrub Queen",
    tagline: "Dual-Sided Scrubber + Sponge",
    price: 9.99,
    compareAt: 12.99,
    image: queen,
    accent: "queen",
    blurb:
      "Scrubber on one side, super-soft absorbent sponge on the other. One flip and the whole counter is spotless.",
    perks: ["Super soft & absorbent", "Scratch free & resists odors", "Two tools in one flip"],
    specs: [
      { label: "Texture", value: "Scrub / Sponge" },
      { label: "Best for", value: "Counters, sinks, dishes" },
      { label: "Lifespan", value: "~2 months" },
    ],
  },
];
