export type CompanyForm = "sole" | "limited" | "partnership";
export type CompanyStage = "idea" | "startup" | "established";
export type Region = "dublin" | "cork" | "galway" | "limerick" | "bmw" | "other";
export type Sector = "software" | "manufacturing" | "food" | "professional" | "retail" | "green" | "tourism" | "creative" | "health" | "construction";
export type Goal = "hire" | "equipment" | "digital" | "export" | "rd" | "energy" | "training" | "feasibility";
export type Agency = "Local Enterprise Office" | "Enterprise Ireland" | "SEAI" | "Revenue" | "Skillnet Ireland" | "Pobal / LEADER" | "Arts Council";
export type DeadlineKind = "rolling" | "window" | "annual";
export type ApplicationStatus = "draft" | "in_review" | "submitted" | "awarded" | "declined";
export type VerificationStatus = "needs_review" | "verified";

export type EligibilityRule = { id: string; label: string; test: (p: BusinessProfile) => boolean; knockout?: boolean };

export type Grant = {
  id: string; name: string; shortName: string; agency: Agency; category: string;
  amountLabel: string; amountMax: number; coFundRate: number; deadlineKind: DeadlineKind; deadlineNote: string;
  summary: string; covers: string[]; nextSteps: string[]; documents: string[];
  sections: { id: string; title: string; hint: string }[];
  winRate: number; winBySector: Partial<Record<Sector, number>>; typicalAward: string;
  difficulty: "straightforward" | "moderate" | "competitive"; officialUrl: string; rules: EligibilityRule[]; goals: Goal[];
  /** Human verification metadata. Undefined means the current catalogue snapshot has not been re-verified. */
  verificationStatus?: VerificationStatus;
  lastVerifiedAt?: string;
  verificationNote?: string;
};

export type BusinessProfile = {
  companyName: string; form: CompanyForm; stage: CompanyStage; employees: number; tradingMonths: number;
  region: Region; sector: Sector; goals: Goal[]; eiClient: boolean; description: string;
  turnoverEur?: number | null; county?: string;
};

export type MatchResult = { grant: Grant; score: number; eligible: boolean; reasons: { ok: boolean; label: string; knockout?: boolean }[]; fitNotes: string[] };
export type AppSection = { id: string; title: string; content: string };
export type UploadedDocument = { id: string; name: string; size: number; type: string; addedAt: string };

export type GrantApplication = {
  id: string; grantId: string; status: ApplicationStatus; sections: AppSection[]; checkedDocs: string[];
  uploadedDocuments?: UploadedDocument[]; notes: string; createdAt: string; updatedAt: string;
};
