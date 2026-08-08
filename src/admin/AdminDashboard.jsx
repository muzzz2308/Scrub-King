import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardData } from "../lib/orders";
import { formatPkr } from "../data/products";
import { AdminDashboardSkeleton } from "../components/skeleton/PageSkeletons";

const ACTIVE_STATUSES = new Set(["pending", "confirmed", "shipped"]);

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData()
      .then(({ orders: nextOrders, revenue: nextRevenue }) => {
        setOrders(nextOrders);
        setRevenue(nextRevenue);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const pending = orders.filter((o) => ACTIVE_STATUSES.has(o.status));
  const delivered = orders.filter((o) => o.status === "delivered");
  const cancelled = orders.filter((o) => o.status === "cancelled");

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">Overview of your Scrub King store.</p>

      {error ? <p className="mt-4 font-bold text-destructive">{error}</p> : null}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Active orders" value={String(pending.length)} accent="text-primary" />
        <StatCard label="Delivered" value={String(delivered.length)} />
        <StatCard label="Cancelled" value={String(cancelled.length)} />
        <StatCard label="Revenue" value={formatPkr(revenue)} accent="text-primary" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/admin/orders"
          className="press-pop w-full rounded-full border-4 border-ink bg-gradient-sun px-5 py-2.5 text-center text-sm font-extrabold text-ink shadow-pop-sm sm:w-auto"
        >
          View all orders
        </Link>
        <Link
          to="/admin/products"
          className="press-pop w-full rounded-full border-4 border-ink bg-card px-5 py-2.5 text-center text-sm font-extrabold text-ink shadow-pop-sm sm:w-auto"
        >
          Manage products
        </Link>
      </div>

      <div className="mt-10 space-y-10">
        <OrderSection title="Pending orders" orders={pending} empty="No pending orders." tone="sun" />
        <OrderSection title="Delivered orders" orders={delivered} empty="No delivered orders." tone="bubble" />
        <OrderSection title="Cancelled orders" orders={cancelled} empty="No cancelled orders." tone="muted" />
      </div>
    </div>
  );
}

function OrderSection({ title, orders, empty, tone }) {
  const headerClass =
    tone === "sun"
      ? "bg-gradient-sun"
      : tone === "bubble"
        ? "bg-gradient-bubble text-accent-foreground"
        : "bg-secondary";

  return (
    <section>
      <div className={`inline-flex rounded-full border-4 border-ink px-4 py-1.5 shadow-pop-sm ${headerClass}`}>
        <h2 className="font-display text-lg font-extrabold">{title}</h2>
      </div>

      {orders.length === 0 ? (
        <p className="mt-4 text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border-4 border-ink bg-card px-5 py-4 shadow-pop-sm"
            >
              <div>
                <p className="font-display font-extrabold text-ink">{order.order_number}</p>
                <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleString("en-PK")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{formatPkr(order.total)}</p>
                <p className="text-xs font-bold uppercase text-muted-foreground">{order.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function StatCard({ label, value, accent = "text-ink" }) {
  return (
    <div className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop">
      <p className="text-sm font-bold text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-2xl font-extrabold sm:text-3xl ${accent}`}>{value}</p>
    </div>
  );
}
