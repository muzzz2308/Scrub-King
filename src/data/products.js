import king from "/Kingimg.webp";
import queen from "/Queenimg.webp";
import pack4 from "/pack4.webp";
import Squad from "/Squad.webp";

export const PRODUCT_CARD_IMAGES = {
  "scrub-king": king,
  "scrub-queen": queen,
};

export const PACK_CARD_IMAGES = {
  "family-4": pack4,
};

export function getProductCardImage(product) {
  if (product.image) return product.image;
  return PRODUCT_CARD_IMAGES[product.slug];
}

export function getPackCardImage(pack) {
  return pack.image ?? PACK_CARD_IMAGES[pack.id];
}

export const STATIC_PRODUCTS = [
  {
    slug: "scrub-king",
    name: "Scrub King",
    tagline: "Dual-Texture Scrubber",
    price: 250,
    compareAt: 299,
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
    ],
  },
  {
    slug: "scrub-queen",
    name: "Scrub Queen",
    tagline: "Dual-Sided Scrubber + Sponge",
    price: 250,
    compareAt: 299,
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
    ],
  },
];

export const STATIC_PACKS = [
  {
    id: "king-1",
    name: "Scrub King · Single",
    subtitle: "1 × Scrub King",
    price: 250,
    pieces: 1,
    contents: ["scrub-king"],
    belongsTo: "scrub-king",
  },
  {
    id: "queen-1",
    name: "Scrub Queen · Single",
    subtitle: "1 × Scrub Queen",
    price: 250,
    pieces: 1,
    contents: ["scrub-queen"],
    belongsTo: "scrub-queen",
  },
  {
    id: "duo",
    name: "The Duo",
    subtitle: "1 × King + 1 × Queen",
    price: 450,
    pieces: 2,
    contents: ["scrub-king", "scrub-queen"],
    belongsTo: "mix",
    badge: "Best starter",
    image: Squad,
  },
  {
    id: "family-4",
    name: "Family Pack of 4",
    subtitle: "2 × King + 2 × Queen",
    price: 899,
    pieces: 4,
    contents: ["scrub-king", "scrub-queen", "scrub-king", "scrub-queen"],
    belongsTo: "mix",
    badge: "Most popular",
    image: pack4,
  },
  {
    id: "family-6",
    name: "Family Pack of 6",
    subtitle: "3 × King + 3 × Queen",
    price: 1299,
    compareAt: 1499,
    pieces: 6,
    contents: [
      "scrub-king",
      "scrub-queen",
      "scrub-king",
      "scrub-queen",
      "scrub-king",
      "scrub-queen",
    ],
    belongsTo: "mix",
    badge: "Best value",
    image: Squad,
  },
  {
    id: "king-3",
    name: "Pack of 3 · Scrub King",
    subtitle: "3 × Scrub King",
    price: 699,
    pieces: 3,
    contents: ["scrub-king"],
    belongsTo: "scrub-king",
    badge: "Best value",
  },
  {
    id: "queen-3",
    name: "Pack of 3 · Scrub Queen",
    subtitle: "3 × Scrub Queen",
    price: 699,
    pieces: 3,
    contents: ["scrub-queen"],
    belongsTo: "scrub-queen",
    badge: "Best value",
  },
  {
    id: "king-5",
    name: "Pack of 5 · Scrub King",
    subtitle: "5 × Scrub King",
    price: 1149,
    pieces: 5,
    contents: ["scrub-king"],
    belongsTo: "scrub-king",
    badge: "Best value",
  },
  {
    id: "queen-5",
    name: "Pack of 5 · Scrub Queen",
    subtitle: "5 × Scrub Queen",
    price: 1149,
    pieces: 5,
    contents: ["scrub-queen"],
    belongsTo: "scrub-queen",
    badge: "Best value",
  },
];

export const products = STATIC_PRODUCTS;
export const packs = STATIC_PACKS;

export const SINGLE_PRICE = 250;

export const formatPkr = (n) =>
  `Rs ${n.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;

export const perPiece = (pack) => pack.price / pack.pieces;

export const savings = (pack) => {
  if (pack.compareAt != null) return pack.compareAt - pack.price;
  return pack.pieces * SINGLE_PRICE - pack.price;
};

export function getProduct(slug, catalog = STATIC_PRODUCTS) {
  return catalog.find((p) => p.slug === slug);
}

export function getPack(id, catalog = STATIC_PACKS) {
  return catalog.find((p) => p.id === id);
}

export function packsFor(slug, catalog = STATIC_PACKS) {
  return catalog.filter((p) => p.belongsTo === slug);
}

export const mixPacks = STATIC_PACKS.filter((p) => p.belongsTo === "mix");
