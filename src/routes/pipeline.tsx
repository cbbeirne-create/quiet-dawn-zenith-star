import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout";
import { Badge, Button } from "@/components/ui";
import { getGrant } from "@/lib/grants";
import { useT4 } from "@/lib/store";
import type { ApplicationStatus } from "@/lib/types";

export const Route = createFileRoute("/pipeline")({ component: PipelinePage });

const STATUSES: ApplicationStatus[] = ["draft", "in_review", "submitted", "awarded", "declined"];

function PipelinePage() {
  const applications = useT4((s) => s.applications);

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Workspace</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Application pipeline</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Sign in to keep drafts across devices. Guests still get a copy in this browser.
        </p>
        {applications.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-line bg-surface p-10 text-center">
            <p className="font-display text-xl">No applications yet</p>
            <p className="mt-2 text-sm text-muted">Match your company, then open a workspace. Sign in to keep drafts across devices.</p>
            <Link to="/match" className="mt-5 inline-block">
              <Button>Go to matching</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-3">
            {applications.map((a) => {
              const g = getGrant(a.grantId);
              const filled = a.sections.filter((s) => s.content.trim()).length;
              return (
                <Link
                  key={a.id}
                  to="/pipeline/$id"
                  params={{ id: a.id }}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5"
                >
                  <div>
                    <p className="font-display text-xl">{g?.name ?? a.grantId}</p>
                    <p className="text-sm text-muted">
                      {filled}/{a.sections.length} sections · {a.checkedDocs.length} docs
                    </p>
                  </div>
                  <Badge tone={a.status === "awarded" ? "ok" : a.status === "declined" ? "warn" : "muted"}>
                    {STATUSES.includes(a.status) ? a.status.replace("_", " ") : a.status}
                  </Badge>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Shell>
  );
}
