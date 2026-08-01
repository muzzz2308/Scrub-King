import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export default function Products() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-center font-display text-4xl font-extrabold text-ink sm:text-5xl">
        Meet the whole squad
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
        Only two products, because two is all you need.
      </p>
      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
