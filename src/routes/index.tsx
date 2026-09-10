import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Layers, LineChart, PenLine } from "lucide-react";
import { Shell } from "@/components/layout";
import { Button } from "@/components/ui";
import { GRANTS, getGrant } from "@/lib/grants";
import { DEMO_PROFILE } from "@/lib/matching";
import { useT4 } from "@/lib/store";
import { formatEuro } from "@/lib/format";

export const Route = createFileRoute("/")({ component: Home });

const FEATURED = [
  "innovation-voucher",
  "grow-digital",
  "leo-feasibility",
  "agile-innovation",
  "rd-tax",
  "seai-sme",
];

function Home() {
  const agencies = [...new Set(GRANTS.map((g) => g.agency))];
  const pool = GRANTS.reduce((s, g) => s + g.amountMax, 0);
  const setProfile = useT4((s) => s.setProfile);
  const start = useT4((s) => s.startApplication);
  const nav = useNavigate();

  function loadDemo() {
    try {
      setProfile(DEMO_PROFILE);
      for (const id of ["innovation-voucher", "exploring-innovation", "agile-innovation"]) {
        start(id);
      }
    } catch {
      /* storage may be blocked in the preview */
    }
    void nav({ to: "/match", search: { demo: true } });
  }

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 md:pt-16">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">
          Irish SME funding
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.12] tracking-tight md:text-6xl">
          The operating system for winning Irish grants.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Match your company to LEO, Enterprise Ireland, SEAI and tax supports.
          See knockout rules before you waste a week. Draft in a workspace, not
          another PDF.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/match">
            <Button size="lg">
              Match my company
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" onClick={loadDemo}>
            Load demo company
          </Button>
        </div>
        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {[
            [String(GRANTS.length), "Schemes in the catalogue"],
            [String(agencies.length), "Awarding bodies"],
            [formatEuro(pool), "Headline support mapped"],
            ["Knockouts", "Shown before you apply"],
          ].map(([k, v]) => (
            <div key={v} className="bg-surface px-5 py-6">
              <dt className="font-display text-2xl text-ink">{k}</dt>
              <dd className="mt-1 text-sm text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="font-display text-2xl md:text-3xl">How T4 works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Layers,
              title: "Match",
              body: "A five-minute company profile against hard eligibility, goals, region and modelled win rates.",
            },
            {
              icon: PenLine,
              title: "Workspace",
              body: "Structured sections, document checklists, status, and a Grok draft for the blank page.",
            },
            {
              icon: LineChart,
              title: "Intelligence",
              body: "Typical awards and success bands by scheme — so you start where the odds are honest.",
            },
          ].map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-surface p-6">
              <s.icon className="size-5 text-pine" />
              <h3 className="mt-4 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl md:text-3xl">Start with these</h2>
          <Link to="/grants" className="text-sm text-pine hover:underline">
            Full catalogue
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((id) => {
            const g = getGrant(id);
            if (!g) return null;
            return (
              <Link
                key={id}
                to="/grants/$id"
                params={{ id }}
                className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-pine/40"
              >
                <p className="text-xs uppercase tracking-widest text-muted">{g.agency}</p>
                <h3 className="mt-2 font-display text-xl">{g.shortName}</h3>
                <p className="mt-2 text-sm font-medium text-pine">{g.amountLabel}</p>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{g.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-xl border border-border bg-pine-deep px-6 py-8 text-surface md:px-10">
          <p className="text-xs font-medium uppercase tracking-widest text-pine-soft">
            How we would fund T4 itself
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl md:text-3xl">
            Innovation Voucher, then Agile — not Grow Digital.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pine-soft">
            Building this product is bespoke software. The voucher funds a
            knowledge-provider prototype. Agile funds the build once the company
            is trading. Grow Digital is for off-the-shelf tools, so it is the
            wrong first ask.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/grants/$id" params={{ id: "innovation-voucher" }}>
              <Button className="bg-surface text-pine-deep hover:opacity-90">Innovation Voucher</Button>
            </Link>
            <Link to="/grants/$id" params={{ id: "agile-innovation" }}>
              <Button variant="outline" className="border-pine-soft/50 bg-transparent text-surface hover:bg-pine">
                Agile Innovation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 pb-12">
        <h2 className="font-display text-2xl md:text-3xl">Covered in this prototype</h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {[
            "LEO Feasibility, Priming, Expansion, Grow Digital, Digital for Business",
            "Innovation Voucher, Agile Innovation, Exploring Innovation, Partnerships",
            "CSF, Pre-Seed, GradStart, New Markets Validation",
            "SEAI energy upgrades, GreenStart, Climate Action Voucher",
            "R&D Tax Credit",
            "Skillnet, MentorsWork, LEADER, Creative Ireland",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-pine" />
              {t}
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}
