import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as getGrant, s as Shell, u as useT4 } from "./layout-MNtIRKyI.mjs";
import { n as Button, t as Badge } from "./ui-DUNcvnKN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pipeline-BpMPhjyM.js
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"draft",
	"in_review",
	"submitted",
	"awarded",
	"declined"
];
function PipelinePage() {
	const applications = useT4((s) => s.applications);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-pine",
				children: "Workspace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl md:text-4xl",
				children: "Application pipeline"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-muted",
				children: "Sign in to keep drafts across devices. Guests still get a copy in this browser."
			}),
			applications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-xl border border-dashed border-line bg-surface p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "No applications yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Match your company, then open a workspace. Sign in to keep drafts across devices."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/match",
						className: "mt-5 inline-block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Go to matching" })
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3",
				children: applications.map((a) => {
					const g = getGrant(a.grantId);
					const filled = a.sections.filter((s) => s.content.trim()).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pipeline/$id",
						params: { id: a.id },
						className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: g?.name ?? a.grantId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								filled,
								"/",
								a.sections.length,
								" sections · ",
								a.checkedDocs.length,
								" docs"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: a.status === "awarded" ? "ok" : a.status === "declined" ? "warn" : "muted",
							children: STATUSES.includes(a.status) ? a.status.replace("_", " ") : a.status
						})]
					}, a.id);
				})
			})
		]
	}) });
}
//#endregion
export { PipelinePage as component };
