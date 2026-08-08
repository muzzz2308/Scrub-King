import { Link } from "react-router-dom";
import { useCart } from "../lib/Cart";
import { useCatalog } from "../lib/Catalog";
import { formatPkr } from "../data/products";
import { getShipping } from "../lib/shipping";
import { CartPageSkeleton } from "../components/skeleton/PageSkeletons";

export default function CartPage() {
  const { items, total, setQty, remove } = useCart();
  const { getProduct, loading } = useCatalog();
  const shipping = getShipping(items);

  if (loading && items.length > 0) {
    return <CartPageSkeleton />;
  }
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-display text-5xl font-extrabold text-ink">Your bag</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-4xl border-4 border-ink bg-card p-10 text-center shadow-pop">
          <p className="font-display text-2xl font-bold text-ink">It's suspiciously clean in here.</p>
          <Link
            to="/shop"
            className="mt-5 press-pop border-4 border-ink inline-block rounded-full bg-gradient-sun px-7 py-3 font-display text-lg font-extrabold text-primary-foreground shadow-pop"
          >
            Fill it up
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {items.map(({ pack, qty }) => (
              <li
                key={pack.id}
                className="flex items-center gap-4 rounded-3xl border-4 border-ink bg-card p-4 shadow-pop"
              >
                <div className="flex -space-x-3">
                  {pack.contents.slice(0, 2).map((slug, i) => {
                    const p = getProduct(slug);
                    return p ? (
                      <img
                        key={`${slug}-${i}`}
                        src={p.image}
                        alt={p.name}
                        width={900}
                        height={900}
                        loading="lazy"
                        className="size-16 object-contain"
                      />
                    ) : null;
                  })}
                </div>
                <div className="flex-1">
                  <p className="font-display text-xl font-extrabold text-ink">{pack.name}</p>
                  <p className="text-sm text-muted-foreground">{pack.subtitle}</p>
                  <button
                    onClick={() => remove(pack.id)}
                    className="mt-1 text-xs font-bold text-muted-foreground underline hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2 rounded-full border-2 border-ink/10 px-2 py-1">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQty(pack.id, qty - 1)}
                    className="size-7 font-bold text-ink"
                  >
                    −
                  </button>
                  <span className="w-3 text-center font-bold md:w-6">{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty(pack.id, qty + 1)}
                    className="size-7 font-bold text-ink"
                  >
                    +
                  </button>
                </div>
                <p className="w-24 text-right font-display text-lg font-extrabold text-primary">
                  {formatPkr(pack.price * qty)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-4xl border-4 border-ink bg-card p-7 shadow-pop">
            <div className="flex justify-between text-sm font-semibold text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPkr(total)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm font-semibold text-muted-foreground">
              <span>Delivery</span>
              <span>{shipping === 0 ? "Free" : formatPkr(shipping)}</span>
            </div>
            <div className="mt-4 flex justify-between font-display text-2xl font-extrabold text-ink">
              <span>Total</span>
              <span>{formatPkr(total + shipping)}</span>
            </div>
             <Link
              to="/checkout"
              className="press-pop mt-6 block w-full border-4 border-ink rounded-full bg-gradient-bubble py-3 text-center font-display text-lg font-extrabold text-accent-foreground shadow-pop"
            >
              Proceed to Checkout
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Cash on delivery — pay when your squad arrives. Free delivery with Family Pack of 6.
            </p>
          </div>
        </>
      )}
    </div>
  );
}