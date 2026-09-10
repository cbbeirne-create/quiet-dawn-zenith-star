import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as GRANTS, s as Shell } from "./layout-MNtIRKyI.mjs";
import { r as pct, t as difficultyLabel } from "./format-9aZVa9dr.mjs";
import { t as Disclaimer } from "./disclaimer-BE4dEcag.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intelligence-DgCpqUxY.js
var import_jsx_runtime = require_jsx_runtime();
function IntelligencePage() {
	const byAgency = Object.entries(GRANTS.reduce((acc, g) => {
		const cur = acc[g.agency] ?? {
			n: 0,
			win: 0
		};
		acc[g.agency] = {
			n: cur.n + 1,
			win: cur.win + g.winRate
		};
		return acc;
	}, {})).map(([name, v]) => ({
		name: name.replace("Local Enterprise Office", "LEO").replace("Enterprise Ireland", "EI"),
		schemes: v.n,
		win: Math.round(v.win / v.n * 100)
	}));
	const ranked = [...GRANTS].sort((a, b) => b.winRate - a.winRate);
	const windows = GRANTS.filter((g) => g.deadlineKind !== "rolling");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-pine",
				children: "Intelligence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl md:text-4xl",
				children: "Where applications actually land"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "Modelled success bands for this prototype — a T4 model, not an official statistic. Use them to sequence work, not to skip a scheme you clearly fit."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 h-72 rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs uppercase tracking-wide text-muted",
					children: "Average modelled win rate by body"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: byAgency,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 24
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								unit: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--color-surface)",
								border: "1px solid var(--color-border)",
								borderRadius: 8,
								color: "var(--color-ink)"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "win",
								fill: "var(--color-pine)",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 font-display text-2xl",
				children: "Timed windows"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Rolling schemes are always open. These need a call or cohort."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 md:grid-cols-2",
				children: windows.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/grants/$id",
					params: { id: g.id },
					className: "rounded-xl border border-border bg-surface p-4 hover:border-pine/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: g.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: g.deadlineNote
					})]
				}, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 font-display text-2xl",
				children: "Schemes by modelled success"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-2xl text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface text-xs uppercase tracking-wide text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Scheme"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Body"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Difficulty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Win rate"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/grants/$id",
									params: { id: g.id },
									className: "hover:text-pine",
									children: g.shortName
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted",
								children: g.agency
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: difficultyLabel(g.difficulty)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: pct(g.winRate)
							})
						]
					}, g.id)) })]
				})
			})
		]
	}) });
}
//#endregion
export { IntelligencePage as component };
