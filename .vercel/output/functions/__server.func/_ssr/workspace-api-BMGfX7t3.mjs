import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CakHTwOa.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { r as getSql } from "./db-DCMnXnsA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-api-BMGfX7t3.js
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6e86303c7e1c6328c5da86d438f017683643d2919ccae4a165b90302c9c336e4"));
var saveWorkspace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("378066d238cb9e3aee3c1d2cb2b811c185afe85e0d664d31ebf80df347e23ace"));
var DAILY_AI_CAP = 20;
async function consumeAiCallForUser(userId) {
	const sql = await getSql();
	const used = (await sql`
    select calls from t4_ai_usage where user_id = ${userId} and day = current_date
  `)[0]?.calls ?? 0;
	if (used >= DAILY_AI_CAP) return {
		ok: false,
		error: `Daily AI limit of ${DAILY_AI_CAP} drafts reached.`
	};
	await sql`
    insert into t4_ai_usage (user_id, day, calls)
    values (${userId}, current_date, 1)
    on conflict (user_id, day) do update set calls = t4_ai_usage.calls + 1
  `;
	return {
		ok: true,
		remaining: DAILY_AI_CAP - used - 1
	};
}
createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("e35be05ff2a202d0dc394355a2d59474c3512cdb42141d010d1cfb668d861641"));
//#endregion
export { getWorkspace as n, saveWorkspace as r, consumeAiCallForUser as t };
