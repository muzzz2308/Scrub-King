import { useEffect, useState } from "react";
import { AdminSelect } from "../components/AdminSelect";
import { fetchOrders, updateOrderStatus } from "../lib/orders";
import { AdminOrdersSkeleton } from "../components/skeleton/PageSkeletons";
import { formatPkr } from "../data/products";

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      setOrders(await fetchOrders());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function changeStatus(orderId, status) {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status } : order)),
      );
      if (status === "cancelled" || status === "delivered") {
        await load();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order");
    }
  }

  if (loading) {
    return <AdminOrdersSkeleton />;
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Orders</h1>
        <button
          type="button"
          onClick={load}
          className="press-pop w-full rounded-full border-4 border-ink bg-card px-4 py-2 text-sm font-extrabold shadow-pop-sm sm:w-auto"
        >
          Refresh
        </button>
      </div>

      {error ? <p className="mt-4 font-bold text-destructive">{error}</p> : null}

      {orders.length === 0 ? (
        <p className="mt-8 text-muted-foreground">No orders yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-4xl border-4 border-ink bg-card p-4 shadow-pop sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-display text-xl font-extrabold text-ink sm:text-2xl">
                    {order.order_number}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString("en-PK")}
                  </p>
                  {order.purge_after ? (
                    <p className="mt-1 text-xs font-bold text-muted-foreground">
                      Auto-removes {new Date(order.purge_after).toLocaleString("en-PK")}
                    </p>
                  ) : null}
                </div>
                <AdminSelect
                  fullWidth
                  className="w-full sm:w-auto"
                  value={order.status}
                  onChange={(e) => changeStatus(order.id, e.target.value)}
                  options={statuses}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="text-sm">
                  <p className="font-bold text-ink">{order.customer_name}</p>
                  <p className="text-muted-foreground">{order.phone}</p>
                  {order.email ? (
                    <p className="text-muted-foreground">{order.email}</p>
                  ) : null}
                  <p className="mt-2 text-muted-foreground">
                    {order.address}, {order.city}
                    {order.zip ? ` ${order.zip}` : ""}
                  </p>
                  {order.notes ? (
                    <p className="mt-2 text-muted-foreground">Notes: {order.notes}</p>
                  ) : null}
                </div>

                <div>
                  <ul className="space-y-1 text-sm">
                    {(order.order_items ?? []).map((item) => (
                      <li key={item.id} className="flex justify-between gap-3">
                        <span>
                          {item.pack_name} × {item.qty}
                        </span>
                        <span className="font-bold">{formatPkr(item.unit_price * item.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-display text-xl font-extrabold text-primary">
                    {formatPkr(order.total)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
