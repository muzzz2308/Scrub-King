export const SHIPPING_FEE = 200;
export const FREE_SHIPPING_PACK_ID = "family-6";

export function qualifiesForFreeShipping(items) {
  return items.some(({ pack, qty }) => pack?.id === FREE_SHIPPING_PACK_ID && qty > 0);
}

export function getShipping(items) {
  if (!items.length || qualifiesForFreeShipping(items)) return 0;
  return SHIPPING_FEE;
}
