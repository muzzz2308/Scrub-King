import { createContext, useContext, useMemo, useState } from "react";
import { packs } from "../data/products";

const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);

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

      count: lines.reduce((total, line) => total + line.qty, 0),

      total: items.reduce(
        (total, item) => total + item.pack.price * item.qty,
        0
      ),

      // add: (id, qty = 1) => {
      //   setLines((prev) => {
      //     const exists = prev.find((line) => line.slug === slug);

      //     if (exists) {
      //       return prev.map((line) =>
      //         line.slug === slug
      //           ? { ...line, qty: line.qty + qty }
      //           : line
      //       );
      //     }

      //     return [...prev, { slug, qty }];
      //   });
      // },
      add: (id, qty = 1) =>
      setLines((prev) =>
        prev.some((l) => l.id === id)
          ? prev.map((l) =>
              l.id === id ? { ...l, qty: l.qty + qty } : l
            )
          : [...prev, { id, qty }]
      ),

      remove: (id) => {
        setLines((prev) =>
          prev.filter((line) => line.id !== id)
        );
      },

      // setQty: (id, qty) => {
      //   setLines((prev) => {
      //     if (qty <= 0) {
      //       return prev.filter((line) => line.slug !== slug);
      //     }

      //     return prev.map((line) =>
      //       line.slug === slug
      //         ? { ...line, qty }
      //         : line
      //     );
      //   });
      // },

       setQty: (id, qty) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => l.id !== id)
          : prev.map((l) =>
              l.id === id ? { ...l, qty } : l
            )
      ),
      clear: () => setLines([]),
    };
  }, [lines]);

  return (
    <Ctx.Provider value={value}>
      {children}
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

