import { createSampleProject } from "@/lib/dsl/sampleProjects";
import type { CTASectionContent, HeroContent, PricingContent } from "@/lib/dsl/types";
import type { AiAdapter } from "./aiAdapter";

export const mockAiAdapter: AiAdapter = {
  async generateLandingPageDraft(answers) {
    return createSampleProject(answers);
  },

  async improveSectionCopy({ project, sectionId }) {
    const section = project.pages[0]?.sections.find((entry) => entry.id === sectionId);

    if (!section) {
      return {
        message: "没有找到可优化的模块。",
      };
    }

    if (section.type === "hero") {
      const content = section.content as HeroContent;
      return {
        message: "已优化首屏主按钮，让行动更明确。",
        patch: {
          primaryCta: {
            ...content.primaryCta,
            label: strongerCta(content.primaryCta.label),
          },
        },
      };
    }

    if (section.type === "cta") {
      return {
        message: "已优化最终行动按钮。",
        patch: {
          buttonLabel: strongerCta((section.content as CTASectionContent).buttonLabel),
        },
      };
    }

    if (section.type === "pricing") {
      const content = section.content as PricingContent;
      return {
        message: "已优化推荐方案按钮文案。",
        patch: {
          plans: content.plans.map((plan) =>
            plan.recommended ? { ...plan, ctaLabel: strongerCta(plan.ctaLabel) } : plan,
          ),
        },
      };
    }

    if (typeof section.content.title === "string") {
      return {
        message: "已让当前模块标题更具体。",
        patch: {
          title: strongerTitle(section.content.title),
        },
      };
    }

    return {
      message: "当前模块建议：标题更具体，按钮更行动化，减少泛泛描述。",
    };
  },
};

function strongerCta(currentLabel: string) {
  if (!currentLabel.trim()) {
    return "立即开始";
  }

  if (currentLabel.startsWith("立即")) {
    return currentLabel;
  }

  return `立即${currentLabel}`;
}

function strongerTitle(currentTitle: string) {
  if (!currentTitle.trim()) {
    return "把核心价值讲得更清楚";
  }

  if (currentTitle.includes("更清楚") || currentTitle.includes("更具体")) {
    return currentTitle;
  }

  return `${currentTitle}，让访客更清楚下一步`;
}
