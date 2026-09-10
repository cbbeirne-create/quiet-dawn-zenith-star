import { Link, useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/cn";
import { CloudBridge } from "./cloud-bridge";

const links = [
  { to: "/", label: "Overview" },
  { to: "/match", label: "Match" },
  { to: "/grants", label: "Catalogue" },
  { to: "/pipeline", label: "Workspace" },
  { to: "/intelligence", label: "Intelligence" },
] as const;

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="size-8 shrink-0 animate-pulse rounded-full bg-pine-soft" aria-hidden />;
  }
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/account" className="hidden min-h-11 items-center text-sm text-muted hover:text-ink sm:inline-flex">
          Account
        </Link>
        <div className="max-w-40 truncate md:max-w-none">
          <UserButton />
        </div>
      </div>
    );
  }
  return (
    <Link to="/login" className="min-h-11 shrink-0 rounded-md px-3 py-2 text-sm text-muted hover:text-ink">
      Sign in
    </Link>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <CloudBridge />
      <Toaster position="top-right" richColors={false} />
      <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-medium tracking-tight">T4</span>
            <span className="text-xs font-medium uppercase tracking-widest text-muted">Grants</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "min-h-11 rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "bg-pine-soft text-pine-deep" : "text-muted hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <AuthSlot />
            <Link
              to="/match"
              className="hidden min-h-11 rounded-md bg-pine px-3 py-2 text-sm font-medium text-surface sm:inline-flex sm:items-center"
            >
              Start matching
            </Link>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2 md:hidden">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "min-h-11 shrink-0 rounded-full px-3 py-2 text-xs",
                  active ? "bg-pine text-surface" : "border border-border bg-surface text-muted",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted md:flex-row md:justify-between">
          <p>T4 Grants — funding operating system for Irish SMEs.</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <Link to="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link to="/stand" className="hover:text-ink">
              Standing
            </Link>
            <span>Prototype. Confirm schemes with the awarding body.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
