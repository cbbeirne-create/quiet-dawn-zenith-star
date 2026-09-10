import type { BusinessProfile, Grant, GrantApplication } from "./types";

export type Readiness = {
  score: number;
  completedSections: number;
  totalSections: number;
  readyDocuments: number;
  totalDocuments: number;
  profileCompletion: number;
  missingSections: string[];
  missingDocuments: string[];
};

function profileCompletion(profile: BusinessProfile | null) {
  if (!profile) return 0;

  const checks = [
    profile.companyName.trim().length > 0,
    Boolean(profile.form),
    Boolean(profile.stage),
    Number.isFinite(profile.employees) && profile.employees >= 0,
    Number.isFinite(profile.tradingMonths) && profile.tradingMonths >= 0,
    Boolean(profile.county?.trim()) || Boolean(profile.region),
    Boolean(profile.sector),
    profile.goals.length > 0,
  ];

  return checks.filter(Boolean).length / checks.length;
}

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
  const profileScore = profileCompletion(profile);

  const sectionScore = totalSections ? completedSections / totalSections : 1;
  const documentScore = totalDocuments ? readyDocuments / totalDocuments : 1;
  const score = Math.round((sectionScore * 0.6 + documentScore * 0.3 + profileScore * 0.1) * 100);

  return {
    score,
    completedSections,
    totalSections,
    readyDocuments,
    totalDocuments,
    profileCompletion: Math.round(profileScore * 100),
    missingSections: sections.filter((s) => s.content.trim().length < 40).map((s) => s.title),
    missingDocuments: documents.filter((d) => !app.checkedDocs.includes(d)),
  };
}
