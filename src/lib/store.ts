import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { BusinessProfile, GrantApplication, ApplicationStatus, UploadedDocument } from "./types";
import { getGrant } from "./grants";

type State = {
  profile: BusinessProfile | null;
  applications: GrantApplication[];
  savedIds: string[];
  setProfile: (p: BusinessProfile) => void;
  toggleSaved: (id: string) => void;
  startApplication: (grantId: string) => GrantApplication;
  updateApplication: (id: string, patch: Partial<GrantApplication>) => void;
  setSection: (appId: string, sectionId: string, content: string) => void;
  toggleDoc: (appId: string, doc: string) => void;
  addUploadedDocument: (appId: string, document: UploadedDocument) => void;
  removeUploadedDocument: (appId: string, documentId: string) => void;
  toggleStep: (appId: string, step: string) => void;
  setStatus: (appId: string, status: ApplicationStatus) => void;
  reset: () => void;
};

function uid() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch { /* ignore */ }
  return `t4-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const memory: Record<string, string> = {};
const safeStorage: StateStorage = {
  getItem: (name) => { try { return localStorage.getItem(name) ?? memory[name] ?? null; } catch { return memory[name] ?? null; } },
  setItem: (name, value) => { memory[name] = value; try { localStorage.setItem(name, value); } catch { /* preview iframes can block storage */ } },
  removeItem: (name) => { delete memory[name]; try { localStorage.removeItem(name); } catch { /* ignore */ } },
};

export const useT4 = create<State>()(
  persist(
    (set, get) => ({
      profile: null,
      applications: [],
      savedIds: [],
      setProfile: (p) => set({ profile: p }),
      toggleSaved: (id) => set((s) => ({ savedIds: s.savedIds.includes(id) ? s.savedIds.filter((x) => x !== id) : [...s.savedIds, id] })),
      startApplication: (grantId) => {
        const existing = get().applications.find((a) => a.grantId === grantId && a.status !== "declined");
        if (existing) return existing;
        const grant = getGrant(grantId);
        const now = new Date().toISOString();
        const app: GrantApplication = {
          id: uid(), grantId, status: "draft",
          sections: (grant?.sections ?? []).map((s) => ({ id: s.id, title: s.title, content: "" })),
          checkedDocs: [], uploadedDocuments: [], completedSteps: [], notes: "", createdAt: now, updatedAt: now,
        };
        set((s) => ({ applications: [app, ...s.applications] }));
        return app;
      },
      updateApplication: (id, patch) => set((s) => ({ applications: s.applications.map((a) => a.id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a) })),
      setSection: (appId, sectionId, content) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? { ...a, updatedAt: new Date().toISOString(), sections: a.sections.map((sec) => sec.id === sectionId ? { ...sec, content } : sec) } : a) })),
      toggleDoc: (appId, doc) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? { ...a, updatedAt: new Date().toISOString(), checkedDocs: a.checkedDocs.includes(doc) ? a.checkedDocs.filter((d) => d !== doc) : [...a.checkedDocs, doc] } : a) })),
      addUploadedDocument: (appId, document) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? { ...a, updatedAt: new Date().toISOString(), uploadedDocuments: [...(a.uploadedDocuments ?? []), document] } : a) })),
      removeUploadedDocument: (appId, documentId) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? { ...a, updatedAt: new Date().toISOString(), uploadedDocuments: (a.uploadedDocuments ?? []).filter((d) => d.id !== documentId) } : a) })),
      toggleStep: (appId, step) => set((s) => ({ applications: s.applications.map((a) => {
        if (a.id !== appId) return a;
        const steps = a.completedSteps ?? [];
        return { ...a, completedSteps: steps.includes(step) ? steps.filter((x) => x !== step) : [...steps, step], updatedAt: new Date().toISOString() };
      }) })),
      setStatus: (appId, status) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? { ...a, status, updatedAt: new Date().toISOString() } : a) })),
      reset: () => set({ profile: null, applications: [], savedIds: [] }),
    }),
    { name: "t4-grants", storage: createJSONStorage(() => safeStorage) },
  ),
);
