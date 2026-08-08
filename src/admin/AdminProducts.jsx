import { useRef, useState } from "react";
import { AdminSelect } from "../components/AdminSelect";
import { AdminConfirmDialog } from "../components/AdminConfirmDialog";
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
  price: 250,
  compareAt: 299,
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
  price: 250,
  pieces: 1,
  contents: "scrub-king",
  belongsTo: "scrub-king",
  badge: "",
  image: "",
};

function scrollToForm(ref) {
  requestAnimationFrame(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export default function AdminProducts() {
  const { products, packs, refresh, loading } = useCatalog();
  const productFormRef = useRef(null);
  const packFormRef = useRef(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [packForm, setPackForm] = useState(emptyPack);
  const [activeForm, setActiveForm] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

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
      setActiveForm(null);
      await refresh({ silent: true });
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
        image: packForm.image?.trim() || undefined,
      });
      setMessage("Pack saved.");
      setPackForm(emptyPack);
      setActiveForm(null);
      await refresh({ silent: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save pack");
    }
  }

  async function removeProduct(slug) {
    setConfirmAction({ type: "product", id: slug, label: slug });
  }

  async function removePack(id) {
    const pack = packs.find((p) => p.id === id);
    setConfirmAction({ type: "pack", id, label: pack?.name ?? id });
  }

  async function handleConfirmDelete() {
    if (!confirmAction) return;

    const { type, id } = confirmAction;
    setConfirmAction(null);
    setError("");

    try {
      if (type === "product") {
        await deleteProduct(id);
        setMessage("Product deleted.");
      } else {
        await deletePack(id);
        setMessage("Pack deleted.");
      }
      setActiveForm(null);
      await refresh({ silent: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to delete ${type === "product" ? "product" : "pack"}`,
      );
    }
  }

  function editProduct(product) {
    setError("");
    setProductForm({
      ...product,
      image: typeof product.image === "string" ? product.image : String(product.image ?? ""),
      compareAt: product.compareAt ?? "",
      perks: product.perks?.length ? product.perks : [""],
      specs: product.specs?.length ? product.specs : [{ label: "", value: "" }],
    });
    setActiveForm("product");
    setMessage(`Editing ${product.name}…`);
    scrollToForm(productFormRef);
  }

  function editPack(pack) {
    setError("");
    setPackForm({
      ...pack,
      contents: Array.isArray(pack.contents) ? pack.contents.join(", ") : pack.contents ?? "",
      badge: pack.badge ?? "",
      image: typeof pack.image === "string" ? pack.image : "",
    });
    setActiveForm("pack");
    setMessage(`Editing ${pack.name}…`);
    scrollToForm(packFormRef);
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Products</h1>
        {message ? <p className="mt-2 font-bold text-primary">{message}</p> : null}
        {error ? <p className="mt-2 font-bold text-destructive">{error}</p> : null}
      </div>

      <section className="grid gap-8 lg:grid-cols-2">
        <form
          ref={productFormRef}
          onSubmit={saveProduct}
          className={`scroll-mt-6 rounded-4xl border-4 border-ink bg-card p-4 shadow-pop sm:p-6 ${
            activeForm === "product" ? "ring-4 ring-primary" : ""
          }`}
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
          <button type="submit" className="press-pop mt-5 w-full rounded-full border-4 border-ink bg-gradient-sun px-6 py-3 text-center font-display font-extrabold shadow-pop sm:w-auto">
            Save product
          </button>
        </form>

        <form
          ref={packFormRef}
          onSubmit={savePack}
          className={`scroll-mt-6 rounded-4xl border-4 border-ink bg-card p-4 shadow-pop sm:p-6 ${
            activeForm === "pack" ? "ring-4 ring-primary" : ""
          }`}
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
            {packForm.belongsTo === "mix" ? (
              <Field
                label="Pack image URL"
                value={packForm.image}
                onChange={(v) => setPackForm((p) => ({ ...p, image: v }))}
              />
            ) : null}
            {packForm.belongsTo === "mix" ? (
              <p className="text-xs text-muted-foreground">
                Shown on shop bundle cards. Use a path like /pack4.webp or a full image URL.
              </p>
            ) : null}
          </div>
          <button type="submit" className="press-pop mt-5 w-full rounded-full border-4 border-ink bg-gradient-bubble px-6 py-3 text-center font-display font-extrabold text-accent-foreground shadow-pop sm:w-auto">
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
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-display font-extrabold text-ink">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.slug} · {formatPkr(product.price)}</p>
                  </div>
                  <div className="flex gap-3 sm:gap-2">
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
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-display font-extrabold text-ink">{pack.name}</p>
                    <p className="text-sm text-muted-foreground">{pack.id} · {formatPkr(pack.price)}</p>
                  </div>
                  <div className="flex gap-3 sm:gap-2">
                    <button type="button" onClick={() => editPack(pack)} className="text-sm font-bold underline">Edit</button>
                    <button type="button" onClick={() => removePack(pack.id)} className="text-sm font-bold text-destructive underline">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AdminConfirmDialog
        open={Boolean(confirmAction)}
        title={confirmAction?.type === "product" ? "Delete product?" : "Delete pack?"}
        description={
          confirmAction
            ? `"${confirmAction.label}" will be permanently removed from the catalog. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        destructive
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="block text-sm font-bold">
      {label}
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-2xl border-4 border-ink/10 bg-background px-4 py-3 font-semibold outline-none focus:border-primary"
      />
    </label>
  );
}
