import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/layout";
import { Button } from "@/components/ui";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useT4 } from "@/lib/store";
import { deleteWorkspace } from "@/lib/workspace-api";
import { draftPlainText, downloadText } from "@/lib/draft-export";
import { getGrant } from "@/lib/grants";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const { user, isPending } = useCurrentUserState();
  const profile = useT4((s) => s.profile);
  const applications = useT4((s) => s.applications);
  const reset = useT4((s) => s.reset);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (isPending) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-4 py-16 text-muted">Loading account…</div>
      </Shell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  function exportAll() {
    const parts = applications.map((a) => draftPlainText(a, profile));
    const body = [
      `T4 Grants export`,
      profile?.companyName ?? "No company profile",
      user?.primaryEmail ?? "",
      "",
      parts.join("\n\n-----\n\n") || "No drafts.",
    ].join("\n");
    downloadText("t4-grants-export.txt", body);
  }

  async function wipe() {
    if (!window.confirm("Delete every T4 profile, draft and saved scheme on this account? This cannot be undone.")) {
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      await deleteWorkspace();
      reset();
      setMsg("Your T4 data has been deleted from this account.");
    } catch {
      setMsg("Could not delete server copy. You can still clear this browser.");
      reset();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="mx-auto max-w-xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Account</p>
        <h1 className="mt-2 font-display text-3xl">Your T4 data</h1>
        <p className="mt-2 text-sm text-muted">
          {user.displayName ?? "Signed in"} {user.primaryEmail ? `· ${user.primaryEmail}` : ""}
        </p>

        <dl className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted">Company</dt>
            <dd>{profile?.companyName ?? "Not set"}</dd>
          </div>
          <div className="flex justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted">Drafts</dt>
            <dd>{applications.length}</dd>
          </div>
          <div className="flex justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted">Schemes in pipeline</dt>
            <dd>{applications.map((a) => getGrant(a.grantId)?.shortName).filter(Boolean).join(", ") || "—"}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportAll}>
            Download all drafts
          </Button>
          <Link to="/match">
            <Button>Update company</Button>
          </Link>
        </div>

        <h2 className="mt-12 font-display text-xl">Delete data</h2>
        <p className="mt-2 text-sm text-muted">
          Removes company profile, application drafts, saved schemes and AI usage for this login. It does not close the
          sign-in account itself.
        </p>
        <Button variant="outline" className="mt-4 border-danger text-danger" onClick={() => void wipe()} disabled={busy}>
          {busy ? "Deleting…" : "Delete my T4 data"}
        </Button>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </Shell>
  );
}
