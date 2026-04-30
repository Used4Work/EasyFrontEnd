import { createSampleProject } from "@/lib/dsl/sampleProjects";
import type { AiAdapter } from "./aiAdapter";

export const mockAiAdapter: AiAdapter = {
  async generateLandingPageDraft(answers) {
    return createSampleProject(answers);
  },

  async improveSectionCopy({ sectionId }) {
    return {
      message: `Mock suggestion for ${sectionId}: make the promise more specific and keep the CTA action-oriented.`,
    };
  },
};
