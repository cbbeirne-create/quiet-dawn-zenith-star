import type { BusinessProfile, Grant, GrantApplication } from "./types";

export type Readiness = {
  score: number;
  completedSections: number;
  totalSections: number;
  readyDocuments: number;
  totalDocuments: number;
  missingSections: string[];
  missingDocuments: string[];
};

export function getApplicationReadiness(
  app: GrantApplication,
  grant: Grant | undefined,
  profile: BusinessProfile | null,
): Readiness {
  const sections = app.sections;
  const completedSections = sections.filter((s) => s.content.trim().length >= 40).length;
  const totalSections = sections.length;
  const documents = grant?.documents ?? [];
  const readyDocuments = documents.filter((d) => app.checkedDocs.includes(d)).length;
  const totalDocuments = documents.length;

  const sectionScore = totalSections ? completedSections / totalSections : 1;
  const documentScore = totalDocuments ? readyDocuments / totalDocuments : 1;
  const profileScore = profile?.companyName && profile.description ? 1 : 0;
  const score = Math.round((sectionScore * 0.6 + documentScore * 0.3 + profileScore * 0.1) * 100);

  return {
    score,
    completedSections,
    totalSections,
    readyDocuments,
    totalDocuments,
    missingSections: sections.filter((s) => s.content.trim().length < 40).map((s) => s.title),
    missingDocuments: documents.filter((d) => !app.checkedDocs.includes(d)),
  };
}
