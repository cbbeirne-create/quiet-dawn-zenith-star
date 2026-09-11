import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { Disclaimer } from "@/components/disclaimer";
import { CATALOGUE_REVIEWED_AT, getGrant } from "@/lib/grants";
import { useT4 } from "@/lib/store";
import { difficultyLabel, pct } from "@/lib/format";

export const Route = createFileRoute("/grants_/$id")({ component: GrantDetail });

function GrantDetail() {
  const { id } = Route.useParams();
  const grant = getGrant(id);
  const start = useT4((s) => s.startApplication);
  const nav = useNavigate();

  if (!grant) return <Shell><div className="mx-auto max-w-3xl px-4 py-16"><h1 className="font-display text-3xl">Scheme not found</h1><Link to="/grants" className="mt-4 inline-block text-pine">Back to catalogue</Link></div></Shell>;

  const verified = grant.verificationStatus === "verified" && Boolean(grant.lastVerifiedAt);

  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link to="/grants" className="text-sm text-muted hover:text-ink">Catalogue</Link>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-pine">{grant.agency}</p>
        <h1 className="mt-2 font-display text-4xl">{grant.name}</h1>
        <div className="mt-4 flex flex-wrap gap-2"><Badge>{grant.amountLabel}</Badge><Badge tone="muted">{difficultyLabel(grant.difficulty)}</Badge><Badge tone="ok">{pct(grant.winRate)} T4 model band</Badge></div>
        <p className="mt-6 text-base leading-relaxed">{grant.summary}</p>
        <div className="mt-4"><Disclaimer compact /></div>
        <div className={`mt-3 rounded-lg border p-4 text-sm ${verified ? "border-border bg-surface" : "border-border bg-surface"}`}>
          <p className="font-medium">{verified ? `Source verified ${grant.lastVerifiedAt}` : "Source verification pending"}</p>
          <p className="mt-1 text-muted">{verified ? (grant.verificationNote ?? "T4 has recorded a human verification against the official source.") : "This catalogue record is a snapshot and has not yet been re-verified. Check the official source before relying on rates, eligibility or deadlines."}</p>
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-lg border border-border bg-surface p-4"><dt className="text-xs uppercase tracking-wide text-muted">Typical award</dt><dd className="mt-1 font-medium">{grant.typicalAward}</dd></div><div className="rounded-lg border border-border bg-surface p-4"><dt className="text-xs uppercase tracking-wide text-muted">Deadline</dt><dd className="mt-1 font-medium">{grant.deadlineNote}</dd></div></dl>
        <h2 className="mt-10 font-display text-2xl">What it covers</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{grant.covers.map((c) => <li key={c}>{c}</li>)}</ul>
        <h2 className="mt-8 font-display text-2xl">Eligibility rules T4 checks</h2><ul className="mt-3 space-y-2 text-sm">{grant.rules.map((r) => <li key={r.id} className="rounded-md border border-border bg-surface px-3 py-2">{r.label}{r.knockout ? " — knockout" : ""}</li>)}</ul>
        <h2 className="mt-8 font-display text-2xl">First steps</h2><ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">{grant.nextSteps.map((s) => <li key={s}>{s}</li>)}</ol>
        <h2 className="mt-8 font-display text-2xl">Documents</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{grant.documents.map((d) => <li key={d}>{d}</li>)}</ul>
        <div className="mt-10 flex flex-wrap gap-3"><Button onClick={() => { const app = start(grant.id); void nav({ to: "/pipeline/$id", params: { id: app.id } }); }}>Open application workspace</Button><a href={grant.officialUrl} target="_blank" rel="noreferrer"><Button variant="outline">Official source</Button></a></div>
        <p className="mt-4 text-xs text-subtle">Catalogue snapshot {CATALOGUE_REVIEWED_AT}. Official source always wins.</p>
      </div>
    </Shell>
  );
}
