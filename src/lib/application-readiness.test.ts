import { describe, expect, it } from "vitest";
import { getApplicationReadiness } from "./application-readiness";
import type { Grant, GrantApplication } from "./types";

const grant = {
  documents: ["Business plan", "Accounts"],
} as Grant;

const base: GrantApplication = {
  id: "1", grantId: "g", status: "draft", sections: [
    { id: "a", title: "Summary", content: "" },
    { id: "b", title: "Budget", content: "A sufficiently detailed budget description that is long enough to count as completed." },
  ], checkedDocs: ["Accounts"], uploadedDocuments: [], notes: "", createdAt: "", updatedAt: "",
};

describe("getApplicationReadiness", () => {
  it("scores sections and documents and identifies gaps", () => {
    const result = getApplicationReadiness(base, grant, { companyName: "Test Co", description: "A real description" } as never);
    expect(result.completedSections).toBe(1);
    expect(result.readyDocuments).toBe(1);
    expect(result.missingSections).toEqual(["Summary"]);
    expect(result.missingDocuments).toEqual(["Business plan"]);
    expect(result.score).toBe(45);
  });
});
