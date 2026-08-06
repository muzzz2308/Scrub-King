import { useEffect, useRef, useState } from "react";
import { BookOpen, Home, Menu, ShoppingBag, Sparkles, Store, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../lib/Cart";

const nav = [
  { to: "/", label: "Home", icon: Home, accent: "bg-gradient-sun", tilt: "-rotate-1" },
  { to: "/shop", label: "Shop", icon: Store, accent: "bg-gradient-bubble", tilt: "rotate-1" },
  { to: "/about", label: "Our Story", icon: BookOpen, accent: "bg-card", tilt: "-rotate-1" },
];

function DesktopNavLink({ to, label, pathname }) {
  return (
    <Link
      to={to}
      className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
        pathname === to
          ? "bg-secondary text-secondary-foreground"
          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ to, label, icon: Icon, accent, tilt, pathname, index, onNavigate }) {
  const active = pathname === to;

  return (
    <Link
      to={to}
      onClick={onNavigate}
      style={{ animationDelay: `${index * 70 + 80}ms` }}
      className={`animate-menu-item-in press-pop flex items-center gap-4 rounded-3xl border-4 border-ink px-5 py-4 font-display text-lg font-extrabold text-ink shadow-pop transition-transform ${tilt} ${
        active ? accent : "bg-card hover:bg-card"
      }`}
    >
      <span
        className={`grid size-12 place-items-center rounded-2xl border-4 border-ink shadow-pop-sm ${
          active ? "bg-background/70" : "bg-secondary"
        }`}
      >
        <Icon className="size-5" />
      </span>
      <span>{label}</span>
      {active && <Sparkles className="ml-auto size-5 animate-wiggle text-accent" />}
    </Link>
  );
}

export default function Navbar() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const updateMenuTop = () => {
      setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
    };

    updateMenuTop();
    window.addEventListener("resize", updateMenuTop);
    window.addEventListener("scroll", updateMenuTop, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMenuTop);
      window.removeEventListener("scroll", updateMenuTop);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b-4 border-ink bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center gap-6 px-5 py-3">
        <Link
          to="/"
          className="-rotate-2 rounded-2xl p-1.5 transition-transform hover:rotate-0"
        >
          <img
            src="/sk-logo.png"
            alt="Scrub King"
            className="h-15 w-auto object-contain sm:h-16"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 sm:flex">
          {nav.map((n) => (
            <DesktopNavLink key={n.to} to={n.to} label={n.label} pathname={pathname} />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`press-pop inline-flex size-11 items-center justify-center rounded-full border-4 border-ink text-ink shadow-pop-sm transition-colors sm:hidden ${
              menuOpen ? "bg-gradient-sun" : "bg-background"
            }`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link
            to="/cart"
            className="relative press-pop inline-flex items-center border-4 border-ink gap-2 rounded-full bg-gradient-bubble px-4 py-2.5 text-sm font-extrabold text-accent-foreground shadow-pop"
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
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] sm:hidden"
            style={{ top: menuTop }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />

          <nav
            className="animate-menu-drop fixed inset-x-0 z-50 max-h-[calc(100dvh-var(--menu-top))] overflow-y-auto border-b-4 border-ink bg-background shadow-float sm:hidden"
            style={{ top: menuTop, "--menu-top": `${menuTop}px` }}
          >
            <div className="relative bg-background bg-confetti px-5 py-5">
              <div className="pointer-events-none absolute -top-12 -right-8 size-36 rounded-full bg-sunny/50 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-bubble/35 blur-3xl" />
              <div className="pointer-events-none absolute top-1/2 right-1/4 size-20 rounded-full bg-splash/25 blur-2xl" />

              <div className="relative mx-auto max-w-6xl">
                <div className="mb-4 inline-flex -rotate-2 items-center gap-2 rounded-full border-4 border-ink bg-sunny px-4 py-1.5 text-xs font-extrabold tracking-widest text-ink uppercase shadow-pop-sm">
                  <Sparkles className="size-3.5 animate-wiggle" />
                  Where to?
                </div>

                <div className="flex flex-col gap-3">
                  {nav.map((n, index) => (
                    <MobileNavLink
                      key={n.to}
                      {...n}
                      pathname={pathname}
                      index={index}
                      onNavigate={() => setMenuOpen(false)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
