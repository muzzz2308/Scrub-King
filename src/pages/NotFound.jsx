import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative mx-auto max-w-3xl px-5 py-20 text-center">
      <div className="bg-confetti pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-sunny/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 size-36 rounded-full bg-bubble/30 blur-3xl" />

      <div className="relative rounded-4xl border-4 border-ink bg-card p-10 shadow-pop sm:p-14">
        <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-4 border-ink bg-sunny px-4 py-2 text-xs font-extrabold tracking-wide text-ink uppercase shadow-pop-sm">
          <Sparkles className="size-4 animate-wiggle" />
          Page not found
        </span>

        <p className="mt-6 font-display text-8xl font-extrabold leading-none text-ink sm:text-9xl">
          4
          <span className="inline-block animate-bob bg-gradient-bubble bg-clip-text text-transparent">
            0
          </span>
          4
        </p>

        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          This page got scrubbed away
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          Nothing here but a spotless void. The link might be wrong, or this page moved
          to a shinier corner of the shop.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="press-pop rounded-full border-4 border-ink bg-gradient-sun px-7 py-3 font-display text-lg font-extrabold text-ink shadow-pop"
          >
            Back home
          </Link>
          <Link
            to="/shop"
            className="press-pop rounded-full border-4 border-ink bg-card px-7 py-3 font-display text-lg font-extrabold text-ink shadow-pop"
          >
            Visit the shop
          </Link>
        </div>
      </div>
    </div>
  );
}
