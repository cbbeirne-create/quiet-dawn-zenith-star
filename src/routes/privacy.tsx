import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Legal</p>
        <h1 className="mt-2 font-display text-3xl">Privacy notice</h1>
        <p className="mt-4 text-muted">Last updated 6 September 2026. This is a prototype notice, not a solicitor-settled policy.</p>
        <h2 className="mt-8 font-display text-xl">Who we are</h2>
        <p className="mt-2">
          T4 Grants is a software tool that helps Irish SMEs match against published funding schemes. T4 is not LEO,
          Enterprise Ireland, Revenue, SEAI, or any awarding body.
        </p>
        <h2 className="mt-8 font-display text-xl">What we collect</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Account details if you sign in (name, email, sign-in provider).</li>
          <li>Company profile and application drafts you choose to save.</li>
          <li>Prompts and drafts if you use “Draft with Grok” or an AI action plan — sent to xAI to generate text.</li>
        </ul>
        <p className="mt-2">
          Guests can browse and match in the browser without an account. Those drafts stay on your device unless you sign in.
        </p>
        <h2 className="mt-8 font-display text-xl">Why</h2>
        <p className="mt-2">
          To provide the service (contract, if you have an account) and to improve matching. We do not sell your drafts.
        </p>
        <h2 className="mt-8 font-display text-xl">Processors</h2>
        <p className="mt-2">
          Hosting and database on the platform that serves this app. AI text generation by xAI. Do not put PPS numbers,
          bank details, or full sets of accounts into prompts.
        </p>
        <h2 className="mt-8 font-display text-xl">Your rights</h2>
        <p className="mt-2">
          You may request access or deletion of account data. Sign out and stop using the service at any time. Contact
          the operator of this deployment until a dedicated address is published on t4.ie.
        </p>
        <p className="mt-8">
          <Link to="/terms" className="text-pine hover:underline">
            Terms of use
          </Link>
        </p>
      </article>
    </Shell>
  );
}
