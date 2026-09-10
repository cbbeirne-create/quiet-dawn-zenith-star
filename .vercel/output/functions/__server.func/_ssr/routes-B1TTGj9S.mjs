import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getGrant, i as GRANTS, s as Shell, u as useT4 } from "./layout-MNtIRKyI.mjs";
import { n as Button } from "./ui-DUNcvnKN.mjs";
import { n as formatEuro } from "./format-9aZVa9dr.mjs";
import { n as PenLine, o as Check, r as Layers, s as ChartLine, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as DEMO_PROFILE } from "./matching-BOX-B8hs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B1TTGj9S.js
var import_jsx_runtime = require_jsx_runtime();
var FEATURED = [
	"innovation-voucher",
	"grow-digital",
	"leo-feasibility",
	"agile-innovation",
	"rd-tax",
	"seai-sme"
];
function Home() {
	const agencies = [...new Set(GRANTS.map((g) => g.agency))];
	const pool = GRANTS.reduce((s, g) => s + g.amountMax, 0);
	const setProfile = useT4((s) => s.setProfile);
	const start = useT4((s) => s.startApplication);
	const nav = useNavigate();
	function loadDemo() {
		try {
			setProfile(DEMO_PROFILE);
			for (const id of [
				"innovation-voucher",
				"exploring-innovation",
				"agile-innovation"
			]) start(id);
		} catch {}
		nav({
			to: "/match",
			search: { demo: true }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-8 pt-10 md:pt-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-pine",
					children: "Irish SME funding"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.12] tracking-tight md:text-6xl",
					children: "The operating system for winning Irish grants."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg",
					children: "Match your company to LEO, Enterprise Ireland, SEAI and tax supports. See knockout rules before you waste a week. Draft in a workspace, not another PDF."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/match",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							children: ["Match my company", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "outline",
						onClick: loadDemo,
						children: "Load demo company"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4",
					children: [
						[String(GRANTS.length), "Schemes in the catalogue"],
						[String(agencies.length), "Awarding bodies"],
						[formatEuro(pool), "Headline support mapped"],
						["Knockouts", "Shown before you apply"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-surface px-5 py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-display text-2xl text-ink",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm text-muted",
							children: v
						})]
					}, v))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl md:text-3xl",
				children: "How T4 works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 md:grid-cols-3",
				children: [
					{
						icon: Layers,
						title: "Match",
						body: "A five-minute company profile against hard eligibility, goals, region and modelled win rates."
					},
					{
						icon: PenLine,
						title: "Workspace",
						body: "Structured sections, document checklists, status, and a Grok draft for the blank page."
					},
					{
						icon: ChartLine,
						title: "Intelligence",
						body: "Typical awards and success bands by scheme — so you start where the odds are honest."
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-5 text-pine" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: s.body
						})
					]
				}, s.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl md:text-3xl",
					children: "Start with these"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/grants",
					className: "text-sm text-pine hover:underline",
					children: "Full catalogue"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: FEATURED.map((id) => {
					const g = getGrant(id);
					if (!g) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/grants/$id",
						params: { id },
						className: "rounded-xl border border-border bg-surface p-5 transition-colors hover:border-pine/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-muted",
								children: g.agency
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-xl",
								children: g.shortName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium text-pine",
								children: g.amountLabel
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-muted",
								children: g.summary
							})
						]
					}, id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-pine-deep px-6 py-8 text-surface md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-pine-soft",
						children: "How we would fund T4 itself"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-2xl md:text-3xl",
						children: "Innovation Voucher, then Agile — not Grow Digital."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-pine-soft",
						children: "Building this product is bespoke software. The voucher funds a knowledge-provider prototype. Agile funds the build once the company is trading. Grow Digital is for off-the-shelf tools, so it is the wrong first ask."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/grants/$id",
							params: { id: "innovation-voucher" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "bg-surface text-pine-deep hover:opacity-90",
								children: "Innovation Voucher"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/grants/$id",
							params: { id: "agile-innovation" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "border-pine-soft/50 bg-transparent text-surface hover:bg-pine",
								children: "Agile Innovation"
							})
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-6 pb-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl md:text-3xl",
				children: "Covered in this prototype"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid gap-2 sm:grid-cols-2",
				children: [
					"LEO Feasibility, Priming, Expansion, Grow Digital, Digital for Business",
					"Innovation Voucher, Agile Innovation, Exploring Innovation, Partnerships",
					"CSF, Pre-Seed, GradStart, New Markets Validation",
					"SEAI energy upgrades, GreenStart, Climate Action Voucher",
					"R&D Tax Credit",
					"Skillnet, MentorsWork, LEADER, Creative Ireland"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-sm text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-pine" }), t]
				}, t))
			})]
		})
	] });
}
//#endregion
export { Home as component };
