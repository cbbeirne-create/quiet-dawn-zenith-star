import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as REGION_LABELS, l as useCurrentUserState, o as SECTOR_LABELS, r as GOAL_LABELS, s as Shell, u as useT4 } from "./layout-MNtIRKyI.mjs";
import { a as Select, i as Label, n as Button, o as Textarea, r as Input, t as Badge } from "./ui-DUNcvnKN.mjs";
import { r as pct, t as difficultyLabel } from "./format-9aZVa9dr.mjs";
import { a as CircleAlert, c as Bookmark, i as CircleCheck, l as BookmarkCheck } from "../_libs/lucide-react.mjs";
import { i as Route$7 } from "./router-aRvv0pES.mjs";
import { t as Disclaimer } from "./disclaimer-BE4dEcag.mjs";
import { n as matchGrants, t as DEMO_PROFILE } from "./matching-BOX-B8hs.mjs";
import { t as briefMatches } from "./ai-BCpUqEkW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/match-HxPzW7S3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOALS = Object.keys(GOAL_LABELS);
var DEMO_GRANTS = [
	"innovation-voucher",
	"exploring-innovation",
	"agile-innovation"
];
function unauthorized(e) {
	return String(e).toLowerCase().includes("unauthorized");
}
function MatchPage() {
	const { demo } = Route$7.useSearch();
	const { user, isPending } = useCurrentUserState();
	const setProfile = useT4((s) => s.setProfile);
	const start = useT4((s) => s.startApplication);
	const nav = useNavigate();
	const [step, setStep] = (0, import_react.useState)(demo ? "results" : "form");
	const [form, setForm] = (0, import_react.useState)(demo ? DEMO_PROFILE : emptyProfile());
	const [brief, setBrief] = (0, import_react.useState)(null);
	const [briefErr, setBriefErr] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const acted = (0, import_react.useRef)(Boolean(demo));
	const seeded = (0, import_react.useRef)(false);
	function seedDemoWorkspace() {
		if (seeded.current) return;
		seeded.current = true;
		try {
			for (const id of DEMO_GRANTS) start(id);
			toast.message("Demo workspace seeded with three drafts.");
		} catch {
			toast.message("Demo company loaded.");
		}
	}
	function runMatch(p, seedDemo = false) {
		acted.current = true;
		setForm(p);
		setBrief(null);
		setStep("results");
		try {
			setProfile(p);
		} catch {}
		if (seedDemo) seedDemoWorkspace();
	}
	(0, import_react.useEffect)(() => {
		if (demo) {
			runMatch(DEMO_PROFILE, true);
			return;
		}
		const apply = () => {
			if (acted.current) return;
			const p = useT4.getState().profile;
			if (p) {
				setForm(p);
				setStep("results");
			}
		};
		apply();
		return useT4.persist.onFinishHydration(apply);
	}, [demo]);
	const results = (0, import_react.useMemo)(() => step === "results" ? matchGrants(form) : [], [step, form]);
	const eligible = results.filter((r) => r.eligible);
	const blocked = results.filter((r) => !r.eligible);
	const top = eligible.slice(0, 3);
	async function askBrief() {
		if (!isPending && !user) {
			setBriefErr("Sign in to generate an AI action plan.");
			return;
		}
		setLoading(true);
		setBriefErr(null);
		const prompt = `Company: ${form.companyName}, ${form.form}, ${form.employees} staff, ${form.tradingMonths} months trading, ${form.region}, ${form.sector}. Goals: ${form.goals.join(", ")}. EI client: ${form.eiClient}. Description: ${form.description}. Top matches: ${eligible.slice(0, 6).map((t) => `${t.grant.name} (score ${t.score}, ${t.grant.amountLabel})`).join("; ")}.`;
		try {
			const res = await briefMatches({ data: { prompt } });
			if (!res.ok) setBriefErr(res.error);
			else setBrief(res.text);
		} catch (e) {
			setBriefErr(unauthorized(e) ? "Sign in to generate an AI action plan." : "Could not draft a plan.");
		} finally {
			setLoading(false);
		}
	}
	function loadDemo() {
		nav({
			to: "/match",
			search: { demo: true }
		});
		runMatch(DEMO_PROFILE, true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-pine",
				children: "Matching"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl md:text-4xl",
					children: "Find the schemes that fit."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted",
					children: "Hard knockouts first. Then a score from goals, size, region and modelled success."
				})] }), step === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "lg",
					onClick: loadDemo,
					children: "Use demo company"
				})]
			}),
			step === "form" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, {
				form,
				setForm,
				onSubmit: () => runMatch(form),
				onDemo: loadDemo
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: form.companyName || "Your company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								form.employees,
								" staff · ",
								SECTOR_LABELS[form.sector],
								" · ",
								REGION_LABELS[form.region]
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => {
									acted.current = true;
									setStep("form");
									if (demo) nav({
										to: "/match",
										search: {}
									});
								},
								children: "Edit profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ink",
								onClick: askBrief,
								disabled: loading,
								children: loading ? "Briefing…" : "AI action plan"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true })
					}),
					briefErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-danger",
						children: briefErr
					}),
					brief && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 whitespace-pre-wrap rounded-xl border border-pine-soft bg-surface p-5 text-sm leading-relaxed",
						children: brief
					}),
					top.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-xl border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: "Recommended sequence"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-3 space-y-2",
							children: top.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-pine",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: m.grant.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" — ", m.grant.nextSteps[0]]
								})] })]
							}, m.grant.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-sm text-muted",
						children: [
							eligible.length,
							" open paths · ",
							blocked.length,
							" currently blocked"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4",
						children: eligible.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchCard, { m }, m.grant.id))
					}),
					blocked.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-12 font-display text-2xl",
							children: "Currently blocked"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Shown so you know what would unlock them — company form, stage, or client status."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3",
							children: blocked.slice(0, 8).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchCard, {
								m,
								compact: true
							}, m.grant.id))
						})
					] })
				]
			})
		]
	}) });
}
function emptyProfile() {
	return {
		companyName: "",
		form: "limited",
		stage: "established",
		employees: 5,
		tradingMonths: 24,
		region: "dublin",
		sector: "software",
		goals: ["rd", "digital"],
		eiClient: false,
		description: ""
	};
}
function ProfileForm({ form, setForm, onSubmit, onDemo }) {
	const patch = (p) => setForm({
		...form,
		...p
	});
	function toggleGoal(g) {
		patch({ goals: form.goals.includes(g) ? form.goals.filter((x) => x !== g) : [...form.goals, g] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-5 rounded-xl border border-border bg-surface p-5 md:p-8",
			onSubmit: (e) => {
				e.preventDefault();
				onSubmit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Company name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								required: true,
								value: form.companyName,
								onChange: (e) => patch({ companyName: e.target.value }),
								placeholder: "e.g. Greenfield Robotics Ltd"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "form",
							children: "Legal form"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							id: "form",
							value: form.form,
							onChange: (e) => patch({ form: e.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "limited",
									children: "Limited company"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sole",
									children: "Sole trader"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "partnership",
									children: "Partnership"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "stage",
							children: "Stage"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							id: "stage",
							value: form.stage,
							onChange: (e) => patch({ stage: e.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "idea",
									children: "Pre-trading / idea"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "startup",
									children: "Startup (≤18 months)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "established",
									children: "Established"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "emp",
							children: "Employees"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "emp",
							type: "number",
							min: 0,
							value: form.employees,
							onChange: (e) => patch({ employees: Number(e.target.value) })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "months",
							children: "Months trading"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "months",
							type: "number",
							min: 0,
							value: form.tradingMonths,
							onChange: (e) => patch({ tradingMonths: Number(e.target.value) })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "region",
							children: "Region"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							id: "region",
							value: form.region,
							onChange: (e) => patch({ region: e.target.value }),
							children: Object.entries(REGION_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: v
							}, k))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "sector",
							children: "Sector"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							id: "sector",
							value: form.sector,
							onChange: (e) => patch({ sector: e.target.value }),
							children: Object.entries(SECTOR_LABELS).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: v
							}, k))
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "What are you funding?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex flex-wrap gap-2",
					children: GOALS.map((g) => {
						const on = form.goals.includes(g);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleGoal(g),
							className: `min-h-11 rounded-full border px-3 text-sm ${on ? "border-pine bg-pine-soft text-pine-deep" : "border-line bg-bg text-muted"}`,
							children: GOAL_LABELS[g]
						}, g);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: form.eiClient,
						onChange: (e) => patch({ eiClient: e.target.checked }),
						className: "size-4 accent-pine"
					}), "Already an Enterprise Ireland client"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "desc",
					children: "What you do (optional)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "desc",
					rows: 3,
					value: form.description,
					onChange: (e) => patch({ description: e.target.value }),
					placeholder: "Product, customers, and the project you want funded."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					children: "See matches"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				"Or skip the form —",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onDemo,
					className: "font-medium text-pine underline-offset-2 hover:underline",
					children: "use the Greenfield Robotics demo"
				}),
				"."
			]
		})]
	});
}
function MatchCard({ m, compact }) {
	const saved = useT4((s) => s.savedIds.includes(m.grant.id));
	const toggle = useT4((s) => s.toggleSaved);
	const start = useT4((s) => s.startApplication);
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: m.grant.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: m.eligible ? "ok" : "warn",
						children: m.eligible ? "No knockout" : "Blocked"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						m.grant.agency,
						" · ",
						m.grant.amountLabel,
						" · ",
						difficultyLabel(m.grant.difficulty)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xl tabular-nums text-pine",
						children: m.score
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "fit score"
					})]
				})]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-ink",
					children: m.grant.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1",
					children: m.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `flex items-start gap-2 text-sm ${r.ok ? "text-muted" : "text-danger"}`,
						children: [
							r.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 size-4 shrink-0 text-pine" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-4 shrink-0" }),
							r.knockout && !r.ok ? "Knockout — " : "",
							r.label
						]
					}, r.label))
				}),
				m.fitNotes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-subtle",
					children: m.fitNotes.join(" ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-subtle",
					children: [
						"T4 model success band ",
						pct(m.grant.winRate),
						" — not an official rate"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/grants/$id",
						params: { id: m.grant.id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							children: "Scheme detail"
						})
					}),
					m.eligible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => {
							const app = start(m.grant.id);
							toast.message("Workspace opened");
							nav({
								to: "/pipeline/$id",
								params: { id: app.id }
							});
						},
						children: "Open workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => toggle(m.grant.id),
						children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), saved ? "Saved" : "Save"]
					})
				]
			})
		]
	});
}
//#endregion
export { MatchPage as component };
