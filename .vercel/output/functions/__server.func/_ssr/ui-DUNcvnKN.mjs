import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DUNcvnKN.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-opacity duration-150 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] min-h-11", {
	variants: {
		variant: {
			primary: "bg-pine text-surface hover:opacity-90",
			ink: "bg-ink text-surface hover:opacity-90",
			outline: "border border-line bg-surface text-ink hover:bg-pine-soft/40",
			ghost: "text-ink hover:bg-pine-soft/50"
		},
		size: {
			md: "rounded-md px-4 text-sm",
			lg: "rounded-lg px-5 text-base",
			sm: "rounded-sm px-3 text-sm min-h-9"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Badge({ children, tone = "default", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
			default: "bg-pine-soft text-pine-deep",
			ok: "bg-pine-soft text-pine",
			warn: "bg-border text-warn",
			muted: "bg-border/60 text-muted"
		}[tone], className),
		children
	});
}
function Input(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: cn("h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-subtle outline-none focus:border-pine", props.className)
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: cn("h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-pine", props.className)
	});
}
function Textarea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: cn("w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-subtle outline-none focus:border-pine", props.className)
	});
}
function Label({ children, htmlFor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor,
		className: "mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase",
		children
	});
}
//#endregion
export { Select as a, Label as i, Button as n, Textarea as o, Input as r, Badge as t };
