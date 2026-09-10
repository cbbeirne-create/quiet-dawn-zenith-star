export function formatEuro(n: number) {
  if (n === 0) return "—";
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export function difficultyLabel(d: string) {
  if (d === "straightforward") return "Straightforward";
  if (d === "moderate") return "Moderate";
  return "Competitive";
}
