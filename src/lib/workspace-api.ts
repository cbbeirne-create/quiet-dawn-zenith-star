import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import type { ApplicationStatus, BusinessProfile, GrantApplication } from "./types";

export type WorkspacePayload = {
  profile: BusinessProfile | null;
  applications: GrantApplication[];
  savedIds: string[];
};

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const getWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const uid = context.userId;
    const profiles = await sql<{ profile: string }>`
      select profile from t4_profiles where user_id = ${uid}
    `;
    const apps = await sql<{
      id: string;
      grant_id: string;
      status: string;
      sections: string;
      checked_docs: string;
      notes: string;
      created_at: string;
      updated_at: string;
    }>`
      select id, grant_id, status, sections, checked_docs, notes,
             created_at::text as created_at, updated_at::text as updated_at
      from t4_applications
      where user_id = ${uid}
      order by updated_at desc
    `;
    const saved = await sql<{ grant_id: string }>`
      select grant_id from t4_saved where user_id = ${uid}
    `;
    const profile = profiles[0] ? parseJson<BusinessProfile | null>(profiles[0].profile, null) : null;
    const applications: GrantApplication[] = apps.map((a) => ({
      id: a.id,
      grantId: a.grant_id,
      status: a.status as ApplicationStatus,
      sections: parseJson(a.sections, []),
      checkedDocs: parseJson(a.checked_docs, []),
      notes: a.notes,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
    }));
    return {
      profile,
      applications,
      savedIds: saved.map((s) => s.grant_id),
    } satisfies WorkspacePayload;
  });

export const saveWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: WorkspacePayload) => input)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const uid = context.userId;
    const profileJson = JSON.stringify(data.profile);
    await sql`
      insert into t4_profiles (user_id, profile, updated_at)
      values (${uid}, ${profileJson}, now())
      on conflict (user_id) do update set profile = ${profileJson}, updated_at = now()
    `;
    await sql`delete from t4_applications where user_id = ${uid}`;
    for (const app of data.applications) {
      await sql`
        insert into t4_applications
          (id, user_id, grant_id, status, sections, checked_docs, notes, created_at, updated_at)
        values (
          ${app.id}, ${uid}, ${app.grantId}, ${app.status},
          ${JSON.stringify(app.sections)}, ${JSON.stringify(app.checkedDocs)},
          ${app.notes}, ${app.createdAt}, ${app.updatedAt}
        )
      `;
    }
    await sql`delete from t4_saved where user_id = ${uid}`;
    for (const grantId of data.savedIds) {
      await sql`insert into t4_saved (user_id, grant_id) values (${uid}, ${grantId})`;
    }
    return { ok: true as const };
  });

const DAILY_AI_CAP = 20;

export async function consumeAiCallForUser(userId: string) {
  const sql = await getSql();
  const rows = await sql<{ calls: number }>`
    select calls from t4_ai_usage where user_id = ${userId} and day = current_date
  `;
  const used = rows[0]?.calls ?? 0;
  if (used >= DAILY_AI_CAP) {
    return { ok: false as const, error: `Daily AI limit of ${DAILY_AI_CAP} drafts reached.` };
  }
  await sql`
    insert into t4_ai_usage (user_id, day, calls)
    values (${userId}, current_date, 1)
    on conflict (user_id, day) do update set calls = t4_ai_usage.calls + 1
  `;
  return { ok: true as const, remaining: DAILY_AI_CAP - used - 1 };
}

export const consumeAiCall = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => consumeAiCallForUser(context.userId));

export const deleteWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const uid = context.userId;
    await sql`delete from t4_applications where user_id = ${uid}`;
    await sql`delete from t4_saved where user_id = ${uid}`;
    await sql`delete from t4_profiles where user_id = ${uid}`;
    await sql`delete from t4_ai_usage where user_id = ${uid}`;
    return { ok: true as const };
  });
