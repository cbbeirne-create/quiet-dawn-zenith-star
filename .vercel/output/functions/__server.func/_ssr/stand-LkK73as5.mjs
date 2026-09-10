import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as GRANTS, s as Shell } from "./layout-MNtIRKyI.mjs";
import { t as Badge } from "./ui-DUNcvnKN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stand-LkK73as5.js
var import_jsx_runtime = require_jsx_runtime();
var SCORECARD = [
	{
		item: "Match → knockout → workspace → Grok draft",
		now: "Working",
		tone: "ok"
	},
	{
		item: "24-scheme catalogue, 7 bodies",
		now: "Hardcoded snapshot 6 Sep 2026",
		tone: "warn"
	},
	{
		item: "Demo company (Greenfield Robotics)",
		now: "Working",
		tone: "ok"
	},
	{
		item: "Desktop + mobile UI",
		now: "Ships",
		tone: "ok"
	},
	{
		item: "Accounts / login",
		now: "On — Google, X, email",
		tone: "ok"
	},
	{
		item: "Saved pipelines",
		now: "Account DB + guest browser copy",
		tone: "ok"
	},
	{
		item: "Plain-text draft export",
		now: "Download from workspace",
		tone: "ok"
	},
	{
		item: "Payments",
		now: "Not built",
		tone: "muted"
	},
	{
		item: "Matching unit tests",
		now: "Knockouts + catalogue integrity",
		tone: "ok"
	},
	{
		item: "AI rate limit + fact-grounding",
		now: "20/day, signed-in, grounded prompt",
		tone: "ok"
	},
	{
		item: "Privacy policy, terms",
		now: "Prototype pages live",
		tone: "warn"
	},
	{
		item: "t4.ie live on HTTPS",
		now: "Founder: domain + hosting",
		tone: "muted"
	},
	{
		item: "CRO company",
		now: "Founder — required before EI voucher",
		tone: "muted"
	},
	{
		item: "Willing to demo to a LEO",
		now: "Yes, as a prototype",
		tone: "ok"
	}
];
var PHASES = [
	{
		name: "Phase 0 — Founder",
		items: [
			"Buy t4.ie and a mailbox on that domain",
			"Incorporate a limited company",
			"Re-read every official URL in the catalogue",
			"Solicitor: terms + privacy"
		]
	},
	{
		name: "Phase 1 — Harden (build next)",
		items: [
			"Accounts + EU database + saved pipelines",
			"Knockout tests + catalogue review dates",
			"AI spend cap, rate limit, AI-draft label",
			"Legal pages on every match",
			"Publish to t4.ie labelled beta if needed"
		]
	},
	{
		name: "Phase 2 — First revenue",
		items: [
			"Stripe Pro plan",
			"PDF export",
			"20 design partners",
			"File uploads"
		]
	},
	{
		name: "Phase 3 — Moat",
		items: [
			"Advisor seats",
			"Awarded / declined outcomes",
			"Post-award calendar",
			"County LEO packs"
		]
	}
];
function StandPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-pine",
				children: "Internal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl md:text-4xl",
				children: "Where T4 stands"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Prototype with accounts. The distinctive loop is real. Catalogue still needs a human re-read of every official URL the week you launch. Solicitor has not settled the legal pages."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4",
				children: [
					[String(GRANTS.length), "Schemes in demo"],
					["7", "Awarding bodies"],
					["0", "Paying users"],
					["Beta", "Label until catalogue re-read"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-surface px-4 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "font-display text-2xl text-ink",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-xs text-muted",
						children: v
					})]
				}, v))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 font-display text-2xl",
				children: "Scorecard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface",
				children: SCORECARD.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-baseline justify-between gap-2 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: row.item
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: row.tone,
						children: row.now
					})]
				}, row.item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 font-display text-2xl",
				children: "Sequence to production"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3",
				children: PHASES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 list-decimal space-y-1 pl-5 text-sm text-muted",
						children: p.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i }, i))
					})]
				}, p.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 font-display text-2xl",
				children: "v1 means all of this"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 list-disc space-y-2 pl-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A limited company owns the product and the domain." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A company can save work across devices." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Every scheme has a review date; official pages win over T4 copy." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Knockouts are conservative and tested. Unsure → “check with the agency”." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "AI is labelled, rate-limited, and never submitted as the application." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You would demo this to a LEO without apologising for the data." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-muted",
				children: [
					"Next: solicitor pass, t4.ie, catalogue URL re-read, then billing.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/match",
						search: { demo: true },
						className: "text-pine hover:underline",
						children: "Run the demo"
					}),
					"."
				]
			})
		]
	}) });
}
//#endregion
export { StandPage as component };
