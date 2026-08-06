import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STATIC_PACKS, STATIC_PRODUCTS } from "../data/products";
import { isSupabaseConfigured, supabase } from "./supabase";

const CatalogCtx = createContext(null);

function normalizeProduct(row) {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    price: row.price,
    compareAt: row.compare_at ?? undefined,
    image: row.image_url,
    accent: row.accent,
    blurb: row.blurb,
    perks: row.perks ?? [],
    specs: row.specs ?? [],
  };
}

function normalizePack(row) {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle,
    price: row.price,
    pieces: row.pieces,
    contents: row.contents ?? [],
    belongsTo: row.belongs_to,
    badge: row.badge ?? undefined,
  };
}

function mergeProducts(staticProducts, dbRows) {
  const dbBySlug = new Map((dbRows ?? []).map((row) => [row.slug, normalizeProduct(row)]));

  return staticProducts.map((product) => ({
    ...product,
    ...(dbBySlug.get(product.slug) ?? {}),
  }));
}

function mergePacks(staticPacks, dbRows) {
  const dbById = new Map((dbRows ?? []).map((row) => [row.id, normalizePack(row)]));

  return staticPacks.map((pack) => ({
    ...pack,
    ...(dbById.get(pack.id) ?? {}),
  }));
}

async function fetchCatalog() {
  if (!isSupabaseConfigured) {
    return { products: STATIC_PRODUCTS, packs: STATIC_PACKS, fromDb: false };
  }

  const [productsRes, packsRes] = await Promise.all([
    supabase.from("products").select("*").order("slug"),
    supabase.from("packs").select("*").order("price"),
  ]);

  if (productsRes.error || packsRes.error) {
    console.warn("Catalog fetch failed, using static data:", productsRes.error ?? packsRes.error);
    return { products: STATIC_PRODUCTS, packs: STATIC_PACKS, fromDb: false };
  }

  if (!productsRes.data?.length || !packsRes.data?.length) {
    return { products: STATIC_PRODUCTS, packs: STATIC_PACKS, fromDb: false };
  }

  return {
    products: mergeProducts(STATIC_PRODUCTS, productsRes.data),
    packs: mergePacks(STATIC_PACKS, packsRes.data),
    fromDb: true,
  };
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [packs, setPacks] = useState(STATIC_PACKS);
  const [loading, setLoading] = useState(true);
  const [fromDb, setFromDb] = useState(false);

  useEffect(() => {
    let active = true;

    fetchCatalog().then((catalog) => {
      if (!active) return;
      setProducts(catalog.products);
      setPacks(catalog.packs);
      setFromDb(catalog.fromDb);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      products,
      packs,
      loading,
      fromDb,
      mixPacks: packs.filter((p) => p.belongsTo === "mix"),
      getProduct: (slug) => products.find((p) => p.slug === slug),
      getPack: (id) => packs.find((p) => p.id === id),
      packsFor: (slug) => packs.filter((p) => p.belongsTo === slug),
      refresh: async () => {
        setLoading(true);
        const catalog = await fetchCatalog();
        setProducts(catalog.products);
        setPacks(catalog.packs);
        setFromDb(catalog.fromDb);
        setLoading(false);
      },
    }),
    [products, packs, loading, fromDb],
  );

  return <CatalogCtx.Provider value={value}>{children}</CatalogCtx.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogCtx);

  if (!ctx) {
    throw new Error("useCatalog must be used inside CatalogProvider");
  }

  return ctx;
}
