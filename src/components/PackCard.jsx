import {
  formatPkr,
  getPackCardImage,
  perPiece,
  savings,
} from "../data/products";
import { useCatalog } from "../lib/Catalog";
import { useCart } from "../lib/Cart";

export function PackCard({ pack, tone = "auto" }) {
  const { add } = useCart();
  const { getProduct } = useCatalog();
  const packImage = getPackCardImage(pack);

  const save = savings(pack);

  const bg =
    tone === "sun"
      ? "bg-gradient-sun"
      : tone === "bubble"
      ? "bg-gradient-bubble"
      : pack.belongsTo === "scrub-king"
      ? "bg-gradient-sun"
      : pack.belongsTo === "scrub-queen"
      ? "bg-gradient-bubble"
      : "bg-secondary";

  return (
    <article className="relative flex flex-col rounded-4xl border-4 border-ink bg-card p-6 shadow-pop press-pop">
      {pack.badge ? (
        <span className="absolute -top-3 left-6 -rotate-2 rounded-full border-4 border-ink bg-sunny px-3 py-1 text-[11px] font-extrabold tracking-wide text-ink uppercase shadow-pop-sm">
          {pack.badge}
        </span>
      ) : null}

      <div
        className={`grid place-items-center overflow-hidden rounded-3xl border-4 border-ink ${bg}`}
      >
        {packImage ? (
          <img
            src={packImage}
            alt={`${pack.name} — four smiley scrub sponges on a kitchen counter`}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-pop-sm"
          />
        ) : (
          <div className="flex -space-x-4">
            {pack.contents.slice(0, 4).map((slug, i) => {
              const p = getProduct(slug);

              return p ? (
                <img
                  key={`${slug}-${i}`}
                  src={p.image}
                  alt={`${p.name} scrubber`}
                  width={900}
                  height={900}
                  loading="lazy"
                  className="size-16 object-contain drop-shadow-lg"
                />
              ) : null;
            })}
          </div>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-extrabold text-ink">
        {pack.name}
      </h3>

      <p className="text-sm text-muted-foreground">{pack.subtitle}</p>

      <p className="mt-3 font-display text-3xl font-extrabold text-primary">
        {formatPkr(pack.price)}
      </p>

      <p className="text-xs font-bold text-muted-foreground">
        {formatPkr(Math.round(perPiece(pack)))} per scrub
        {save > 0 ? ` · save ${formatPkr(save)}` : ""}
      </p>

      <button
        onClick={() => add(pack.id)}
        className="press-pop mt-5 w-full rounded-full border-4 border-ink bg-foreground py-3 font-display text-base font-extrabold text-background shadow-pop-sm"
      >
        Add to bag
      </button>
    </article>
  );
}