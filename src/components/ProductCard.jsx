import { Link } from "react-router-dom";
import { useCart } from "../lib/Cart";

export function ProductCard({ product }) {
  const { add } = useCart();
  const isKing = product.accent === "king";

  return (
    <article
      className={`group relative overflow-hidden rounded-4xl border-4 border-ink p-7 shadow-pop transition-transform hover:-translate-y-1 ${
        isKing ? "bg-gradient-sun" : "bg-gradient-bubble"
      }`}
    >
      <span className="inline-block -rotate-2 border-4 border-ink rounded-full bg-background/85 px-3 py-1 text-xs font-extrabold tracking-wide text-ink uppercase">
        {product.tagline}
      </span>

      <Link to={`/shop/${product.slug}`} className="block">
        <img
          src={product.image}
          alt={`${product.name} smiley sponge`}
          width={900}
          height={900}
          loading="lazy"
          className="mx-auto my-4 size-44 object-contain animate-bob drop-shadow-xl transition-transform duration-500 group-hover:rotate-12"
        />
      </Link>

      <div className="rounded-3xl border-4 border-ink bg-background/90 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold text-ink">
            {product.name}
          </h3>
          <p className="font-display text-xl font-extrabold text-primary">
            ${product.price.toFixed(2)}
            <span className="ml-1 text-sm font-bold text-muted-foreground line-through">
              ${product.compareAt.toFixed(2)}
            </span>
          </p>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{product.blurb}</p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => add(product.slug)}
            className="flex-1 press-pop rounded-full bg-foreground px-4 py-3 text-sm font-extrabold text-background shadow-pop transition-transform hover:-translate-y-0.5"
          >
            Add to bag
          </button>
          <Link
            to={`/shop/${product.slug}`}
            className="rounded-full press-pop border-4 border-ink px-4 py-3 text-sm font-extrabold text-foreground shadow-pop transition-colors hover:bg-secondary"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
