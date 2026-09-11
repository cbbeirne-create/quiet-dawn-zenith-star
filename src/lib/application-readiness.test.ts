import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getApplicationReadiness } from "./application-readiness.ts";
import type { Grant, GrantApplication } from "./types.ts";

const grant = {
  documents: ["Business plan", "Accounts"],
} as Grant;

const base: GrantApplication = {
  id: "1",
  grantId: "g",
  status: "draft",
  sections: [
    { id: "a", title: "Summary", content: "" },
    {
      id: "b",
      title: "Budget",
      content:
        "A sufficiently detailed budget description that is long enough to count as completed.",
    },
  ],
  checkedDocs: ["Accounts"],
  uploadedDocuments: [],
  notes: "",
  createdAt: "",
  updatedAt: "",
};

const profile = {
  companyName: "Test Co",
  form: "limited" as const,
  stage: "established" as const,
  employees: 5,
  tradingMonths: 24,
  region: "dublin" as const,
  county: "Dublin",
  sector: "software" as const,
  goals: ["digital" as const],
  eiClient: false,
  description: "A real description",
};

describe("getApplicationReadiness", () => {
  it("scores sections, documents and profile and identifies gaps", () => {
    const result = getApplicationReadiness(base, grant, profile);

    assert.equal(result.completedSections, 1);
    assert.equal(result.readyDocuments, 1);
    assert.equal(result.profileCompletion, 100);
    assert.deepEqual(result.missingSections, ["Summary"]);
    assert.deepEqual(result.missingDocuments, ["Business plan"]);
    assert.equal(result.score, 55);
  });

  it("handles a missing profile without throwing", () => {
    const result = getApplicationReadiness(base, grant, null);

    assert.equal(result.profileCompletion, 0);
    assert.equal(result.score, 45);
  });

  it("remains compatible with older persisted applications", () => {
    const legacy = {
      ...base,
      uploadedDocuments: undefined,
      completedSteps: undefined,
    } as GrantApplication;

    const result = getApplicationReadiness(legacy, grant, profile);

    assert.equal(result.score, 55);
    assert.equal(result.readyDocuments, 1);
  });
});
