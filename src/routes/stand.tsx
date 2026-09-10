import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout";
import { Badge } from "@/components/ui";
import { GRANTS } from "@/lib/grants";

export const Route = createFileRoute("/stand")({ component: StandPage });

const SCORECARD: { item: string; now: string; tone: "ok" | "warn" | "muted" }[] = [
  { item: "Match → knockout → workspace → Grok draft", now: "Working", tone: "ok" },
  { item: "24-scheme catalogue, 7 bodies", now: "Hardcoded snapshot 6 Sep 2026", tone: "warn" },
  { item: "Demo company (Greenfield Robotics)", now: "Working", tone: "ok" },
  { item: "Desktop + mobile UI", now: "Ships", tone: "ok" },
  { item: "Accounts / login", now: "On — Google, X, email", tone: "ok" },
  { item: "Saved pipelines", now: "Account DB + guest browser copy", tone: "ok" },
  { item: "Plain-text draft export", now: "Download from workspace", tone: "ok" },
  { item: "Payments", now: "Not built", tone: "muted" },
  { item: "Matching unit tests", now: "Knockouts + catalogue integrity", tone: "ok" },
  { item: "AI rate limit + fact-grounding", now: "20/day, signed-in, grounded prompt", tone: "ok" },
  { item: "Privacy policy, terms", now: "Prototype pages live", tone: "warn" },
  { item: "t4.ie live on HTTPS", now: "Founder: domain + hosting", tone: "muted" },
  { item: "CRO company", now: "Founder — required before EI voucher", tone: "muted" },
  { item: "Willing to demo to a LEO", now: "Yes, as a prototype", tone: "ok" },
];

const PHASES = [
  {
    name: "Phase 0 — Founder",
    items: [
      "Buy t4.ie and a mailbox on that domain",
      "Incorporate a limited company",
      "Re-read every official URL in the catalogue",
      "Solicitor: terms + privacy",
    ],
  },
  {
    name: "Phase 1 — Harden (build next)",
    items: [
      "Accounts + EU database + saved pipelines",
      "Knockout tests + catalogue review dates",
      "AI spend cap, rate limit, AI-draft label",
      "Legal pages on every match",
      "Publish to t4.ie labelled beta if needed",
    ],
  },
  {
    name: "Phase 2 — First revenue",
    items: ["Stripe Pro plan", "PDF export", "20 design partners", "File uploads"],
  },
  {
    name: "Phase 3 — Moat",
    items: ["Advisor seats", "Awarded / declined outcomes", "Post-award calendar", "County LEO packs"],
  },
];

function StandPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Internal</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Where T4 stands</h1>
        <p className="mt-3 text-muted">
          Prototype with accounts. The distinctive loop is real. Catalogue still needs a human re-read of every official
          URL the week you launch. Solicitor has not settled the legal pages.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {[
            [String(GRANTS.length), "Schemes in demo"],
            ["7", "Awarding bodies"],
            ["0", "Paying users"],
            ["Beta", "Label until catalogue re-read"],
          ].map(([k, v]) => (
            <div key={v} className="bg-surface px-4 py-5">
              <dt className="font-display text-2xl text-ink">{k}</dt>
              <dd className="mt-1 text-xs text-muted">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-12 font-display text-2xl">Scorecard</h2>
        <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {SCORECARD.map((row) => (
            <li key={row.item} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
              <span className="text-sm">{row.item}</span>
              <Badge tone={row.tone}>{row.now}</Badge>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl">Sequence to production</h2>
        <div className="mt-4 grid gap-3">
          {PHASES.map((p) => (
            <section key={p.name} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-xl">{p.name}</h3>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl">v1 means all of this</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li>A limited company owns the product and the domain.</li>
          <li>A company can save work across devices.</li>
          <li>Every scheme has a review date; official pages win over T4 copy.</li>
          <li>Knockouts are conservative and tested. Unsure → “check with the agency”.</li>
          <li>AI is labelled, rate-limited, and never submitted as the application.</li>
          <li>You would demo this to a LEO without apologising for the data.</li>
        </ul>

        <p className="mt-10 text-sm text-muted">
          Next: solicitor pass, t4.ie, catalogue URL re-read, then billing.{" "}
          <Link to="/match" search={{ demo: true }} className="text-pine hover:underline">
            Run the demo
          </Link>
          .
        </p>
      </div>
    </Shell>
  );
}
