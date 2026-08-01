import { createContext, useContext, useMemo, useState } from "react";
import { products } from "../data/products";

const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);

  const value = useMemo(() => {
    const items = lines
      .map((line) => ({
        product: products.find((p) => p.slug === line.slug),
        qty: line.qty,
      }))
      .filter((item) => item.product);

    return {
      lines,
      items,

      count: lines.reduce((total, line) => total + line.qty, 0),

      total: items.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
      ),

      add: (slug, qty = 1) => {
        setLines((prev) => {
          const exists = prev.find((line) => line.slug === slug);

          if (exists) {
            return prev.map((line) =>
              line.slug === slug
                ? { ...line, qty: line.qty + qty }
                : line
            );
          }

          return [...prev, { slug, qty }];
        });
      },

      remove: (slug) => {
        setLines((prev) =>
          prev.filter((line) => line.slug !== slug)
        );
      },

      setQty: (slug, qty) => {
        setLines((prev) => {
          if (qty <= 0) {
            return prev.filter((line) => line.slug !== slug);
          }

          return prev.map((line) =>
            line.slug === slug
              ? { ...line, qty }
              : line
          );
        });
      },
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