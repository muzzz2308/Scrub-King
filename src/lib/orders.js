import { isSupabaseConfigured, supabase } from "./supabase";

async function purgeExpiredOrders() {
  if (!isSupabaseConfigured) return;
  await supabase.rpc("purge_expired_orders");
}

async function fetchRevenue() {
  if (!isSupabaseConfigured) return 0;

  const { data, error } = await supabase.from("revenue_ledger").select("total");
  if (error) throw new Error(error.message);
  return (data ?? []).reduce((sum, row) => sum + row.total, 0);
}

function makeOrderNumber() {
  return `SQ-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export async function createOrder({ form, items, subtotal, shipping, codFee, total }) {
  if (!isSupabaseConfigured) {
    return {
      id: makeOrderNumber(),
      total,
      persisted: false,
    };
  }

  const orderNumber = makeOrderNumber();
  const orderId = crypto.randomUUID();

  const { error: orderError } = await supabase.from("orders").insert({
    id: orderId,
    order_number: orderNumber,
    customer_name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim() || null,
    address: form.address.trim(),
    city: form.city.trim(),
    zip: form.zip.trim() || null,
    notes: form.notes.trim() || null,
    subtotal,
    shipping,
    cod_fee: codFee,
    total,
    status: "pending",
  });

  if (orderError) {
    throw new Error(orderError.message);
  }

  const lineItems = items.map(({ pack, qty }) => ({
    order_id: orderId,
    pack_id: pack.id,
    pack_name: pack.name,
    qty,
    unit_price: pack.price,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(lineItems);

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  notifyOrder(orderId).catch((err) => {
    console.warn("Order notification failed:", err);
  });

  return {
    id: orderNumber,
    total,
    persisted: true,
    orderId,
  };
}

async function notifyOrder(orderId) {
  if (!isSupabaseConfigured) return;

  await supabase.functions.invoke("notify-order", {
    body: { orderId },
  });
}

export async function fetchOrders() {
  if (!isSupabaseConfigured) return [];

  await purgeExpiredOrders();

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function fetchDashboardData() {
  if (!isSupabaseConfigured) {
    return { orders: [], revenue: 0 };
  }

  await purgeExpiredOrders();

  const [ordersRes, revenue] = await Promise.all([
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false }),
    fetchRevenue(),
  ]);

  if (ordersRes.error) throw new Error(ordersRes.error.message);

  return {
    orders: ordersRes.data ?? [],
    revenue,
  };
}

export async function updateOrderStatus(orderId, status) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);

  if (error) throw new Error(error.message);
}

export async function upsertProduct(product) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const { error } = await supabase.from("products").upsert({
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    price: product.price,
    compare_at: product.compareAt ?? null,
    image_url: product.image,
    accent: product.accent,
    blurb: product.blurb,
    perks: product.perks,
    specs: product.specs,
  });

  if (error) throw new Error(error.message);
}

export async function upsertPack(pack) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const { error } = await supabase.from("packs").upsert({
    id: pack.id,
    name: pack.name,
    subtitle: pack.subtitle,
    price: pack.price,
    pieces: pack.pieces,
    contents: pack.contents,
    belongs_to: pack.belongsTo,
    badge: pack.badge ?? null,
  });

  if (error) throw new Error(error.message);
}

export async function deleteProduct(slug) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const { error } = await supabase.from("products").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

export async function deletePack(id) {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

  const { error } = await supabase.from("packs").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
