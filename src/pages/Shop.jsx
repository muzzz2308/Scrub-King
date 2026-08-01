import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Shop() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-display text-5xl font-extrabold text-ink">
        The Shop
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Two heroes, no filler. Add both and unlock free shipping.
      </p>
      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
