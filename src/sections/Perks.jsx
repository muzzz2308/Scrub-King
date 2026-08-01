import { Droplets, Recycle, ShieldCheck } from "lucide-react";

const perks = [
  {
    icon: ShieldCheck,
    title: "Scratch free",
    copy: "Safe on nonstick, glass, and grandma's china.",
  },
  {
    icon: Droplets,
    title: "Odor resistant",
    copy: "Rinse, squeeze, smile. No funky sponge smell.",
  },
  {
    icon: Recycle,
    title: "Lasts for months",
    copy: "Dishwasher friendly and stubbornly durable.",
  },
];

export default function Perks() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid gap-5 sm:grid-cols-3">
        {perks.map((perk, index) => (
          <div
            key={perk.title}
            className={`rounded-4xl border-4 border-ink bg-card p-7 shadow-pop transition-transform duration-300 hover:rotate-0 hover:scale-105 ${
              index === 0 ? "-rotate-2" : index === 2 ? "rotate-2" : ""
            }`}
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
              <perk.icon className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">
              {perk.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{perk.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
