import { useState } from "react";
import { AdminSelect } from "../components/AdminSelect";
import { useCatalog } from "../lib/Catalog";
import {
  deletePack,
  deleteProduct,
  upsertPack,
  upsertProduct,
} from "../lib/orders";
import { AdminProductsSkeleton } from "../components/skeleton/PageSkeletons";
import { formatPkr } from "../data/products";

const emptyProduct = {
  slug: "",
  name: "",
  tagline: "",
  price: 199,
  compareAt: 249,
  image: "/Kingimg.webp",
  accent: "king",
  blurb: "",
  perks: [""],
  specs: [{ label: "", value: "" }],
};

const emptyPack = {
  id: "",
  name: "",
  subtitle: "",
  price: 199,
  pieces: 1,
  contents: "scrub-king",
  belongsTo: "scrub-king",
  badge: "",
};

export default function AdminProducts() {
  const { products, packs, refresh, loading } = useCatalog();
  const [productForm, setProductForm] = useState(emptyProduct);
  const [packForm, setPackForm] = useState(emptyPack);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (loading) {
    return <AdminProductsSkeleton />;
  }

  async function saveProduct(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await upsertProduct({
        ...productForm,
        price: Number(productForm.price),
        compareAt: productForm.compareAt ? Number(productForm.compareAt) : null,
        perks: productForm.perks.filter(Boolean),
        specs: productForm.specs.filter((s) => s.label && s.value),
      });
      setMessage("Product saved.");
      setProductForm(emptyProduct);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    }
  }

  async function savePack(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await upsertPack({
        ...packForm,
        price: Number(packForm.price),
        pieces: Number(packForm.pieces),
        contents: typeof packForm.contents === "string"
          ? packForm.contents.split(",").map((s) => s.trim()).filter(Boolean)
          : packForm.contents,
        badge: packForm.badge || undefined,
      });
      setMessage("Pack saved.");
      setPackForm(emptyPack);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save pack");
    }
  }

  async function removeProduct(slug) {
    if (!confirm(`Delete product ${slug}?`)) return;
    setError("");
    try {
      await deleteProduct(slug);
      setMessage("Product deleted.");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  }

  async function removePack(id) {
    if (!confirm(`Delete pack ${id}?`)) return;
    setError("");
    try {
      await deletePack(id);
      setMessage("Pack deleted.");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete pack");
    }
  }

  function editProduct(product) {
    setProductForm({
      ...product,
      perks: product.perks.length ? product.perks : [""],
      specs: product.specs.length ? product.specs : [{ label: "", value: "" }],
    });
  }

  function editPack(pack) {
    setPackForm({
      ...pack,
      contents: pack.contents.join(", "),
      badge: pack.badge ?? "",
    });
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl font-extrabold text-ink">Products</h1>
        {message ? <p className="mt-2 font-bold text-primary">{message}</p> : null}
        {error ? <p className="mt-2 font-bold text-destructive">{error}</p> : null}
      </div>

      <section className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={saveProduct}
          className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop"
        >
          <h2 className="font-display text-2xl font-extrabold text-ink">
            {productForm.slug ? "Edit product" : "Add product"}
          </h2>
          <div className="mt-4 grid gap-3">
            <Field label="Slug" value={productForm.slug} onChange={(v) => setProductForm((p) => ({ ...p, slug: v }))} />
            <Field label="Name" value={productForm.name} onChange={(v) => setProductForm((p) => ({ ...p, name: v }))} />
            <Field label="Tagline" value={productForm.tagline} onChange={(v) => setProductForm((p) => ({ ...p, tagline: v }))} />
            <Field label="Price" type="number" value={productForm.price} onChange={(v) => setProductForm((p) => ({ ...p, price: v }))} />
            <Field label="Compare at" type="number" value={productForm.compareAt} onChange={(v) => setProductForm((p) => ({ ...p, compareAt: v }))} />
            <Field label="Image URL" value={productForm.image} onChange={(v) => setProductForm((p) => ({ ...p, image: v }))} />
            <label className="block text-sm font-bold">
              Accent
              <div className="mt-1">
                <AdminSelect
                  fullWidth
                  value={productForm.accent}
                  onChange={(e) => setProductForm((p) => ({ ...p, accent: e.target.value }))}
                  options={[
                    { value: "king", label: "King" },
                    { value: "queen", label: "Queen" },
                  ]}
                />
              </div>
            </label>
            <Field label="Blurb" value={productForm.blurb} onChange={(v) => setProductForm((p) => ({ ...p, blurb: v }))} />
            <Field
              label="Perks (comma separated)"
              value={productForm.perks.join(", ")}
              onChange={(v) => setProductForm((p) => ({ ...p, perks: v.split(",").map((s) => s.trim()) }))}
            />
          </div>
          <button type="submit" className="press-pop mt-5 rounded-full border-4 border-ink bg-gradient-sun px-6 py-3 font-display font-extrabold shadow-pop">
            Save product
          </button>
        </form>

        <form
          onSubmit={savePack}
          className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop"
        >
          <h2 className="font-display text-2xl font-extrabold text-ink">
            {packForm.id ? "Edit pack" : "Add pack"}
          </h2>
          <div className="mt-4 grid gap-3">
            <Field label="ID" value={packForm.id} onChange={(v) => setPackForm((p) => ({ ...p, id: v }))} />
            <Field label="Name" value={packForm.name} onChange={(v) => setPackForm((p) => ({ ...p, name: v }))} />
            <Field label="Subtitle" value={packForm.subtitle} onChange={(v) => setPackForm((p) => ({ ...p, subtitle: v }))} />
            <Field label="Price" type="number" value={packForm.price} onChange={(v) => setPackForm((p) => ({ ...p, price: v }))} />
            <Field label="Pieces" type="number" value={packForm.pieces} onChange={(v) => setPackForm((p) => ({ ...p, pieces: v }))} />
            <Field label="Contents (slugs, comma separated)" value={packForm.contents} onChange={(v) => setPackForm((p) => ({ ...p, contents: v }))} />
            <Field label="Belongs to" value={packForm.belongsTo} onChange={(v) => setPackForm((p) => ({ ...p, belongsTo: v }))} />
            <Field label="Badge" value={packForm.badge} onChange={(v) => setPackForm((p) => ({ ...p, badge: v }))} />
          </div>
          <button type="submit" className="press-pop mt-5 rounded-full border-4 border-ink bg-gradient-bubble px-6 py-3 font-display font-extrabold text-accent-foreground shadow-pop">
            Save pack
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-2xl font-extrabold text-ink">Catalog</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <ul className="space-y-3">
            {products.map((product) => (
              <li key={product.slug} className="rounded-3xl border-4 border-ink/10 bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-extrabold text-ink">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.slug} · {formatPkr(product.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => editProduct(product)} className="text-sm font-bold underline">Edit</button>
                    <button type="button" onClick={() => removeProduct(product.slug)} className="text-sm font-bold text-destructive underline">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <ul className="space-y-3">
            {packs.map((pack) => (
              <li key={pack.id} className="rounded-3xl border-4 border-ink/10 bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-extrabold text-ink">{pack.name}</p>
                    <p className="text-sm text-muted-foreground">{pack.id} · {formatPkr(pack.price)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => editPack(pack)} className="text-sm font-bold underline">Edit</button>
                    <button type="button" onClick={() => removePack(pack.id)} className="text-sm font-bold text-destructive underline">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border-4 border-ink/10 bg-background px-4 py-3 font-semibold outline-none focus:border-primary"
      />
    </label>
  );
}
