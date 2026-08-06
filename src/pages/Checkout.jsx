import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../lib/Cart";
import { useCatalog } from "../lib/Catalog";
import { createOrder } from "../lib/orders";
import { formatPkr } from "../data/products";
import { CheckoutPageSkeleton } from "../components/skeleton/PageSkeletons";

const empty = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  notes: "",
};

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { getProduct, loading: catalogLoading } = useCatalog();
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const shipping = total >= 1000 || total === 0 ? 0 : 150;
  const codFee = total === 0 ? 0 : 50;
  const grand = total + shipping + codFee;

  function set(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  }

  async function submit(e) {
    e.preventDefault();

    const next = {};

    if (form.name.trim().length < 2)
      next.name = "Tell us who to hand the box to";

    if (form.phone.replace(/\D/g, "").length < 7)
      next.phone = "We need a reachable number";

    if (form.address.trim().length < 5)
      next.address = "Street, building, apartment…";

    if (form.city.trim().length < 2) next.city = "City is required";

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const result = await createOrder({
        form,
        items,
        subtotal: total,
        shipping,
        codFee,
        total: grand,
      });

      setPlaced({
        id: result.id,
        total: result.total,
        persisted: result.persisted,
      });

      clear();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not place order");
    } finally {
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="rounded-4xl border-4 border-ink bg-card p-10 shadow-pop">
          <div className="mx-auto flex size-20 items-center border-4 border-ink animate-bob justify-center rounded-full bg-gradient-sun text-4xl shadow-pop-sm">
            🎉
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">
            Order placed!
          </h1>

          <p className="mt-3 text-muted-foreground">
            Order <span className="font-bold text-ink">{placed.id}</span> is on
            its way. Keep{" "}
            <span className="font-bold text-ink">
              {formatPkr(placed.total)}
            </span>{" "}
            in cash ready for the courier.
            {!placed.persisted ? (
              <span className="mt-2 block text-sm">
                Demo mode: connect Supabase to save real orders.
              </span>
            ) : null}
          </p>

          <Link
            to="/shop"
            className="press-pop mt-7 inline-block rounded-full border-4 border-ink bg-gradient-bubble px-7 py-3 font-display text-lg font-extrabold text-accent-foreground shadow-pop"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="rounded-4xl border-4 border-ink bg-card p-10 shadow-pop">
          <h1 className="font-display text-4xl font-extrabold text-ink">
            Nothing to check out
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your bag is squeaky empty.
          </p>

          <Link
            to="/shop"
            className="press-pop mt-7 inline-block border-4 border-ink rounded-full bg-gradient-sun px-7 py-3 font-display text-lg font-extrabold text-primary-foreground shadow-pop"
          >
            Grab a scrubber
          </Link>
        </div>
      </div>
    );
  }

  if (catalogLoading) {
    return <CheckoutPageSkeleton />;
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-display text-5xl font-extrabold text-ink">
        Checkout
      </h1>
      <p className="mt-2 font-semibold text-muted-foreground">
        Cash on delivery — pay the courier when your courier arrives.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <form
          onSubmit={submit}
          noValidate
          className="rounded-4xl border-4 border-ink bg-card p-7 shadow-pop"
        >
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Delivery details
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              value={form.name}
              onChange={(v) => set("name", v)}
              error={errors.name}
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              error={errors.phone}
            />
            <div className="sm:col-span-2">
              <Field
                label="Email (optional)"
                value={form.email}
                onChange={(v) => set("email", v)}
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Address"
                value={form.address}
                onChange={(v) => set("address", v)}
                error={errors.address}
              />
            </div>
            <Field
              label="City"
              value={form.city}
              onChange={(v) => set("city", v)}
              error={errors.city}
            />
            <Field
              label="ZIP / Postal code"
              value={form.zip}
              onChange={(v) => set("zip", v)}
            />
            <div className="sm:col-span-2">
              <Field
                label="Delivery notes (optional)"
                value={form.notes}
                onChange={(v) => set("notes", v)}
              />
            </div>
          </div>

          <div className="mt-6 rounded-3xl border-4 border-ink bg-secondary p-5">
            <p className="font-display text-lg font-extrabold text-ink">
              💵 Cash on delivery
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              The only payment method for now. Hand the exact amount to the
              courier — a {formatPkr(codFee)} handling fee applies.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="press-pop mt-6 w-full border-4 border-ink rounded-full bg-gradient-bubble py-4 font-display text-lg font-extrabold text-accent-foreground shadow-pop disabled:opacity-60"
          >
            {submitting ? "Placing order…" : `Place order · ${formatPkr(grand)}`}
          </button>
          {submitError ? (
            <p className="mt-3 text-sm font-bold text-destructive">{submitError}</p>
          ) : null}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="mt-3 w-full text-sm font-bold text-muted-foreground underline hover:text-foreground"
          >
            Back to bag
          </button>
        </form>
        <aside className="h-fit rounded-4xl border-4 border-ink bg-card p-7 shadow-pop">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Order summary
          </h2>
          <ul className="mt-5 space-y-3">
            {items.map(({ pack, qty }) => (
              <li key={pack.id} className="flex items-center gap-3">
                <div className="flex -space-x-2">
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
                        className="size-12 object-contain"
                      />
                    ) : null;
                  })}
                </div>

                <div className="flex-1">
                  <p className="font-display font-extrabold text-ink">
                    {pack.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {pack.subtitle} · Qty {qty}
                  </p>
                </div>

                <p className="font-display font-extrabold text-primary">
                  {formatPkr(pack.price * qty)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t-4 border-ink/10 pt-4 text-sm font-semibold text-muted-foreground">
            <Row label="Subtotal" value={formatPkr(total)} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "Free" : formatPkr(shipping)}
            />
            <Row label="Cash handling" value={formatPkr(codFee)} />
          </div>
          <div className="mt-4 flex justify-between font-display text-2xl font-extrabold text-ink">
            <span>Pay on delivery</span>
            <span>{formatPkr(grand)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Field({ label, value, onChange, error }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink">{label}</span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border-4 border-ink/10 bg-background px-4 py-3 font-semibold text-foreground outline-none focus:border-primary"
      />

      {error ? (
        <span className="mt-1 block text-xs font-bold text-destructive">
          {error}
        </span>
      ) : null}
    </label>
  );
}
