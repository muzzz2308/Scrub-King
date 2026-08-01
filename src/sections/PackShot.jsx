import { Link } from "react-router-dom";

export default function PackShot(){
    return(
        <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid  items-center gap-8 rounded-4xl border-4 border-ink bg-card p-8 shadow-pop md:grid-cols-2">
          <img
            src="/Squad.webp"
            alt="Scrub King and Scrub Queen retail boxes side by side"
            loading="lazy"
            className="w-full border-4 border-ink rounded-3xl object-cover"
          />
          <div>
            <h2 className="font-display text-4xl font-extrabold text-ink">
              Straight off the shelf, into your sink
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every box is packed with one full-size scrubber, a hang tab for the cupboard, and a
              face that refuses to frown. Grab the pair and save.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block press-pop rounded-full bg-gradient-bubble px-7 py-3 font-display text-lg font-extrabold text-accent-foreground border-4 border-ink shadow-pop transition-transform hover:-translate-y-1"
            >
              Get the duo
            </Link>
          </div>
        </div>
      </section>
    );
}