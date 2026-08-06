import { formatPkr } from "../data/products";
import { useCatalog } from "../lib/Catalog";
import { ProductCard } from "../components/ProductCard";
import { PackCard } from "../components/PackCard";
import { ShopPageSkeleton } from "../components/skeleton/PageSkeletons";
export default function Shop() {
  const { products, mixPacks, loading } = useCatalog();

  if (loading) {
    return <ShopPageSkeleton />;
  }

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
    </div>
  );
}
