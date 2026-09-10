import { getGrant } from "./grants.ts";
import type { BusinessProfile, GrantApplication } from "./types.ts";

export function draftPlainText(app: GrantApplication, profile: BusinessProfile | null) {
  const grant = getGrant(app.grantId);
  const lines = [
    grant?.name ?? app.grantId,
    grant?.agency ?? "",
    grant?.amountLabel ?? "",
    profile?.companyName ? `Applicant: ${profile.companyName}` : "",
    profile?.county ? `County: ${profile.county}` : "",
    "",
    ...app.sections.flatMap((s) => [`## ${s.title}`, "", s.content || "(empty)", ""]),
    "Documents ticked: " + (app.checkedDocs.join("; ") || "none"),
    app.notes ? `Notes:\n${app.notes}` : "",
    "",
    "Draft produced in T4 Grants. Edit before submitting. Confirm every figure with the awarding body. T4 is not LEO, Enterprise Ireland, Revenue or SEAI.",
  ];
  return lines.filter((l, i) => l !== "" || lines[i - 1] !== "").join("\n");
}

export function downloadText(filename: string, body: string) {
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
