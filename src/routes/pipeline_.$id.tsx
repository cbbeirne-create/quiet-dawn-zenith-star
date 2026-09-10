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
import { getApplicationReadiness } from "@/lib/application-readiness";

export const Route = createFileRoute("/pipeline_/$id")({ component: AppWorkspace });
const STATUSES: ApplicationStatus[] = ["draft", "in_review", "submitted", "awarded", "declined"];
function unauthorized(e: unknown) { return String(e).toLowerCase().includes("unauthorized"); }

function AppWorkspace() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const { user, isPending } = useCurrentUserState();
  const app = useT4((s) => s.applications.find((a) => a.id === id));
  const setSection = useT4((s) => s.setSection);
  const toggleDoc = useT4((s) => s.toggleDoc);
  const toggleStep = useT4((s) => s.toggleStep);
  const setStatus = useT4((s) => s.setStatus);
  const update = useT4((s) => s.updateApplication);
  const addUploadedDocument = useT4((s) => s.addUploadedDocument);
  const removeUploadedDocument = useT4((s) => s.removeUploadedDocument);
  const profile = useT4((s) => s.profile);
  const [active, setActive] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => { if (app && !active) setActive(app.sections[0]?.id ?? ""); }, [app, active]);
  if (!hydrated) return <Shell><div className="mx-auto max-w-3xl px-4 py-16 text-muted">Loading workspace…</div></Shell>;
  if (!app) return <Shell><div className="mx-auto max-w-3xl px-4 py-16"><h1 className="font-display text-3xl">Application not found</h1><Link to="/pipeline" className="mt-4 inline-block text-pine">Pipeline</Link></div></Shell>;

  const grant = getGrant(app.grantId);
  const appId = app.id;
  const current = app;
  const section = app.sections.find((s) => s.id === active) ?? app.sections[0];
  const hint = grant?.sections.find((s) => s.id === section?.id)?.hint ?? "";
  const readiness = getApplicationReadiness(app, grant, profile);
  const completedSteps = app.completedSteps ?? [];

  async function draft() {
    if (!section || !grant) return;
    if (!isPending && !user) { setErr("Sign in to draft with Grok."); return; }
    setBusy(true); setErr(null);
    const prompt = `Write the "${section.title}" section of an Irish ${grant.name} application. Agency: ${grant.agency}. Amount label: ${grant.amountLabel}. Deadline: ${grant.deadlineNote}. Hint: ${hint}. Company: ${profile?.companyName ?? "an Irish SME"}, ${profile?.form ?? "limited"}, ${profile?.employees ?? "?"} staff, turnover ${profile?.turnoverEur ?? "unknown"}, ${profile?.sector ?? "software"} in ${profile?.county || profile?.region || "Ireland"}. Description: ${profile?.description || "Early product company."} Current draft (improve or replace): ${section.content || "(empty)"}. Do not invent rates. Leave blanks rather than guess official figures.`;
    try { const res = await draftSection({ data: { prompt } }); if (!res.ok) setErr(res.error); else setSection(appId, section.id, res.text); }
    catch (e) { setErr(unauthorized(e) ? "Sign in to draft with Grok." : "Draft failed."); }
    finally { setBusy(false); }
  }
  function download() { downloadText(`${grant?.shortName ?? "draft"}.txt`, draftPlainText(current, profile)); }
  function addFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => addUploadedDocument(appId, { id: `${Date.now()}-${file.name}`, name: file.name, size: file.size, type: file.type || "application/octet-stream", addedAt: new Date().toISOString() }));
  }

  return <Shell>
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/pipeline" className="text-sm text-muted hover:text-ink">Pipeline</Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div><h1 className="font-display text-3xl">{grant?.name ?? "Application"}</h1><p className="mt-1 text-sm text-muted">{grant?.agency}</p></div>
        <div className="flex flex-wrap items-center gap-2"><Select value={app.status} onChange={(e) => setStatus(app.id, e.target.value as ApplicationStatus)} className="w-40">{STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}</Select><Badge>{grant?.amountLabel}</Badge><Button variant="outline" size="sm" onClick={download}>Download .txt</Button><Link to="/pipeline/$id/print" params={{ id: app.id }}><Button variant="outline" size="sm">Print / PDF</Button></Link></div>
      </div>
      <div className="mt-3"><Disclaimer compact /></div>

      <div className="mt-6 rounded-lg border border-border bg-surface p-5">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs uppercase tracking-wide text-muted">Application readiness</p><p className="mt-1 font-display text-3xl">{readiness.score}%</p></div><p className="text-sm text-muted">{readiness.completedSections}/{readiness.totalSections} sections · {readiness.readyDocuments}/{readiness.totalDocuments} required documents</p></div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-border"><div className="h-full bg-pine transition-all" style={{ width: `${readiness.score}%` }} /></div>
        {(readiness.missingSections.length > 0 || readiness.missingDocuments.length > 0) && <div className="mt-4 grid gap-3 text-sm md:grid-cols-2"><div><strong>Finish sections</strong><ul className="mt-1 list-disc pl-5 text-muted">{readiness.missingSections.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul></div><div><strong>Documents outstanding</strong><ul className="mt-1 list-disc pl-5 text-muted">{readiness.missingDocuments.slice(0, 4).map((x) => <li key={x}>{x}</li>)}</ul></div></div>}
      </div>

      {grant && grant.nextSteps.length > 0 && <div className="mt-6 rounded-lg border border-border bg-surface p-5"><div className="flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-wide text-muted">Preparation plan</p><h2 className="mt-1 font-display text-xl">Next steps</h2></div><span className="text-sm text-muted">{completedSteps.length}/{grant.nextSteps.length} complete</span></div><div className="mt-4 space-y-2">{grant.nextSteps.map((step) => <label key={step} className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-3 text-sm"><input type="checkbox" className="mt-1 accent-pine" checked={completedSteps.includes(step)} onChange={() => toggleStep(app.id, step)} /><span className={completedSteps.includes(step) ? "text-muted line-through" : ""}>{step}</span></label>)}</div></div>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-1">
          {app.sections.map((s) => <button key={s.id} type="button" onClick={() => setActive(s.id)} className={`flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm ${s.id === section?.id ? "bg-pine text-surface" : "border border-border bg-surface"}`}>{s.title}<span className="text-xs opacity-70">{s.content.trim().length >= 40 ? "ready" : ""}</span></button>)}
          <div className="pt-6"><p className="text-xs uppercase tracking-wide text-muted">Required documents</p><ul className="mt-2 space-y-2">{(grant?.documents ?? []).map((d) => <li key={d}><label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1 accent-pine" checked={app.checkedDocs.includes(d)} onChange={() => toggleDoc(app.id, d)} />{d}</label></li>)}</ul></div>
          <div className="pt-6"><p className="text-xs uppercase tracking-wide text-muted">Your files</p><label className="mt-2 flex cursor-pointer items-center justify-center rounded-md border border-dashed border-border px-3 py-3 text-sm hover:bg-surface"><input type="file" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />Add supporting files</label><ul className="mt-2 space-y-1 text-xs text-muted">{(app.uploadedDocuments ?? []).map((d) => <li key={d.id} className="flex items-center justify-between gap-2"><span className="truncate">{d.name}</span><button type="button" className="text-danger" onClick={() => removeUploadedDocument(app.id, d.id)}>Remove</button></li>)}</ul><p className="mt-2 text-[11px] text-subtle">Prototype only: file metadata is saved locally; the file bytes are not uploaded.</p></div>
        </aside>
        <div>
          {section && <><div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="font-display text-2xl">{section.title}</h2><p className="text-sm text-muted">{hint}</p></div><Button variant="ink" onClick={draft} disabled={busy}>{busy ? "Drafting…" : "Draft with Grok"}</Button></div><p className="mt-2 text-xs text-subtle">AI draft — edit before you submit. Daily cap applies when signed in.</p>{err && <p className="mt-2 text-sm text-danger">{err} {!user && <Link to="/login" className="underline">Sign in</Link>}</p>}<Textarea className="mt-4 min-h-72" value={section.content} onChange={(e) => setSection(app.id, section.id, e.target.value)} placeholder="Write this section, or sign in and ask Grok to draft from your company profile." /></>}
          <div className="mt-8"><p className="text-xs uppercase tracking-wide text-muted">Internal notes</p><Textarea className="mt-2 min-h-24" value={app.notes} onChange={(e) => update(app.id, { notes: e.target.value })} placeholder="Deadlines, advisor names, committee dates." /></div>
        </div>
      </div>
    </div>
  </Shell>;
}
