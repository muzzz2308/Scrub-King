import { Link } from "react-router-dom";

const steps = [
  {
    n: "01",
    t: "One messy sink",
    c: "We got tired of sponges that fell apart and smelled worse than the dishes.",
  },
  {
    n: "02",
    t: "One silly idea",
    c: "What if the thing you dread touching had a face that made you laugh?",
  },
  {
    n: "03",
    t: "Two heroes",
    c: "Scrub King and Scrub Queen. No product line bloat, just the good ones.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-display text-5xl font-extrabold text-ink sm:text-6xl">
        We're Rethinking Everyday Cleaning.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Cleaning is part of everyday life—but the tools we use haven't changed
        much. At Scrub King, we believe your kitchen sponge should do more than
        simply scrub. It should work smarter, last longer, and make cleaning
        feel effortless. That's why we created Scrub King and Scrub
        Queen—premium cleaning sponges designed with innovative technology,
        carefully selected materials, and thoughtful craftsmanship to deliver a
        better cleaning experience. Whether you're washing dishes after dinner
        or tackling stubborn kitchen messes, our mission is simple: To help
        every home clean smarter, every day.
      </p>

      <img
        src="/Squad.webp"
        alt="Scrub King and Scrub Queen boxes on a wooden table"
        loading="lazy"
        className="mt-10 w-full rounded-4xl border-4 border-ink object-cover shadow-float"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop"
          >
            <span className="font-display text-3xl font-extrabold text-primary">
              {s.n}
            </span>
            <h2 className="mt-2 font-display text-xl font-extrabold text-ink">
              {s.t}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.c}</p>
          </div>
        ))}
      </div>

      <Link
        to="/shop"
        className="mt-12 press-pop border-4 border-ink inline-block rounded-full bg-gradient-sun px-8 py-3 font-display text-lg font-extrabold text-primary-foreground shadow-pop transition-transform hover:-translate-y-1"
      >
        Meet the squad
      </Link>
    </div>
  );
}
