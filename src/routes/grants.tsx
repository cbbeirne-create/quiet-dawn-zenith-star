import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/layout";
import { Badge, Input, Select } from "@/components/ui";
import { GRANTS, CATALOGUE_REVIEWED_AT, CATALOGUE_TIER } from "@/lib/grants";
import { difficultyLabel } from "@/lib/format";

export const Route = createFileRoute("/grants")({ component: GrantsPage });

function GrantsPage() {
  const [q, setQ] = useState("");
  const [agency, setAgency] = useState("all");
  const agencies = useMemo(() => [...new Set(GRANTS.map((g) => g.agency))], []);
  const verifiedCount = useMemo(
    () => GRANTS.filter((g) => g.verificationStatus === "verified" && g.lastVerifiedAt).length,
    [],
  );

  const list = GRANTS.filter((g) => {
    const hay = `${g.name} ${g.summary} ${g.agency} ${g.category}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (agency !== "all" && g.agency !== agency) return false;
    return true;
  });

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Catalogue</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Every scheme in T4</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Independent of your profile. Match first if you want ranked eligibility. Catalogue snapshot{" "}
          {CATALOGUE_REVIEWED_AT} ({CATALOGUE_TIER}) — re-check the official URL before you apply.
        </p>

        <div className="mt-5 rounded-xl border border-border bg-surface p-4 text-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-medium">Source verification</span>
            <span className="text-muted">
              {verifiedCount} of {GRANTS.length} schemes independently verified
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Verification is separate from the catalogue snapshot. Until a scheme is marked verified, confirm
            current eligibility, funding amounts and deadlines with the official awarding body.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, agency, topic"
          />
          <Select value={agency} onChange={(e) => setAgency(e.target.value)}>
            <option value="all">All bodies</option>
            {agencies.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
          <p className="flex items-center text-sm text-muted">{list.length} schemes</p>
        </div>

        <div className="mt-6 grid gap-3">
          {list.map((g) => {
            const verified = g.verificationStatus === "verified" && Boolean(g.lastVerifiedAt);

            return (
              <Link
                key={g.id}
                to="/grants/$id"
                params={{ id: g.id }}
                className="block rounded-xl border border-border bg-surface p-5 hover:border-pine/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-xl">{g.name}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {g.agency} · {g.category}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Badge>{g.amountLabel}</Badge>
                    <Badge>{verified ? "Source verified" : "Source review pending"}</Badge>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-ink">{g.summary}</p>
                <p className="mt-2 text-xs text-subtle">
                  {difficultyLabel(g.difficulty)} · {g.deadlineNote}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
