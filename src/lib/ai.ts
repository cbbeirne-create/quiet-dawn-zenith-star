import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { consumeAiCallForUser } from "./workspace-api";

const SYSTEM_DRAFT =
  "You draft Irish SME grant application sections. Be specific, plain, and credible. No emoji. No hype. Write as the applicant in first person plural. 180–280 words unless asked otherwise. Do not invent grant rates, deadlines, or eligibility. If a fact is missing, say so. Never claim the draft is ready to submit.";

const SYSTEM_BRIEF =
  "You are a grants advisor for Irish SMEs. Give a short action plan: top 3 schemes to start with, in order, with one sentence why and the first practical step. No emoji. Do not invent rates. Remind them to confirm with the awarding body. Not legal advice.";

async function chat(userId: string, system: string, prompt: string, maxTokens: number) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false as const, error: "AI is not available in this environment" };

  const cap = await consumeAiCallForUser(userId);
  if (!cap.ok) return cap;

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      max_tokens: maxTokens,
      temperature: 0.4,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!res.ok) return { ok: false as const, error: `xAI API error ${res.status}` };
  const body = (await res.json()) as { choices: { message: { content: string } }[] };
  return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
}

export const draftSection = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { prompt: string }) => input)
  .handler(async ({ context, data }) => chat(context.userId, SYSTEM_DRAFT, data.prompt, 700));

export const briefMatches = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { prompt: string }) => input)
  .handler(async ({ context, data }) => chat(context.userId, SYSTEM_BRIEF, data.prompt, 500));
