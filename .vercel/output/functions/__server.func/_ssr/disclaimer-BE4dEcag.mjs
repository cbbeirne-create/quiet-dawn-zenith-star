import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/disclaimer-BE4dEcag.js
var import_jsx_runtime = require_jsx_runtime();
function Disclaimer({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-xs leading-relaxed text-subtle",
		children: [
			compact ? "" : "T4 is not LEO, Enterprise Ireland, Revenue or SEAI. ",
			"“Eligible” means T4 found no knockout in its current rules — not a decision. Amounts and win rates are a T4 model. Confirm every scheme on the official page before you apply.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/terms",
				className: "text-pine hover:underline",
				children: "Terms"
			})
		]
	});
}
//#endregion
export { Disclaimer as t };
