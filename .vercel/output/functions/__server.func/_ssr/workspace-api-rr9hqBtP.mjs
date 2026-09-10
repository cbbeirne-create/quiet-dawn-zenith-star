import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-CakHTwOa.mjs";
import { r as getSql } from "./db-DCMnXnsA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-api-rr9hqBtP.js
function parseJson(raw, fallback) {
	try {
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
var getWorkspace_createServerFn_handler = createServerRpc({
	id: "6e86303c7e1c6328c5da86d438f017683643d2919ccae4a165b90302c9c336e4",
	name: "getWorkspace",
	filename: "src/lib/workspace-api.ts"
}, (opts) => getWorkspace.__executeServer(opts));
var getWorkspace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getWorkspace_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const uid = context.userId;
	const profiles = await sql`
      select profile from t4_profiles where user_id = ${uid}
    `;
	const apps = await sql`
      select id, grant_id, status, sections, checked_docs, notes,
             created_at::text as created_at, updated_at::text as updated_at
      from t4_applications
      where user_id = ${uid}
      order by updated_at desc
    `;
	const saved = await sql`
      select grant_id from t4_saved where user_id = ${uid}
    `;
	return {
		profile: profiles[0] ? parseJson(profiles[0].profile, null) : null,
		applications: apps.map((a) => ({
			id: a.id,
			grantId: a.grant_id,
			status: a.status,
			sections: parseJson(a.sections, []),
			checkedDocs: parseJson(a.checked_docs, []),
			notes: a.notes,
			createdAt: a.created_at,
			updatedAt: a.updated_at
		})),
		savedIds: saved.map((s) => s.grant_id)
	};
});
var saveWorkspace_createServerFn_handler = createServerRpc({
	id: "378066d238cb9e3aee3c1d2cb2b811c185afe85e0d664d31ebf80df347e23ace",
	name: "saveWorkspace",
	filename: "src/lib/workspace-api.ts"
}, (opts) => saveWorkspace.__executeServer(opts));
var saveWorkspace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveWorkspace_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const uid = context.userId;
	const profileJson = JSON.stringify(data.profile);
	await sql`
      insert into t4_profiles (user_id, profile, updated_at)
      values (${uid}, ${profileJson}, now())
      on conflict (user_id) do update set profile = ${profileJson}, updated_at = now()
    `;
	await sql`delete from t4_applications where user_id = ${uid}`;
	for (const app of data.applications) await sql`
        insert into t4_applications
          (id, user_id, grant_id, status, sections, checked_docs, notes, created_at, updated_at)
        values (
          ${app.id}, ${uid}, ${app.grantId}, ${app.status},
          ${JSON.stringify(app.sections)}, ${JSON.stringify(app.checkedDocs)},
          ${app.notes}, ${app.createdAt}, ${app.updatedAt}
        )
      `;
	await sql`delete from t4_saved where user_id = ${uid}`;
	for (const grantId of data.savedIds) await sql`insert into t4_saved (user_id, grant_id) values (${uid}, ${grantId})`;
	return { ok: true };
});
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
var consumeAiCall_createServerFn_handler = createServerRpc({
	id: "e35be05ff2a202d0dc394355a2d59474c3512cdb42141d010d1cfb668d861641",
	name: "consumeAiCall",
	filename: "src/lib/workspace-api.ts"
}, (opts) => consumeAiCall.__executeServer(opts));
var consumeAiCall = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(consumeAiCall_createServerFn_handler, async ({ context }) => consumeAiCallForUser(context.userId));
//#endregion
export { consumeAiCall_createServerFn_handler, getWorkspace_createServerFn_handler, saveWorkspace_createServerFn_handler };
