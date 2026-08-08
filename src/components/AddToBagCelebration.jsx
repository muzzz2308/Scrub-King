import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const FLOATERS = ["✨", "🫧", "⭐", "🧽"];

export function AddToBagCelebration({ burst, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!burst) return;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 900);

    return () => clearTimeout(timer);
  }, [burst, onDone]);

  if (!visible || !burst) return null;

  return (
    <>
      {FLOATERS.map((item, index) => (
        <span
          key={`${burst.id}-${item}`}
          aria-hidden
          className="animate-fly-to-bag pointer-events-none fixed z-[100] text-2xl"
          style={{
            left: burst.x,
            top: burst.y,
            animationDelay: `${index * 70}ms`,
          }}
        >
          {item}
        </span>
      ))}

      <div
        className="animate-toast-pop pointer-events-none fixed bottom-8 left-1/2 z-[100]"
        style={{ animationDelay: "60ms" }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border-4 border-ink bg-sunny px-5 py-2.5 font-display text-sm font-extrabold text-ink shadow-pop">
          <Sparkles className="size-4 animate-wiggle" />
          Scrub in the bag!
        </span>
      </div>
    </>
  );
}
