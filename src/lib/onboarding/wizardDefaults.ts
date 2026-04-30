import type { ToneToken, WizardAnswers } from "@/lib/dsl/types";

export type ScenarioOption = {
  id: WizardAnswers["scenario"];
  label: string;
  description: string;
  defaultAudience: string;
  defaultOffer: string;
  defaultPrimaryAction: string;
  defaultTone: ToneToken;
};

export const scenarioOptions: ScenarioOption[] = [
  {
    id: "ai_course",
    label: "AI Course",
    description: "Course, workshop, cohort, or digital education offer.",
    defaultAudience: "busy creators",
    defaultOffer: "AI Course Studio",
    defaultPrimaryAction: "Book a Free Strategy Call",
    defaultTone: "education",
  },
  {
    id: "saas",
    label: "SaaS Product",
    description: "Software product, startup launch, or feature waitlist.",
    defaultAudience: "small SaaS teams",
    defaultOffer: "LaunchFlow",
    defaultPrimaryAction: "Start Free Trial",
    defaultTone: "modern_saas",
  },
  {
    id: "personal_service",
    label: "Personal Service",
    description: "Consulting, coaching, design, marketing, or local service.",
    defaultAudience: "independent professionals",
    defaultOffer: "Clarity Coaching",
    defaultPrimaryAction: "Book a Consultation",
    defaultTone: "business",
  },
];

export const getDefaultWizardAnswers = (
  scenario: WizardAnswers["scenario"] = "ai_course",
): WizardAnswers => {
  const option = scenarioOptions.find((entry) => entry.id === scenario) ?? scenarioOptions[0];

  return {
    scenario: option.id,
    audience: option.defaultAudience,
    offer: option.defaultOffer,
    primaryAction: option.defaultPrimaryAction,
    tone: option.defaultTone,
  };
};
