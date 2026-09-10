import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getGrant, s as Shell, t as CATALOGUE_REVIEWED_AT, u as useT4 } from "./layout-MNtIRKyI.mjs";
import { n as Button, t as Badge } from "./ui-DUNcvnKN.mjs";
import { r as pct, t as difficultyLabel } from "./format-9aZVa9dr.mjs";
import { r as Route$2 } from "./router-aRvv0pES.mjs";
import { t as Disclaimer } from "./disclaimer-BE4dEcag.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grants_._id-DBnYTa3J.js
var import_jsx_runtime = require_jsx_runtime();
function GrantDetail() {
	const { id } = Route$2.useParams();
	const grant = getGrant(id);
	const start = useT4((s) => s.startApplication);
	const nav = useNavigate();
	if (!grant) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Scheme not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/grants",
			className: "mt-4 inline-block text-pine",
			children: "Back to catalogue"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/grants",
				className: "text-sm text-muted hover:text-ink",
				children: "Catalogue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs uppercase tracking-[0.18em] text-pine",
				children: grant.agency
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: grant.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: grant.amountLabel }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "muted",
						children: difficultyLabel(grant.difficulty)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "ok",
						children: [pct(grant.winRate), " T4 model band"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-base leading-relaxed",
				children: grant.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-subtle",
				children: [
					"Catalogue snapshot ",
					CATALOGUE_REVIEWED_AT,
					". Official source always wins."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-wide text-muted",
						children: "Typical award"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-medium",
						children: grant.typicalAward
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-wide text-muted",
						children: "Deadline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-medium",
						children: grant.deadlineNote
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "What it covers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 list-disc space-y-1 pl-5 text-sm",
				children: grant.covers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Eligibility rules T4 checks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 text-sm",
				children: grant.rules.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md border border-border bg-surface px-3 py-2",
					children: [r.label, r.knockout ? " — knockout" : ""]
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "First steps"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 list-decimal space-y-1 pl-5 text-sm",
				children: grant.nextSteps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-2xl",
				children: "Documents"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 list-disc space-y-1 pl-5 text-sm",
				children: grant.documents.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d }, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						const app = start(grant.id);
						nav({
							to: "/pipeline/$id",
							params: { id: app.id }
						});
					},
					children: "Open application workspace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: grant.officialUrl,
					target: "_blank",
					rel: "noreferrer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Official source"
					})
				})]
			})
		]
	}) });
}
//#endregion
export { GrantDetail as component };
