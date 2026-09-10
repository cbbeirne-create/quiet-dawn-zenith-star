import { describe, expect, it } from "vitest";
import { getApplicationReadiness } from "./application-readiness";
import type { Grant, GrantApplication } from "./types";

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
  form: "limited",
  stage: "established",
  employees: 5,
  tradingMonths: 24,
  region: "dublin",
  county: "Dublin",
  sector: "software",
  goals: ["digital"],
  eiClient: false,
  description: "A real description",
};

describe("getApplicationReadiness", () => {
  it("scores sections, documents and profile and identifies gaps", () => {
    const result = getApplicationReadiness(base, grant, profile);

    expect(result.completedSections).toBe(1);
    expect(result.readyDocuments).toBe(1);
    expect(result.profileCompletion).toBe(100);
    expect(result.missingSections).toEqual(["Summary"]);
    expect(result.missingDocuments).toEqual(["Business plan"]);
    expect(result.score).toBe(55);
  });

  it("handles a missing profile without throwing", () => {
    const result = getApplicationReadiness(base, grant, null);

    expect(result.profileCompletion).toBe(0);
    expect(result.score).toBe(45);
  });

  it("remains compatible with older persisted applications", () => {
    const legacy = {
      ...base,
      uploadedDocuments: undefined,
      completedSteps: undefined,
    } as GrantApplication;

    const result = getApplicationReadiness(legacy, grant, profile);

    expect(result.score).toBe(55);
    expect(result.readyDocuments).toBe(1);
  });
});
