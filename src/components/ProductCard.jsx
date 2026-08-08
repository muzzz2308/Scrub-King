import { Link } from "react-router-dom";
import { AddToBagButton } from "./AddToBagButton";
import { useCatalog } from "../lib/Catalog";
import { formatPkr, SINGLE_PRICE, getProductCardImage } from "../data/products";

export function ProductCard({ product }) {
  const { packsFor } = useCatalog();  const isKing = product.accent === "king";
  const single = packsFor(product.slug).find((p) => p.pieces === 1);
  const packOf5 = packsFor(product.slug).find((p) => p.pieces === 5);

  return (
    <article
      className={`group relative overflow-hidden rounded-4xl border-4 border-ink p-7 shadow-pop transition-transform hover:-translate-y-1 ${
        isKing ? "bg-gradient-sun" : "bg-gradient-bubble"
      }`}
    >
      <Link to={`/shop/${product.slug}`} className="relative mb-4 block">
        <img
          src={getProductCardImage(product)}
          alt={`${product.name} scrubber with its retail box`}
          loading="lazy"
          className="w-full rounded-3xl border-4 border-ink object-cover shadow-pop-sm"
        />
        <span className="absolute top-3 left-3 -rotate-2 rounded-full border-4 border-ink bg-background/90 px-3 py-1 text-xs font-extrabold tracking-wide text-ink uppercase shadow-pop-sm">
          {product.tagline}
        </span>
      </Link>

      <div className="rounded-3xl border-4 border-ink bg-background/90 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold text-ink">
            {product.name}
          </h3>
          <p className="font-display text-xl font-extrabold text-primary">
            {formatPkr(product.price ?? SINGLE_PRICE)}
            <span className="ml-1 text-xs font-bold text-muted-foreground">/ piece</span>
          </p>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{product.blurb}</p>
        <p className="mt-2 text-xs font-extrabold tracking-wide text-ink uppercase">
          Packs of 5 from {formatPkr(packOf5?.price ?? 1149)}
        </p>

        <div className="mt-4 flex gap-2">
          <AddToBagButton
            packId={single?.id}
            disabled={!single}
            className="flex-1 press-pop rounded-full bg-foreground px-4 py-3 text-sm font-extrabold text-background shadow-pop transition-transform hover:-translate-y-0.5"
          >
            Add single
          </AddToBagButton>          <Link
            to={`/shop/${product.slug}`}
            className="rounded-full press-pop border-4 border-ink px-4 py-3 text-sm font-extrabold text-foreground shadow-pop transition-colors hover:bg-secondary"
          >
            All packs
          </Link>
        </div>
      </div>
    </article>
  );
}
