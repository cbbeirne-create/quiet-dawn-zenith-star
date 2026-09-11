import { createFileRoute, Link } from "@tanstack/react-router";
import { useT4 } from "@/lib/store";
import { getGrant } from "@/lib/grants";
import { useHydrated } from "@/lib/use-hydrated";
import { getApplicationReadiness } from "@/lib/application-readiness";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/pipeline_/$id_/print")({ component: PrintDraft });

function PrintDraft() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const app = useT4((s) => s.applications.find((a) => a.id === id));
  const profile = useT4((s) => s.profile);

  if (!hydrated) return <p className="p-8 text-muted">Loading…</p>;
  if (!app) {
    return (
      <main className="p-8">
        <p>Draft not found.</p>
        <Link to="/pipeline" className="text-pine">Pipeline</Link>
      </main>
    );
  }

  const grant = getGrant(app.grantId);
  const readiness = getApplicationReadiness(app, grant, profile);
  const verified = grant?.verificationStatus === "verified" && Boolean(grant.lastVerifiedAt);
  const completedSteps = app.completedSteps ?? [];

  return (
    <main className="mx-auto max-w-3xl bg-white px-6 py-10 text-black print:max-w-none print:px-0 print:py-0">
      <div className="mb-8 flex gap-2 print:hidden">
        <Button onClick={() => window.print()}>Print / save as PDF</Button>
        <Link to="/pipeline/$id" params={{ id: app.id }}><Button variant="outline">Back to workspace</Button></Link>
      </div>

      <p className="text-xs uppercase tracking-widest text-neutral-500">T4 Grants application pack</p>
      <h1 className="mt-2 font-display text-3xl">{grant?.name ?? app.grantId}</h1>
      <p className="mt-1 text-sm text-neutral-600">{grant?.agency} · {grant?.amountLabel}</p>
      <p className="mt-4 text-sm">
        <strong>{profile?.companyName ?? "Applicant"}</strong>
        {profile?.county ? ` · ${profile.county}` : ""}
        {profile?.employees != null ? ` · ${profile.employees} staff` : ""}
        {profile?.turnoverEur != null ? ` · €${profile.turnoverEur.toLocaleString("en-IE")} turnover` : ""}
      </p>

      <section className="mt-8 rounded-xl border border-neutral-200 p-4 print:border-neutral-400">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">Application readiness</p>
            <p className="mt-1 text-2xl font-semibold">{readiness.score}%</p>
          </div>
          <p className="text-right text-xs text-neutral-600">
            {readiness.completedSections}/{readiness.totalSections} sections · {readiness.readyDocuments}/{readiness.totalDocuments} required documents
          </p>
        </div>
        {(readiness.missingSections.length > 0 || readiness.missingDocuments.length > 0) && (
          <div className="mt-3 text-xs text-neutral-600">
            {readiness.missingSections.length > 0 && <p><strong>Sections to complete:</strong> {readiness.missingSections.join(", ")}</p>}
            {readiness.missingDocuments.length > 0 && <p className="mt-1"><strong>Documents outstanding:</strong> {readiness.missingDocuments.join(", ")}</p>}
          </div>
        )}
      </section>

      {app.sections.map((s) => (
        <section key={s.id} className="mt-8 break-inside-avoid">
          <h2 className="font-display text-xl">{s.title}</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{s.content || "(empty)"}</p>
        </section>
      ))}

      {grant?.nextSteps?.length ? (
        <section className="mt-8 break-inside-avoid">
          <h2 className="font-display text-xl">Preparation plan</h2>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {grant.nextSteps.map((step) => <li key={step} className={completedSteps.includes(step) ? "line-through text-neutral-500" : ""}>{step}{completedSteps.includes(step) ? " — complete" : " — outstanding"}</li>)}
          </ul>
        </section>
      ) : null}

      <section className="mt-8 break-inside-avoid">
        <h2 className="font-display text-xl">Documents</h2>
        <ul className="mt-2 list-disc pl-5 text-sm">
          {(grant?.documents ?? []).map((d) => <li key={d}>{d} {app.checkedDocs.includes(d) ? "— ready" : "— outstanding"}</li>)}
        </ul>
        {(app.uploadedDocuments ?? []).length > 0 && (
          <>
            <p className="mt-4 text-sm font-medium">Files added to workspace</p>
            <ul className="mt-1 list-disc pl-5 text-sm text-neutral-600">
              {(app.uploadedDocuments ?? []).map((d) => <li key={d.id}>{d.name}</li>)}
            </ul>
          </>
        )}
      </section>

      {app.notes && (
        <section className="mt-8">
          <h2 className="font-display text-xl">Internal notes</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm">{app.notes}</p>
        </section>
      )}

      <section className="mt-10 border-t border-neutral-200 pt-4 text-xs text-neutral-500">
        <p>
          Source status: {verified ? `verified ${new Date(grant!.lastVerifiedAt!).toLocaleDateString("en-IE")}` : "verification pending — check the official source before relying on this pack"}.
        </p>
        {grant?.officialUrl && <p className="mt-1">Official source: {grant.officialUrl}</p>}
        <p className="mt-2">Not an official application. Confirm every rate, eligibility condition and deadline with the awarding body. T4 Grants is not LEO, Enterprise Ireland, Revenue or SEAI.</p>
      </section>
    </main>
  );
}
