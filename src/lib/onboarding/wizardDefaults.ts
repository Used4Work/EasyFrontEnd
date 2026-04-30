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
    label: "AI 课程落地页",
    description: "适合课程、训练营、工作坊或知识付费产品。",
    defaultAudience: "想系统学习 AI 的职场人",
    defaultOffer: "AI 实战训练营",
    defaultPrimaryAction: "预约免费体验课",
    defaultTone: "education",
  },
  {
    id: "saas",
    label: "SaaS 产品落地页",
    description: "适合软件产品、创业项目发布或预约名单收集。",
    defaultAudience: "正在提升转化率的 SaaS 团队",
    defaultOffer: "LaunchFlow",
    defaultPrimaryAction: "免费试用",
    defaultTone: "modern_saas",
  },
  {
    id: "personal_service",
    label: "个人服务落地页",
    description: "适合咨询、教练、设计、营销或本地服务。",
    defaultAudience: "需要专业支持的个人客户",
    defaultOffer: "清晰增长咨询",
    defaultPrimaryAction: "预约咨询",
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
