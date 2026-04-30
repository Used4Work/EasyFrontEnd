import type { EasyFrontendProject, WizardAnswers } from "@/lib/dsl/types";

export type AiAdapter = {
  generateLandingPageDraft: (answers: WizardAnswers) => Promise<EasyFrontendProject>;
  improveSectionCopy: (input: {
    project: EasyFrontendProject;
    sectionId: string;
  }) => Promise<{ message: string; patch?: Record<string, unknown> }>;
};
