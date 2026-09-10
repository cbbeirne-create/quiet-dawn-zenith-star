import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { Button, Input, Label } from "@/components/ui";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name: name || email.split("@")[0] });
        if (res.error) throw new Error(res.error.message);
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message);
      }
      window.location.href = "/pipeline";
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-dvh bg-bg px-4 py-16 text-ink">
      <div className="mx-auto w-full max-w-sm">
        <Link to="/" className="font-display text-2xl">
          T4
        </Link>
        <h1 className="mt-6 font-display text-3xl">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Save matches and drafts across devices. Catalogue and matching still work without an account.
        </p>
        {!authEnabled ? (
          <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
        ) : (
          <>
            <div className="mt-8 flex flex-col gap-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  variant="outline"
                  className="w-full"
                  onClick={() => void signIn(p.providerId, { callbackURL: "/pipeline" })}
                >
                  Continue with {p.label}
                </Button>
              ))}
            </div>
            <p className="my-6 text-center text-xs uppercase tracking-widest text-subtle">or email</p>
            <form onSubmit={onEmail} className="grid gap-3">
              {mode === "up" && (
                <div>
                  <Label htmlFor="nm">Name</Label>
                  <Input id="nm" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </div>
              )}
              <div>
                <Label htmlFor="em">Email</Label>
                <Input
                  id="em"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="pw">Password</Label>
                <Input
                  id="pw"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                />
              </div>
              {err && <p className="text-sm text-danger">{err}</p>}
              <Button type="submit" disabled={busy}>
                {busy ? "Please wait…" : mode === "up" ? "Create account" : "Sign in with email"}
              </Button>
            </form>
            <button
              type="button"
              className="mt-4 text-sm text-pine hover:underline"
              onClick={() => {
                setMode(mode === "in" ? "up" : "in");
                setErr(null);
              }}
            >
              {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
            </button>
          </>
        )}
        <p className="mt-8 text-xs text-subtle">
          By continuing you agree to the{" "}
          <Link to="/terms" className="underline">
            terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
