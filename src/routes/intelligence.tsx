import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Shell } from "@/components/layout";
import { Disclaimer } from "@/components/disclaimer";
import { GRANTS } from "@/lib/grants";
import { difficultyLabel, pct } from "@/lib/format";

export const Route = createFileRoute("/intelligence")({ component: IntelligencePage });

function IntelligencePage() {
  const byAgency = Object.entries(
    GRANTS.reduce<Record<string, { n: number; win: number }>>((acc, g) => {
      const cur = acc[g.agency] ?? { n: 0, win: 0 };
      acc[g.agency] = { n: cur.n + 1, win: cur.win + g.winRate };
      return acc;
    }, {}),
  ).map(([name, v]) => ({
    name: name.replace("Local Enterprise Office", "LEO").replace("Enterprise Ireland", "EI"),
    schemes: v.n,
    win: Math.round((v.win / v.n) * 100),
  }));

  const ranked = [...GRANTS].sort((a, b) => b.winRate - a.winRate);
  const windows = GRANTS.filter((g) => g.deadlineKind !== "rolling");

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Intelligence</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Where applications actually land</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Modelled success bands for this prototype — a T4 model, not an official statistic.
          Use them to sequence work, not to skip a scheme you clearly fit.
        </p>
        <div className="mt-4 max-w-2xl">
          <Disclaimer />
        </div>

        <div className="mt-8 h-72 rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-muted">
            Average modelled win rate by body
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byAgency} margin={{ top: 8, right: 8, left: 0, bottom: 24 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 12 }} />
              <YAxis tick={{ fill: "var(--color-muted)", fontSize: 12 }} unit="%" />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  color: "var(--color-ink)",
                }}
              />
              <Bar dataKey="win" fill="var(--color-pine)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h2 className="mt-12 font-display text-2xl">Timed windows</h2>
        <p className="mt-1 text-sm text-muted">
          Rolling schemes are always open. These need a call or cohort.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {windows.map((g) => (
            <Link
              key={g.id}
              to="/grants/$id"
              params={{ id: g.id }}
              className="rounded-xl border border-border bg-surface p-4 hover:border-pine/40"
            >
              <p className="font-medium">{g.name}</p>
              <p className="mt-1 text-sm text-muted">{g.deadlineNote}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl">Schemes by modelled success</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-2xl text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Scheme</th>
                <th className="px-4 py-3 font-medium">Body</th>
                <th className="px-4 py-3 font-medium">Difficulty</th>
                <th className="px-4 py-3 font-medium">Win rate</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((g) => (
                <tr key={g.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <Link to="/grants/$id" params={{ id: g.id }} className="hover:text-pine">
                      {g.shortName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{g.agency}</td>
                  <td className="px-4 py-3">{difficultyLabel(g.difficulty)}</td>
                  <td className="px-4 py-3 tabular-nums">{pct(g.winRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
