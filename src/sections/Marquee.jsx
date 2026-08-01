export default function Marquee() {
  return (
    <div className="overflow-hidden border-y-4 border-ink bg-foreground py-3">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <p
            key={i}
            className="font-display text-lg font-extrabold tracking-wide text-background uppercase"
          >
            Free shipping over $25 ✦ 60-day smile guarantee ✦ Ships in 24 hours
            ✦
          </p>
        ))}
      </div>
    </div>
  );
}
