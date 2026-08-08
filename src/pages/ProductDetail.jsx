import { Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatPkr, getProductCardImage, perPiece, savings } from "../data/products";
import { AddToBagButton } from "../components/AddToBagButton";
import { useCatalog } from "../lib/Catalog";
import { useEffect, useState } from "react";
import { ProductDetailSkeleton } from "../components/skeleton/PageSkeletons";

import { PackCard } from "../components/PackCard";

export default function ProductDetails() {
  const { slug } = useParams();
  const { products, mixPacks, packsFor, loading } = useCatalog();
  const product = products.find((p) => p.slug === slug);

  const options = product ? packsFor(product.slug) : [];
  const [selected, setSelected] = useState("");
  const pack = options.find((o) => o.id === selected) ?? options[0];

  useEffect(() => {
    if (!product) return;
    const nextOptions = packsFor(product.slug);
    if (nextOptions.length) {
      setSelected((current) =>
        nextOptions.some((o) => o.id === current) ? current : nextOptions[0].id,
      );
    }
  }, [product, packsFor]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

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

      <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
        <div className="md:sticky md:top-24">
          <div
            className={`relative overflow-hidden rounded-4xl border-4 border-ink p-4 shadow-pop ${
              isKing ? "bg-gradient-sun" : "bg-gradient-bubble"
            }`}
          >
            <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-sunny/45 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-background/35 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border-4 border-ink bg-background shadow-pop-sm">
              <img
                src={getProductCardImage(product)}
                alt={`${product.name} scrubber with its retail box`}
                className="aspect-[4/5] w-full object-cover object-center sm:aspect-[3/4]"
              />
              <span className="absolute top-4 left-4 -rotate-2 rounded-full border-4 border-ink bg-sunny px-4 py-1.5 text-xs font-extrabold tracking-wide text-ink uppercase shadow-pop-sm">
                {product.tagline}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-display text-5xl font-extrabold text-ink">
            {product.name}
          </h1>

          <p className="mt-3 font-display text-3xl font-extrabold text-primary">
            {pack ? formatPkr(pack.price) : formatPkr(product.price)}
            {pack && pack.pieces > 1 ? (
              <span className="ml-2 text-base font-bold text-muted-foreground">
                {formatPkr(Math.round(perPiece(pack)))} per scrub
              </span>
            ) : null}
          </p>

          <p className="mt-4 text-lg text-muted-foreground">{product.blurb}</p>

          <div className="mt-6 grid gap-3">
            {options.map((o) => {
              const active = o.id === pack?.id;
              const save = savings(o);
              return (
                <button
                  key={o.id}
                  onClick={() => setSelected(o.id)}
                  className={`flex items-center justify-between rounded-3xl border-4 px-5 py-4 text-left transition-colors ${
                    active
                      ? "border-ink bg-secondary shadow-pop-sm"
                      : "border-ink/10 bg-card"
                  }`}
                >
                  <span>
                    <span className="block font-display text-lg font-extrabold text-ink">
                      {o.pieces === 1 ? "Single piece" : `Pack of ${o.pieces}`}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">
                      {save > 0 ? `Save ${formatPkr(save)}` : "Try one first"}
                    </span>
                  </span>
                  <span className="font-display text-xl font-extrabold text-primary">
                    {formatPkr(o.price)}
                  </span>
                </button>
              );
            })}
          </div>

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
            <AddToBagButton
              packId={pack?.id}
              disabled={!pack}
              className="press-pop rounded-full border-4 border-ink bg-foreground px-8 py-4 font-display text-lg font-extrabold text-background shadow-pop"
            >
              Add to Bag · {pack ? formatPkr(pack.price) : ""}
            </AddToBagButton>

            <Link
              to="/cart"
              className="press-pop rounded-full border-4 border-ink/10 bg-card px-8 py-4 font-display text-lg font-extrabold text-ink shadow-pop"
            >
              View Bag
            </Link>
          </div>

          <dl className="mt-8 grid gap-3 rounded-3xl border-4 border-ink/10 bg-card p-6 sm:grid-cols-2">
            {product.specs
              .filter((spec) => spec.label !== "Lifespan")
              .map((spec) => (
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
      <section className="mt-20">
        <h2 className="font-display text-4xl font-extrabold text-ink">Better together</h2>
        <p className="mt-2 text-muted-foreground">Bundle King and Queen and save more per scrub.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mixPacks.map((p) => (
            <PackCard key={p.id} pack={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
