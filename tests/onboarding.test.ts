import { describe, expect, it } from "vitest";
import { getDefaultWizardAnswers, scenarioOptions } from "@/lib/onboarding/wizardDefaults";

describe("onboarding wizard defaults", () => {
  it("defines the MVP customer scenarios", () => {
    expect(scenarioOptions.map((option) => option.id)).toEqual([
      "ai_course",
      "saas",
      "personal_service",
    ]);
  });

  it("returns scenario-specific draft answers", () => {
    const saasAnswers = getDefaultWizardAnswers("saas");

    expect(saasAnswers.scenario).toBe("saas");
    expect(saasAnswers.offer).toBe("LaunchFlow");
    expect(saasAnswers.primaryAction).toBe("Start Free Trial");
    expect(saasAnswers.tone).toBe("modern_saas");
  });

  it("defaults to the AI course scenario", () => {
    expect(getDefaultWizardAnswers().scenario).toBe("ai_course");
  });
});
