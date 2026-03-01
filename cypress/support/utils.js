// Normalize a Romanian price string to a JS number.
// E.g. "1.299,99 Lei" → 1299.99, "Total: 1.299,99 Lei" → 1299.99
export function normalizePrice(priceText) {
  // Extract the first price pattern (digits with . thousand separators and , decimal)
  const match = priceText.match(/[\d.]+,\d{2}/);
  if (!match) return NaN;

  return parseFloat(
    match[0]
      .replace(/\./g, "")  // Remove thousand separators
      .replace(",", ".")   // Replace decimal comma with dot
  );
}
