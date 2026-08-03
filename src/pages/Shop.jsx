import { formatPkr, mixPacks, packs, products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { PackCard } from "../components/PackCard";

export default function Shop() {
const fivePacks = packs.filter((p) => p.pieces === 5);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-5xl font-extrabold text-ink">
        The Shop
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Two heroes, no filler. Singles start at {formatPkr(199)} — bundle up and the price per scrub
        drops fast.
      </p>
      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      <section className="mt-20">
        <h2 className="font-display text-4xl font-extrabold text-ink">Mix & match bundles</h2>
        <p className="mt-2 text-muted-foreground">King and Queen together, at a friendlier price.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mixPacks.map((p) => (
            <PackCard key={p.id} pack={p} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-4xl font-extrabold text-ink">Stock-up packs of 5</h2>
        <p className="mt-2 text-muted-foreground">
          Pick one squad member and keep a fresh scrub under every sink.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {fivePacks.map((p) => (
            <PackCard key={p.id} pack={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
