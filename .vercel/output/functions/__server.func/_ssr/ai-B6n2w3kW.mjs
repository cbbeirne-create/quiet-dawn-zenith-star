import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-CakHTwOa.mjs";
import { t as consumeAiCallForUser } from "./workspace-api-BMGfX7t3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-B6n2w3kW.js
var SYSTEM_DRAFT = "You draft Irish SME grant application sections. Be specific, plain, and credible. No emoji. No hype. Write as the applicant in first person plural. 180–280 words unless asked otherwise. Do not invent grant rates, deadlines, or eligibility. If a fact is missing, say so. Never claim the draft is ready to submit.";
var SYSTEM_BRIEF = "You are a grants advisor for Irish SMEs. Give a short action plan: top 3 schemes to start with, in order, with one sentence why and the first practical step. No emoji. Do not invent rates. Remind them to confirm with the awarding body. Not legal advice.";
async function chat(userId, system, prompt, maxTokens) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const cap = await consumeAiCallForUser(userId);
	if (!cap.ok) return cap;
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: maxTokens,
			temperature: .4,
			messages: [{
				role: "system",
				content: system
			}, {
				role: "user",
				content: prompt
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices[0]?.message.content ?? ""
	};
}
var draftSection_createServerFn_handler = createServerRpc({
	id: "7de8ab5fd00fcc250712d9578101b2dd9aad4753c53de419041284d134a1f71d",
	name: "draftSection",
	filename: "src/lib/ai.ts"
}, (opts) => draftSection.__executeServer(opts));
var draftSection = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(draftSection_createServerFn_handler, async ({ context, data }) => chat(context.userId, SYSTEM_DRAFT, data.prompt, 700));
var briefMatches_createServerFn_handler = createServerRpc({
	id: "30f47019f37fe17715843b826b6306377c722f6217b0fb36ab64538249603fc6",
	name: "briefMatches",
	filename: "src/lib/ai.ts"
}, (opts) => briefMatches.__executeServer(opts));
var briefMatches = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(briefMatches_createServerFn_handler, async ({ context, data }) => chat(context.userId, SYSTEM_BRIEF, data.prompt, 500));
//#endregion
export { briefMatches_createServerFn_handler, draftSection_createServerFn_handler };
