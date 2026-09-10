import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/layout";
import { Disclaimer } from "@/components/disclaimer";
import { Badge, Button, Select, Textarea } from "@/components/ui";
import { getGrant } from "@/lib/grants";
import { useT4 } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { draftSection } from "@/lib/ai";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { ApplicationStatus } from "@/lib/types";
import { draftPlainText, downloadText } from "@/lib/draft-export";

export const Route = createFileRoute("/pipeline_/$id")({ component: AppWorkspace });

const STATUSES: ApplicationStatus[] = ["draft", "in_review", "submitted", "awarded", "declined"];

function unauthorized(e: unknown) {
  return String(e).toLowerCase().includes("unauthorized");
}

function AppWorkspace() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const { user, isPending } = useCurrentUserState();
  const app = useT4((s) => s.applications.find((a) => a.id === id));
  const setSection = useT4((s) => s.setSection);
  const toggleDoc = useT4((s) => s.toggleDoc);
  const setStatus = useT4((s) => s.setStatus);
  const update = useT4((s) => s.updateApplication);
  const profile = useT4((s) => s.profile);
  const [active, setActive] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (app && !active) setActive(app.sections[0]?.id ?? "");
  }, [app, active]);

  if (!hydrated) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-16 text-muted">Loading workspace…</div>
      </Shell>
    );
  }

  if (!app) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-display text-3xl">Application not found</h1>
          <Link to="/pipeline" className="mt-4 inline-block text-pine">
            Pipeline
          </Link>
        </div>
      </Shell>
    );
  }

  const grant = getGrant(app.grantId);
  const appId = app.id;
  const current = app;
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
Company: ${profile?.companyName ?? "an Irish SME"}, ${profile?.form ?? "limited"}, ${profile?.employees ?? "?"} staff, turnover ${profile?.turnoverEur ?? "unknown"}, ${profile?.sector ?? "software"} in ${profile?.county || profile?.region || "Ireland"}.
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
    downloadText(`${grant?.shortName ?? "draft"}.txt`, draftPlainText(current, profile));
  }

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link to="/pipeline" className="text-sm text-muted hover:text-ink">
          Pipeline
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">{grant?.name ?? "Application"}</h1>
            <p className="mt-1 text-sm text-muted">{grant?.agency}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={app.status}
              onChange={(e) => setStatus(app.id, e.target.value as ApplicationStatus)}
              className="w-40"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </Select>
            <Badge>{grant?.amountLabel}</Badge>
            <Button variant="outline" size="sm" onClick={download}>
              Download .txt
            </Button>
            <Link to="/pipeline/$id/print" params={{ id: app.id }}>
              <Button variant="outline" size="sm">
                Print / PDF
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <Disclaimer compact />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-1">
            {app.sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm ${
                  s.id === section?.id ? "bg-pine text-surface" : "border border-border bg-surface"
                }`}
              >
                {s.title}
                <span className="text-xs opacity-70">{s.content.trim() ? "drafted" : ""}</span>
              </button>
            ))}
            <div className="pt-6">
              <p className="text-xs uppercase tracking-wide text-muted">Documents</p>
              <ul className="mt-2 space-y-2">
                {(grant?.documents ?? []).map((d) => (
                  <li key={d}>
                    <label className="flex items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="mt-1 accent-pine"
                        checked={app.checkedDocs.includes(d)}
                        onChange={() => toggleDoc(app.id, d)}
                      />
                      {d}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div>
            {section && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-2xl">{section.title}</h2>
                    <p className="text-sm text-muted">{hint}</p>
                  </div>
                  <Button variant="ink" onClick={draft} disabled={busy}>
                    {busy ? "Drafting…" : "Draft with Grok"}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-subtle">AI draft — edit before you submit. Daily cap applies when signed in.</p>
                {err && (
                  <p className="mt-2 text-sm text-danger">
                    {err}{" "}
                    {!user && (
                      <Link to="/login" className="underline">
                        Sign in
                      </Link>
                    )}
                  </p>
                )}
                <Textarea
                  className="mt-4 min-h-72"
                  value={section.content}
                  onChange={(e) => setSection(app.id, section.id, e.target.value)}
                  placeholder="Write this section, or sign in and ask Grok to draft from your company profile."
                />
              </>
            )}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-wide text-muted">Internal notes</p>
              <Textarea
                className="mt-2 min-h-24"
                value={app.notes}
                onChange={(e) => update(app.id, { notes: e.target.value })}
                placeholder="Deadlines, advisor names, committee dates."
              />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
