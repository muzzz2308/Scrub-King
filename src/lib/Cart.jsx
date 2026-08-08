import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCatalog } from "./Catalog";
import { AddToBagCelebration } from "../components/AddToBagCelebration";

const Ctx = createContext(null);

export function CartProvider({ children }) {
  const { packs } = useCatalog();
  const [lines, setLines] = useState([]);
  const [burst, setBurst] = useState(null);
  const [bagPulse, setBagPulse] = useState(0);

  const clearBurst = useCallback(() => setBurst(null), []);

  const value = useMemo(() => {
    const items = lines
      .map((line) => ({
        pack: packs.find((p) => p.id === line.id),
        qty: line.qty,
      }))
      .filter((item) => item.pack);

    return {
      lines,
      items,
      bagPulse,

      count: lines.reduce((total, line) => total + line.qty, 0),

      total: items.reduce(
        (total, item) => total + item.pack.price * item.qty,
        0,
      ),

      add: (id, qty = 1, origin) => {
        setLines((prev) =>
          prev.some((l) => l.id === id)
            ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { id, qty }],
        );

        setBagPulse((pulse) => pulse + 1);

        if (origin) {
          setBurst({
            id: Date.now(),
            x: origin.x,
            y: origin.y,
          });
        }
      },

      remove: (id) => {
        setLines((prev) => prev.filter((line) => line.id !== id));
      },

      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),

      clear: () => setLines([]),
    };
  }, [lines, packs, bagPulse]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <AddToBagCelebration burst={burst} onDone={clearBurst} />
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}
