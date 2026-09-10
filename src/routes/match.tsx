import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, BookmarkCheck, CircleAlert, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/layout";
import { Disclaimer } from "@/components/disclaimer";
import { Badge, Button, Input, Label, Select, Textarea } from "@/components/ui";
import { GOAL_LABELS, REGION_LABELS, SECTOR_LABELS } from "@/lib/grants";
import { COUNTIES, regionFromCounty } from "@/lib/geo";
import { DEMO_PROFILE, matchGrants } from "@/lib/matching";
import { briefMatches } from "@/lib/ai";
import { useT4 } from "@/lib/store";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { BusinessProfile, Goal, MatchResult } from "@/lib/types";
import { difficultyLabel, pct } from "@/lib/format";

export const Route = createFileRoute("/match")({
  validateSearch: (search: Record<string, unknown>): { demo?: boolean } => {
    const d = search.demo;
    return d === true || d === "1" || d === "true" ? { demo: true } : {};
  },
  component: MatchPage,
});

const GOALS = Object.keys(GOAL_LABELS) as Goal[];
const DEMO_GRANTS = ["innovation-voucher", "exploring-innovation", "agile-innovation"] as const;

function unauthorized(e: unknown) {
  return String(e).toLowerCase().includes("unauthorized");
}

function MatchPage() {
  const { demo } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const setProfile = useT4((s) => s.setProfile);
  const start = useT4((s) => s.startApplication);
  const nav = useNavigate();
  const [step, setStep] = useState<"form" | "results">(demo ? "results" : "form");
  const [form, setForm] = useState<BusinessProfile>(demo ? DEMO_PROFILE : emptyProfile());
  const [brief, setBrief] = useState<string | null>(null);
  const [briefErr, setBriefErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const acted = useRef(Boolean(demo));
  const seeded = useRef(false);

  function seedDemoWorkspace() {
    if (seeded.current) return;
    seeded.current = true;
    try {
      for (const id of DEMO_GRANTS) start(id);
      toast.message("Demo workspace seeded with three drafts.");
    } catch {
      toast.message("Demo company loaded.");
    }
  }

  function runMatch(p: BusinessProfile, seedDemo = false) {
    acted.current = true;
    setForm(p);
    setBrief(null);
    setStep("results");
    try {
      setProfile(p);
    } catch {
      /* storage may be blocked */
    }
    if (seedDemo) seedDemoWorkspace();
  }

  useEffect(() => {
    if (demo) {
      runMatch(DEMO_PROFILE, true);
      return;
    }
    const apply = () => {
      if (acted.current) return;
      const p = useT4.getState().profile;
      if (p) {
        setForm(p);
        setStep("results");
      }
    };
    apply();
    return useT4.persist.onFinishHydration(apply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo]);

  const results = useMemo(() => (step === "results" ? matchGrants(form) : []), [step, form]);
  const eligible = results.filter((r) => r.eligible);
  const blocked = results.filter((r) => !r.eligible);
  const top = eligible.slice(0, 3);

  async function askBrief() {
    if (!isPending && !user) {
      setBriefErr("Sign in to generate an AI action plan.");
      return;
    }
    setLoading(true);
    setBriefErr(null);
    const prompt = `Company: ${form.companyName}, ${form.form}, ${form.employees} staff, ${form.tradingMonths} months trading, ${form.region}, ${form.sector}. Goals: ${form.goals.join(", ")}. EI client: ${form.eiClient}. Description: ${form.description}. Top matches: ${eligible.slice(0, 6).map((t) => `${t.grant.name} (score ${t.score}, ${t.grant.amountLabel})`).join("; ")}.`;
    try {
      const res = await briefMatches({ data: { prompt } });
      if (!res.ok) setBriefErr(res.error);
      else setBrief(res.text);
    } catch (e) {
      setBriefErr(unauthorized(e) ? "Sign in to generate an AI action plan." : "Could not draft a plan.");
    } finally {
      setLoading(false);
    }
  }

  function loadDemo() {
    void nav({ to: "/match", search: { demo: true } });
    runMatch(DEMO_PROFILE, true);
  }

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Matching</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">Find the schemes that fit.</h1>
            <p className="mt-2 max-w-2xl text-muted">
              Hard knockouts first. Then a score from goals, size, region and modelled success.
            </p>
          </div>
          {step === "form" && (
            <Button variant="outline" size="lg" onClick={loadDemo}>
              Use demo company
            </Button>
          )}
        </div>

        {step === "form" ? (
          <ProfileForm form={form} setForm={setForm} onSubmit={() => runMatch(form)} onDemo={loadDemo} />
        ) : (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
              <div>
                <p className="font-medium">{form.companyName || "Your company"}</p>
                <p className="text-sm text-muted">
                  {form.employees} staff · {SECTOR_LABELS[form.sector]} · {REGION_LABELS[form.region]}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    acted.current = true;
                    setStep("form");
                    if (demo) void nav({ to: "/match", search: {} });
                  }}
                >
                  Edit profile
                </Button>
                <Button variant="ink" onClick={askBrief} disabled={loading}>
                  {loading ? "Briefing…" : "AI action plan"}
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <Disclaimer compact />
            </div>

            {briefErr && <p className="mt-3 text-sm text-danger">{briefErr}</p>}
            {brief && (
              <div className="mt-4 whitespace-pre-wrap rounded-xl border border-pine-soft bg-surface p-5 text-sm leading-relaxed">
                {brief}
              </div>
            )}

            {top.length > 0 && (
              <div className="mt-8 rounded-xl border border-border bg-surface p-5">
                <p className="text-xs uppercase tracking-widest text-muted">Recommended sequence</p>
                <ol className="mt-3 space-y-2">
                  {top.map((m, i) => (
                    <li key={m.grant.id} className="flex gap-3 text-sm">
                      <span className="font-mono text-pine">{i + 1}</span>
                      <span>
                        <span className="font-medium">{m.grant.name}</span>
                        <span className="text-muted"> — {m.grant.nextSteps[0]}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <p className="mt-8 text-sm text-muted">
              {eligible.length} open paths · {blocked.length} currently blocked
            </p>
            <div className="mt-4 grid gap-4">
              {eligible.map((m) => (
                <MatchCard key={m.grant.id} m={m} />
              ))}
            </div>
            {blocked.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-2xl">Currently blocked</h2>
                <p className="mt-1 text-sm text-muted">
                  Shown so you know what would unlock them — company form, stage, or client status.
                </p>
                <div className="mt-4 grid gap-3">
                  {blocked.slice(0, 8).map((m) => (
                    <MatchCard key={m.grant.id} m={m} compact />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Shell>
  );
}

function emptyProfile(): BusinessProfile {
  return {
    companyName: "",
    form: "limited",
    stage: "established",
    employees: 5,
    tradingMonths: 24,
    region: "dublin",
    county: "",
    turnoverEur: null,
    sector: "software",
    goals: ["rd", "digital"],
    eiClient: false,
    description: "",
  };
}

function ProfileForm({
  form,
  setForm,
  onSubmit,
  onDemo,
}: {
  form: BusinessProfile;
  setForm: (p: BusinessProfile) => void;
  onSubmit: () => void;
  onDemo: () => void;
}) {
  const patch = (p: Partial<BusinessProfile>) => setForm({ ...form, ...p });
  function toggleGoal(g: Goal) {
    patch({
      goals: form.goals.includes(g) ? form.goals.filter((x) => x !== g) : [...form.goals, g],
    });
  }

  return (
    <div className="mt-8">
      <form
        className="grid gap-5 rounded-xl border border-border bg-surface p-5 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="name">Company name</Label>
            <Input
              id="name"
              required
              value={form.companyName}
              onChange={(e) => patch({ companyName: e.target.value })}
              placeholder="e.g. Greenfield Robotics Ltd"
            />
          </div>
          <div>
            <Label htmlFor="form">Legal form</Label>
            <Select id="form" value={form.form} onChange={(e) => patch({ form: e.target.value as BusinessProfile["form"] })}>
              <option value="limited">Limited company</option>
              <option value="sole">Sole trader</option>
              <option value="partnership">Partnership</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="stage">Stage</Label>
            <Select id="stage" value={form.stage} onChange={(e) => patch({ stage: e.target.value as BusinessProfile["stage"] })}>
              <option value="idea">Pre-trading / idea</option>
              <option value="startup">Startup (≤18 months)</option>
              <option value="established">Established</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="emp">Employees</Label>
            <Input
              id="emp"
              type="number"
              min={0}
              value={form.employees}
              onChange={(e) => patch({ employees: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="months">Months trading</Label>
            <Input
              id="months"
              type="number"
              min={0}
              value={form.tradingMonths}
              onChange={(e) => patch({ tradingMonths: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="turnover">Turnover (€ / year, optional)</Label>
            <Input
              id="turnover"
              type="number"
              min={0}
              value={form.turnoverEur ?? ""}
              onChange={(e) =>
                patch({ turnoverEur: e.target.value === "" ? null : Number(e.target.value) })
              }
              placeholder="Leave blank if unknown"
            />
          </div>
          <div>
            <Label htmlFor="county">County</Label>
            <Select
              id="county"
              value={form.county ?? ""}
              onChange={(e) => {
                const county = e.target.value;
                patch({ county, region: county ? regionFromCounty(county) : form.region });
              }}
            >
              <option value="">Select county</option>
              {COUNTIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="region">Region</Label>
            <Select id="region" value={form.region} onChange={(e) => patch({ region: e.target.value as BusinessProfile["region"] })}>
              {Object.entries(REGION_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="sector">Sector</Label>
            <Select id="sector" value={form.sector} onChange={(e) => patch({ sector: e.target.value as BusinessProfile["sector"] })}>
              {Object.entries(SECTOR_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <Label>What are you funding?</Label>
          <div className="mt-1 flex flex-wrap gap-2">
            {GOALS.map((g) => {
              const on = form.goals.includes(g);
              return (
                <button
                  type="button"
                  key={g}
                  onClick={() => toggleGoal(g)}
                  className={`min-h-11 rounded-full border px-3 text-sm ${on ? "border-pine bg-pine-soft text-pine-deep" : "border-line bg-bg text-muted"}`}
                >
                  {GOAL_LABELS[g]}
                </button>
              );
            })}
          </div>
        </div>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.eiClient}
            onChange={(e) => patch({ eiClient: e.target.checked })}
            className="size-4 accent-pine"
          />
          Already an Enterprise Ireland client
        </label>
        <div>
          <Label htmlFor="desc">What you do (optional)</Label>
          <Textarea
            id="desc"
            rows={3}
            value={form.description}
            onChange={(e) => patch({ description: e.target.value })}
            placeholder="Product, customers, and the project you want funded."
          />
        </div>
        <Button type="submit" size="lg">
          See matches
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted">
        Or skip the form —{" "}
        <button type="button" onClick={onDemo} className="font-medium text-pine underline-offset-2 hover:underline">
          use the Greenfield Robotics demo
        </button>
        .
      </p>
    </div>
  );
}

function MatchCard({ m, compact }: { m: MatchResult; compact?: boolean }) {
  const saved = useT4((s) => s.savedIds.includes(m.grant.id));
  const toggle = useT4((s) => s.toggleSaved);
  const start = useT4((s) => s.startApplication);
  const nav = useNavigate();

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl">{m.grant.name}</h3>
            <Badge tone={m.eligible ? "ok" : "warn"}>{m.eligible ? "No knockout" : "Blocked"}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted">
            {m.grant.agency} · {m.grant.amountLabel} · {difficultyLabel(m.grant.difficulty)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-2xl tabular-nums text-pine">{m.score}</p>
          <p className="text-xs text-subtle">fit score</p>
        </div>
      </div>
      {!compact && (
        <>
          <p className="mt-3 text-sm leading-relaxed text-ink">{m.grant.summary}</p>
          <ul className="mt-3 space-y-1">
            {m.reasons.map((r) => (
              <li key={r.label} className={`flex items-start gap-2 text-sm ${r.ok ? "text-muted" : "text-danger"}`}>
                {r.ok ? (
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-pine" />
                ) : (
                  <CircleAlert className="mt-0.5 size-4 shrink-0" />
                )}
                {r.knockout && !r.ok ? "Knockout — " : ""}
                {r.label}
              </li>
            ))}
          </ul>
          {m.fitNotes.length > 0 && <p className="mt-2 text-xs text-subtle">{m.fitNotes.join(" ")}</p>}
          <p className="mt-1 text-xs text-subtle">T4 model success band {pct(m.grant.winRate)} — not an official rate</p>
        </>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to="/grants/$id" params={{ id: m.grant.id }}>
          <Button size="sm" variant="outline">
            Scheme detail
          </Button>
        </Link>
        {m.eligible && (
          <Button
            size="sm"
            onClick={() => {
              const app = start(m.grant.id);
              toast.message("Workspace opened");
              void nav({ to: "/pipeline/$id", params: { id: app.id } });
            }}
          >
            Open workspace
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={() => toggle(m.grant.id)}>
          {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
    </article>
  );
}
