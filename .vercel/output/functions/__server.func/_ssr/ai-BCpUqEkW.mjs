import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CakHTwOa.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-BCpUqEkW.js
var draftSection = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("7de8ab5fd00fcc250712d9578101b2dd9aad4753c53de419041284d134a1f71d"));
var briefMatches = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("30f47019f37fe17715843b826b6306377c722f6217b0fb36ab64538249603fc6"));
//#endregion
export { draftSection as n, briefMatches as t };
