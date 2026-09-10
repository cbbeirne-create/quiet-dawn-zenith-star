import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as GRANTS, n as CATALOGUE_TIER, s as Shell, t as CATALOGUE_REVIEWED_AT } from "./layout-MNtIRKyI.mjs";
import { a as Select, r as Input, t as Badge } from "./ui-DUNcvnKN.mjs";
import { t as difficultyLabel } from "./format-9aZVa9dr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grants-CQ9exbnm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GrantsPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [agency, setAgency] = (0, import_react.useState)("all");
	const agencies = (0, import_react.useMemo)(() => [...new Set(GRANTS.map((g) => g.agency))], []);
	const list = GRANTS.filter((g) => {
		const hay = `${g.name} ${g.summary} ${g.agency} ${g.category}`.toLowerCase();
		if (q && !hay.includes(q.toLowerCase())) return false;
		if (agency !== "all" && g.agency !== agency) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-pine",
				children: "Catalogue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl md:text-4xl",
				children: "Every scheme in T4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: [
					"Independent of your profile. Match first if you want ranked eligibility. Catalogue snapshot",
					" ",
					CATALOGUE_REVIEWED_AT,
					" (",
					CATALOGUE_TIER,
					") — re-check the official URL before you apply."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search name, agency, topic"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: agency,
						onChange: (e) => setAgency(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All bodies"
						}), agencies.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: a,
							children: a
						}, a))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center text-sm text-muted",
						children: [list.length, " schemes"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3",
				children: list.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/grants/$id",
					params: { id: g.id },
					className: "block rounded-xl border border-border bg-surface p-5 hover:border-pine/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: g.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									g.agency,
									" · ",
									g.category
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: g.amountLabel })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 line-clamp-2 text-sm text-ink",
							children: g.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-subtle",
							children: [
								difficultyLabel(g.difficulty),
								" · ",
								g.deadlineNote
							]
						})
					]
				}, g.id))
			})
		]
	}) });
}
//#endregion
export { GrantsPage as component };
