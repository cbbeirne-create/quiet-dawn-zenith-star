import { createFileRoute, Link } from "@tanstack/react-router";
import { useT4 } from "@/lib/store";
import { getGrant } from "@/lib/grants";
import { useHydrated } from "@/lib/use-hydrated";
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
        <Link to="/pipeline" className="text-pine">
          Pipeline
        </Link>
      </main>
    );
  }

  const grant = getGrant(app.grantId);

  return (
    <main className="mx-auto max-w-3xl bg-white px-6 py-10 text-black print:max-w-none print:px-0 print:py-0">
      <div className="mb-8 flex gap-2 print:hidden">
        <Button onClick={() => window.print()}>Print / save as PDF</Button>
        <Link to="/pipeline/$id" params={{ id: app.id }}>
          <Button variant="outline">Back to workspace</Button>
        </Link>
      </div>
      <p className="text-xs uppercase tracking-widest text-neutral-500">T4 Grants draft</p>
      <h1 className="mt-2 font-display text-3xl">{grant?.name ?? app.grantId}</h1>
      <p className="mt-1 text-sm text-neutral-600">
        {grant?.agency} · {grant?.amountLabel}
      </p>
      <p className="mt-4 text-sm">
        <strong>{profile?.companyName ?? "Applicant"}</strong>
        {profile?.county ? ` · ${profile.county}` : ""}
        {profile?.employees != null ? ` · ${profile.employees} staff` : ""}
      </p>
      {app.sections.map((s) => (
        <section key={s.id} className="mt-8 break-inside-avoid">
          <h2 className="font-display text-xl">{s.title}</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{s.content || "(empty)"}</p>
        </section>
      ))}
      <section className="mt-8">
        <h2 className="font-display text-xl">Documents</h2>
        <ul className="mt-2 list-disc pl-5 text-sm">
          {(grant?.documents ?? []).map((d) => (
            <li key={d}>
              {d} {app.checkedDocs.includes(d) ? "— ready" : "— outstanding"}
            </li>
          ))}
        </ul>
      </section>
      {app.notes && (
        <section className="mt-8">
          <h2 className="font-display text-xl">Internal notes</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm">{app.notes}</p>
        </section>
      )}
      <p className="mt-12 text-xs text-neutral-500">
        Not an official application. Confirm every rate and deadline with {grant?.agency ?? "the awarding body"}. T4 Grants
        is not LEO, Enterprise Ireland, Revenue or SEAI.
      </p>
    </main>
  );
}
