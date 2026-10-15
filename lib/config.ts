/** Store-wide settings. Change them here, not inside components. */
export const config = {
  currency: "NGN",
  shippingFee: 3500, // flat fee in naira
  freeShippingThreshold: 50_000, // orders at or above this ship free
  returnDays: 7,
  lowStockThreshold: 5,
} as const;

export function calculateShipping(subtotal: number) {
  return subtotal >= config.freeShippingThreshold || subtotal === 0
    ? 0
    : config.shippingFee;
}
