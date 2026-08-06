import { Link } from "react-router-dom";
import { HappyPromiseTrigger } from "./AdminSecretTrigger";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t-4 border-ink bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold text-ink">Scrub King</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Two smiley sidekicks that make the messiest sink the best part of your day.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-display text-lg font-bold text-ink">Explore</p>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <HappyPromiseTrigger />
          <p className="mt-3 text-muted-foreground">
            Free shipping over PKR 1000 · makes cleaning fun · Ships in 24h
          </p>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Scrub Squad. Keep smiling, keep scrubbing.
      </p>
    </footer>
  );
}