import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/products", label: "Products" },
];

function isActive(pathname, link) {
  if (link.to === "/admin") return pathname === "/admin";
  return pathname.startsWith(link.to);
}

function navClass(pathname, link) {
  return isActive(pathname, link)
    ? "bg-secondary text-secondary-foreground"
    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground";
}

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-ink bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display text-lg font-extrabold text-ink sm:text-xl">
              Scrub King Admin
            </Link>

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={signOut}
                className="rounded-full px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className={`press-pop inline-flex size-10 items-center justify-center rounded-full border-4 border-ink shadow-pop-sm ${
                  menuOpen ? "bg-gradient-sun text-ink" : "bg-background text-ink"
                }`}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

            <nav className="ml-auto hidden items-center gap-2 md:flex">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-full px-4 py-2 text-sm font-bold ${navClass(pathname, link)}`}
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

          {menuOpen ? (
            <nav className="animate-menu-drop mt-4 flex flex-col gap-2 border-t-4 border-ink/10 pt-4 md:hidden">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-3xl border-4 border-ink px-4 py-3 text-sm font-extrabold shadow-pop-sm ${navClass(pathname, link)}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-5 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}
