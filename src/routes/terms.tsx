import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed">
        <p className="text-xs font-medium uppercase tracking-widest text-pine">Legal</p>
        <h1 className="mt-2 font-display text-3xl">Terms of use</h1>
        <p className="mt-4 text-muted">Last updated 6 September 2026. Prototype terms. Irish law.</p>
        <h2 className="mt-8 font-display text-xl">Not official advice</h2>
        <p className="mt-2">
          T4 Grants is a software aid. Eligibility scores, modelled win rates, amounts, and AI drafts are not decisions
          of any awarding body and are not legal, tax, or financial advice. Official pages and the agency always win.
          You must edit and own any text you submit.
        </p>
        <h2 className="mt-8 font-display text-xl">No guarantee of award</h2>
        <p className="mt-2">
          A green “Eligible” label means T4’s current rules did not find a knockout. Agencies apply further tests
          (turnover, sector exclusions, available budget, committee judgement) that T4 does not see.
        </p>
        <h2 className="mt-8 font-display text-xl">Your content</h2>
        <p className="mt-2">
          You keep IP in your drafts. You grant T4 a licence to store and process them to provide the service, including
          sending sections you ask to draft to the AI provider.
        </p>
        <h2 className="mt-8 font-display text-xl">Acceptable use</h2>
        <p className="mt-2">
          Do not use T4 to fabricate evidence, submit false applications, or scrape the catalogue for a competing data
          product. We may rate-limit AI.
        </p>
        <h2 className="mt-8 font-display text-xl">Liability</h2>
        <p className="mt-2">
          The service is provided as-is. To the extent Irish law allows, T4 is not liable for a refused grant, stale
          scheme data, or reliance on a match. This cap does not exclude liability that cannot be excluded by law.
        </p>
        <p className="mt-8">
          <Link to="/privacy" className="text-pine hover:underline">
            Privacy notice
          </Link>
        </p>
      </article>
    </Shell>
  );
}
