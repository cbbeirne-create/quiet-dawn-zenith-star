import assert from "node:assert/strict";
import { test } from "node:test";
import { DEMO_PROFILE, matchGrants } from "./matching.ts";
import { GRANTS, getGrant } from "./grants.ts";
import type { BusinessProfile } from "./types.ts";

test("catalogue ids are unique and complete", () => {
  const ids = GRANTS.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(GRANTS.length >= 20);
  for (const g of GRANTS) {
    assert.ok(g.officialUrl.startsWith("https://"), g.id);
    assert.ok(g.rules.length >= 1, g.id);
    assert.ok(g.sections.length >= 1, g.id);
    assert.ok(g.summary.length > 40, g.id);
  }
});

test("demo company: voucher open, priming blocked, SEAI blocked", () => {
  const results = matchGrants(DEMO_PROFILE);
  const byId = Object.fromEntries(results.map((r) => [r.grant.id, r]));
  assert.equal(byId["innovation-voucher"]?.eligible, true);
  assert.equal(byId["agile-innovation"]?.eligible, true);
  assert.equal(byId["leo-priming"]?.eligible, false);
  assert.equal(byId["seai-sme"]?.eligible, false);
  assert.ok((byId["innovation-voucher"]?.score ?? 0) > (byId["leo-priming"]?.score ?? 0));
});

test("sole trader is knocked out of Innovation Voucher", () => {
  const sole: BusinessProfile = { ...DEMO_PROFILE, form: "sole" };
  const hit = matchGrants(sole).find((r) => r.grant.id === "innovation-voucher");
  assert.equal(hit?.eligible, false);
  assert.ok(hit?.reasons.some((r) => !r.ok && r.knockout));
});

test("EI client is knocked out of Grow Digital", () => {
  const ei: BusinessProfile = { ...DEMO_PROFILE, eiClient: true };
  const hit = matchGrants(ei).find((r) => r.grant.id === "grow-digital");
  assert.equal(hit?.eligible, false);
});

test("eligible results sort above blocked", () => {
  const results = matchGrants(DEMO_PROFILE);
  const firstBlocked = results.findIndex((r) => !r.eligible);
  const lastEligible = results.reduce((acc, r, i) => (r.eligible ? i : acc), -1);
  assert.ok(firstBlocked === -1 || lastEligible < firstBlocked);
});

test("turnover over €50m knocks out Innovation Voucher", () => {
  const big: BusinessProfile = { ...DEMO_PROFILE, turnoverEur: 60_000_000 };
  const hit = matchGrants(big).find((r) => r.grant.id === "innovation-voucher");
  assert.equal(hit?.eligible, false);
});

test("unknown turnover does not knock out on its own", () => {
  const unknown: BusinessProfile = { ...DEMO_PROFILE, turnoverEur: null };
  const hit = matchGrants(unknown).find((r) => r.grant.id === "innovation-voucher");
  assert.equal(hit?.eligible, true);
});
