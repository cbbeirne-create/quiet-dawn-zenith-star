//#region node_modules/.nitro/vite/services/ssr/assets/format-9aZVa9dr.js
function formatEuro(n) {
	if (n === 0) return "—";
	return new Intl.NumberFormat("en-IE", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0
	}).format(n);
}
function pct(n) {
	return `${Math.round(n * 100)}%`;
}
function difficultyLabel(d) {
	if (d === "straightforward") return "Straightforward";
	if (d === "moderate") return "Moderate";
	return "Competitive";
}
//#endregion
export { formatEuro as n, pct as r, difficultyLabel as t };
