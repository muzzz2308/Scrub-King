import king from "/King.webp";
import queen from "/Queen.webp";

export const products = [
  {
    slug: "scrub-king",
    name: "Scrub King",
    tagline: "Dual-Texture Scrubber",
    price: 199,
    compareAt: 249,
    image: king,
    accent: "king",
    blurb:
      "Soft in warm water, firm in cool water. The shape-shifting scrubber that reads the room and never scratches your pans.",
    perks: [
      "Scratch free on every surface",
      "Resists odors for weeks",
      "Rinses clean in seconds",
    ],
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
    price: 199,
    compareAt: 249,
    image: queen,
    accent: "queen",
    blurb:
      "Scrubber on one side, super-soft absorbent sponge on the other. One flip and the whole counter is spotless.",
    perks: [
      "Super soft & absorbent",
      "Scratch free & resists odors",
      "Two tools in one flip",
    ],
    specs: [
      { label: "Texture", value: "Scrub / Sponge" },
      { label: "Best for", value: "Counters, sinks, dishes" },
      { label: "Lifespan", value: "~2 months" },
    ],
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const packs = [
  {
    id: "king-1",
    name: "Scrub King · Single",
    subtitle: "1 × Scrub King",
    price: 199,
    pieces: 1,
    contents: ["scrub-king"],
    belongsTo: "scrub-king",
  },
  {
    id: "queen-1",
    name: "Scrub Queen · Single",
    subtitle: "1 × Scrub Queen",
    price: 199,
    pieces: 1,
    contents: ["scrub-queen"],
    belongsTo: "scrub-queen",
  },
  {
    id: "duo",
    name: "The Duo",
    subtitle: "1 × King + 1 × Queen",
    price: 375,
    pieces: 2,
    contents: ["scrub-king", "scrub-queen"],
    belongsTo: "mix",
    badge: "Best starter",
  },
  {
    id: "trio",
    name: "Pack of 3",
    subtitle: "King + Queen mix, 3 pieces",
    price: 549,
    pieces: 3,
    contents: ["scrub-king", "scrub-queen", "scrub-king"],
    belongsTo: "mix",
  },
  {
    id: "family-4",
    name: "Family Pack of 4",
    subtitle: "2 × King + 2 × Queen",
    price: 719,
    pieces: 4,
    contents: ["scrub-king", "scrub-queen", "scrub-king", "scrub-queen"],
    belongsTo: "mix",
    badge: "Most popular",
  },
  {
    id: "king-5",
    name: "Pack of 5 · Scrub King",
    subtitle: "5 × Scrub King",
    price: 899,
    pieces: 5,
    contents: ["scrub-king"],
    belongsTo: "scrub-king",
    badge: "Best value",
  },
  {
    id: "queen-5",
    name: "Pack of 5 · Scrub Queen",
    subtitle: "5 × Scrub Queen",
    price: 899,
    pieces: 5,
    contents: ["scrub-queen"],
    belongsTo: "scrub-queen",
    badge: "Best value",
  },
];

export const getPack = (id) => packs.find((p) => p.id === id);

export const packsFor = (slug) => packs.filter((p) => p.belongsTo === slug);

export const mixPacks = packs.filter((p) => p.belongsTo === "mix");

export const SINGLE_PRICE = 199;

export const formatPkr = (n) =>
  `Rs ${n.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;

/** price per piece, for "save" messaging */
export const perPiece = (pack) => pack.price / pack.pieces;
export const savings = (pack) => pack.pieces * SINGLE_PRICE - pack.price;
