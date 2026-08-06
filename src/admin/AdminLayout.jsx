import { useNavigate } from "react-router-dom";
import { Link, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/products", label: "Products" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-ink bg-card">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
          <Link to="/" className="font-display text-xl font-extrabold text-ink">
            Scrub King Admin
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  link.to === "/admin"
                    ? pathname === "/admin"
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/70"
                    : pathname.startsWith(link.to)
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={signOut}
              className="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Outlet />
      </main>
    </div>
  );
}
