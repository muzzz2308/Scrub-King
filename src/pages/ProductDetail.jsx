import { Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../lib/Cart";

export default function ProductDetails() {
  const { slug } = useParams();

  const product = products.find((p) => p.slug === slug);

  const { add } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h1 className="text-4xl font-bold">Product Not Found</h1>

        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-white"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const isKing = product.accent === "king";

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <Link
        to="/shop"
        className="text-sm font-bold text-muted-foreground hover:text-foreground"
      >
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div
          className={`grid place-items-center rounded-4xl border-4 border-ink p-10 shadow-pop ${
            isKing ? "bg-gradient-sun" : "bg-gradient-bubble"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-64 animate-bob object-contain drop-shadow-2xl"
          />
        </div>

        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-secondary-foreground">
            {product.tagline}
          </span>

          <h1 className="mt-3 font-display text-5xl font-extrabold text-ink">
            {product.name}
          </h1>

          <p className="mt-3 font-display text-3xl font-extrabold text-primary">
            ${product.price.toFixed(2)}

            <span className="ml-2 text-lg font-bold text-muted-foreground line-through">
              ${product.compareAt.toFixed(2)}
            </span>
          </p>

          <p className="mt-4 text-lg text-muted-foreground">
            {product.blurb}
          </p>

          <ul className="mt-6 space-y-2">
            {product.perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 font-semibold text-foreground"
              >
                <Check size={20} className="text-primary" />
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => add(product.slug)}
              className="rounded-full  bg-foreground press-pop border-4 border-ink px-8 py-4 cursor-pointer font-display text-lg font-extrabold text-background transition-transform hover:-translate-y-1"
            >
              Add to Bag
            </button>

            <Link
              to="/cart"
              className="rounded-full border-4 border-ink press-pop bg-card px-8 py-4 font-display text-lg font-extrabold text-ink transition-colors hover:bg-secondary"
            >
              View Bag
            </Link>
          </div>

          <dl className="mt-8 grid gap-3 rounded-3xl border-4 border-ink/10 bg-card p-6 sm:grid-cols-3">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                  {spec.label}
                </dt>

                <dd className="mt-1 font-display text-lg font-bold text-ink">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}