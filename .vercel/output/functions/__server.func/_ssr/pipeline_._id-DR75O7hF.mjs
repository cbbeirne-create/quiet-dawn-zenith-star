import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getGrant, l as useCurrentUserState, s as Shell, u as useT4 } from "./layout-MNtIRKyI.mjs";
import { a as Select, n as Button, o as Textarea, t as Badge } from "./ui-DUNcvnKN.mjs";
import { n as Route$1 } from "./router-aRvv0pES.mjs";
import { t as Disclaimer } from "./disclaimer-BE4dEcag.mjs";
import { n as draftSection } from "./ai-BCpUqEkW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pipeline_._id-DR75O7hF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(() => useT4.persist.hasHydrated());
	(0, import_react.useEffect)(() => {
		setHydrated(useT4.persist.hasHydrated());
		return useT4.persist.onFinishHydration(() => setHydrated(true));
	}, []);
	return hydrated;
}
var STATUSES = [
	"draft",
	"in_review",
	"submitted",
	"awarded",
	"declined"
];
function unauthorized(e) {
	return String(e).toLowerCase().includes("unauthorized");
}
function AppWorkspace() {
	const { id } = Route$1.useParams();
	const hydrated = useHydrated();
	const { user, isPending } = useCurrentUserState();
	const app = useT4((s) => s.applications.find((a) => a.id === id));
	const setSection = useT4((s) => s.setSection);
	const toggleDoc = useT4((s) => s.toggleDoc);
	const setStatus = useT4((s) => s.setStatus);
	const update = useT4((s) => s.updateApplication);
	const profile = useT4((s) => s.profile);
	const [active, setActive] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (app && !active) setActive(app.sections[0]?.id ?? "");
	}, [app, active]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-4 py-16 text-muted",
		children: "Loading workspace…"
	}) });
	if (!app) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Application not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pipeline",
			className: "mt-4 inline-block text-pine",
			children: "Pipeline"
		})]
	}) });
	const grant = getGrant(app.grantId);
	const appId = app.id;
	const grantId = app.grantId;
	const sections = app.sections;
	const checkedDocs = app.checkedDocs;
	const section = app.sections.find((s) => s.id === active) ?? app.sections[0];
	const hint = grant?.sections.find((s) => s.id === section?.id)?.hint ?? "";
	async function draft() {
		if (!section || !grant) return;
		if (!isPending && !user) {
			setErr("Sign in to draft with Grok.");
			return;
		}
		setBusy(true);
		setErr(null);
		const prompt = `Write the "${section.title}" section of an Irish ${grant.name} application.
Agency: ${grant.agency}. Amount label: ${grant.amountLabel}. Deadline: ${grant.deadlineNote}.
Hint: ${hint}.
Company: ${profile?.companyName ?? "an Irish SME"}, ${profile?.form ?? "limited"}, ${profile?.employees ?? "?"} staff, ${profile?.sector ?? "software"} in ${profile?.region ?? "Ireland"}.
Description: ${profile?.description || "Early product company."}
Current draft (improve or replace): ${section.content || "(empty)"}
Do not invent rates. Leave blanks rather than guess official figures.`;
		try {
			const res = await draftSection({ data: { prompt } });
			if (!res.ok) setErr(res.error);
			else setSection(appId, section.id, res.text);
		} catch (e) {
			setErr(unauthorized(e) ? "Sign in to draft with Grok." : "Draft failed.");
		} finally {
			setBusy(false);
		}
	}
	function download() {
		const body = [
			grant?.name ?? grantId,
			grant?.agency ?? "",
			"",
			...sections.map((s) => `## ${s.title}\n\n${s.content || "(empty)"}\n`),
			"Documents: " + (checkedDocs.join("; ") || "none ticked"),
			"",
			"Generated in T4 Grants as a draft. Edit before submitting. Confirm with the awarding body."
		].join("\n");
		const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${grant?.shortName ?? "draft"}.txt`;
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/pipeline",
				className: "text-sm text-muted hover:text-ink",
				children: "Pipeline"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: grant?.name ?? "Application"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: grant?.agency
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: app.status,
							onChange: (e) => setStatus(app.id, e.target.value),
							className: "w-40",
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s.replace("_", " ")
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: grant?.amountLabel }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: download,
							children: "Download draft"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { compact: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[240px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-1",
					children: [app.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActive(s.id),
						className: `flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm ${s.id === section?.id ? "bg-pine text-surface" : "border border-border bg-surface"}`,
						children: [s.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs opacity-70",
							children: s.content.trim() ? "drafted" : ""
						})]
					}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted",
							children: "Documents"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-2",
							children: (grant?.documents ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "mt-1 accent-pine",
									checked: app.checkedDocs.includes(d),
									onChange: () => toggleDoc(app.id, d)
								}), d]
							}) }, d))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [section && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: section.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: hint
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ink",
							onClick: draft,
							disabled: busy,
							children: busy ? "Drafting…" : "Draft with Grok"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: "AI draft — edit before you submit. Daily cap applies when signed in."
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-danger",
						children: [
							err,
							" ",
							!user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "underline",
								children: "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-4 min-h-72",
						value: section.content,
						onChange: (e) => setSection(app.id, section.id, e.target.value),
						placeholder: "Write this section, or sign in and ask Grok to draft from your company profile."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-muted",
						children: "Internal notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-2 min-h-24",
						value: app.notes,
						onChange: (e) => update(app.id, { notes: e.target.value }),
						placeholder: "Deadlines, advisor names, committee dates."
					})]
				})] })]
			})
		]
	}) });
}
//#endregion
export { AppWorkspace as component };
