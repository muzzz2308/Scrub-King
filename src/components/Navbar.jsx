import { ShoppingBag, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../lib/Cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
];

export default function Navbar() {
  const { count } = useCart();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center gap-6 px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-10 animate-wiggle place-items-center rounded-full border-4 border-ink bg-gradient-sun text-ink shadow-pop-sm">
            <Sparkles className="size-5" />
          </span>
          <span className="font-display text-2xl font-extrabold text-ink">Scrub King</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                pathname === n.to
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/cart"
          className="relative press-pop ml-auto inline-flex items-center border-4 border-ink gap-2 rounded-full bg-gradient-bubble px-4 py-2.5 text-sm font-extrabold text-accent-foreground shadow-pop sm:ml-0 "
        >
          <ShoppingBag className="size-4" />
          Bag
          {count > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-sunny text-xs text-sunny-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}