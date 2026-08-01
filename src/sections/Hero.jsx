import { Droplets, Recycle, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-14 pb-20">
      <div className="bg-confetti pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-sunny/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-28 size-72 rounded-full bg-bubble/30 blur-3xl" />

      <div className="relative grid items-center gap-10 md:grid-cols-2">
        <div>
          <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-4 border-ink bg-sunny px-4 py-2 text-xs font-extrabold tracking-wide text-ink uppercase shadow-pop-sm">
            <Sparkles className="size-4 animate-wiggle" /> Two products. Zero boring chores.
          </span>
          <h1 className="mt-5 font-display text-3xl leading-none font-extrabold text-ink sm:text-6xl">
            Meet Your Kitchen's
            <span className="block bg-gradient-bubble bg-clip-text text-transparent">
              New Favorite Cleaning Duo
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Introducing Scrub King and Scrub Queen premium cleaning sponges
            thoughtfully engineered to make everyday cleaning faster, easier,
            and more enjoyable.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/"
              className="press-pop rounded-full border-4 border-ink bg-gradient-sun px-7 py-4 font-display text-lg font-extrabold text-ink shadow-pop"
            >
              Shop the squad
            </Link>
            <Link
              to="/about"
              className="press-pop rounded-full border-4 border-ink bg-card px-7 py-4 font-display text-lg font-extrabold text-ink shadow-pop"
            >
              Our story
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            12,480 spotless kitchens and counting
          </div>
        </div>

        <div className="relative grid place-items-center">
          <div className="absolute size-72 rounded-full bg-gradient-sun blur-[2px] sm:size-96" />
          <img
            src="/King.webp"
            alt="Scrub King yellow smiley scrubber"
            width={900}
            height={900}
            className="relative z-10 w-56 animate-bob object-contain drop-shadow-2xl sm:w-72"
          />
          <img
            src="/Queen.webp"
            alt="Scrub Queen pink smiley scrubber"
            width={900}
            height={900}
            loading="lazy"
            className="absolute right-2 bottom-0 z-20 w-32 animate-bob object-contain drop-shadow-2xl sm:w-44"
          />
        </div>
      </div>
    </section>
  );
}
