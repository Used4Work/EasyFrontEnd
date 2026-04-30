import { validateProject } from "@/lib/dsl/validators";
import type {
  CTASectionContent,
  EasyFrontendProject,
  FAQContent,
  FeatureGridContent,
  HeroContent,
  PricingContent,
} from "@/lib/dsl/types";
import {
  clampScore,
  contrastRatio,
  findVisibleSection,
  hasWeakCtaLabel,
  requiredLandingSections,
  visibleSections,
  type QualityDimension,
  type QualityScore,
  type QualitySuggestion,
} from "./rules";

export const scoreProject = (project: EasyFrontendProject): QualityScore => {
  const suggestions: QualitySuggestion[] = [];
  const dimensions: QualityDimension[] = [
    scoreStructure(project, suggestions),
    scoreVisualHierarchy(project, suggestions),
    scoreCta(project, suggestions),
    scoreResponsive(project, suggestions),
    scoreAccessibility(project, suggestions),
    scoreContent(project, suggestions),
    scoreExport(project, suggestions),
  ];

  const overall = Math.round(
    dimensions.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length,
  );

  return { overall, dimensions, suggestions };
};

function scoreStructure(
  project: EasyFrontendProject,
  suggestions: QualitySuggestion[],
): QualityDimension {
  const issues: string[] = [];
  const sections = visibleSections(project);
  const existingTypes = new Set(sections.map((section) => section.type));

  requiredLandingSections.forEach((type) => {
    if (!existingTypes.has(type)) {
      issues.push(`Missing ${type.replace("_", " ")} section.`);
      suggestions.push({
        id: `add-${type}`,
        severity: "medium",
        message: `建议增加 ${type.replace("_", " ")} 模块，让落地页结构更完整。`,
      });
    }
  });

  if (!existingTypes.has("social_proof")) {
    issues.push("Missing social proof section.");
    suggestions.push({
      id: "add-social-proof",
      severity: "low",
      message: "建议增加 proof 或客户反馈模块，降低访客决策风险。",
    });
  }

  return {
    name: "Structure Completeness",
    score: clampScore(100 - issues.length * 8),
    issues,
  };
}

function scoreVisualHierarchy(
  project: EasyFrontendProject,
  suggestions: QualitySuggestion[],
): QualityDimension {
  const issues: string[] = [];
  const hero = findVisibleSection(project, "hero");

  if (hero) {
    const content = hero.content as HeroContent;
    if (content.title.length > 95) {
      issues.push("Hero title is too long.");
      suggestions.push({
        id: "shorten-hero-title",
        severity: "medium",
        targetSectionId: hero.id,
        message: "Hero 标题偏长，建议压缩成一个更直接的结果承诺。",
      });
    }
    if (content.title.length < 16) {
      issues.push("Hero title may be too vague.");
      suggestions.push({
        id: "clarify-hero-title",
        severity: "medium",
        targetSectionId: hero.id,
        message: "Hero 标题偏短，建议明确目标用户和核心收益。",
      });
    }
  }

  const primaryBackgroundCount = visibleSections(project).filter(
    (section) => section.style.background === "primary",
  ).length;

  if (primaryBackgroundCount > 2) {
    issues.push("Too many sections use the primary background.");
  }

  return { name: "Visual Hierarchy", score: clampScore(100 - issues.length * 12), issues };
}

function scoreCta(project: EasyFrontendProject, suggestions: QualitySuggestion[]): QualityDimension {
  const issues: string[] = [];
  const hero = findVisibleSection(project, "hero");
  const cta = findVisibleSection(project, "cta");
  const labels = collectCtaLabels(project);

  if (!hero) {
    issues.push("Hero section is missing.");
  } else {
    const content = hero.content as HeroContent;
    if (!content.primaryCta.label.trim()) {
      issues.push("Hero section has no primary CTA.");
      suggestions.push({
        id: "add-hero-cta",
        severity: "high",
        targetSectionId: hero.id,
        message: "Hero 缺少主按钮文案，访客不知道下一步该做什么。",
      });
    } else if (hasWeakCtaLabel(content.primaryCta.label)) {
      issues.push("Hero section has weak CTA text.");
      suggestions.push({
        id: "improve-hero-cta",
        severity: "medium",
        targetSectionId: hero.id,
        message: "主按钮文案偏弱，建议改成更明确的行动语。",
      });
    }
  }

  if (!cta) {
    issues.push("Final CTA section is missing.");
  }

  if (labels.length < 3) {
    issues.push("Page has too few conversion actions.");
    suggestions.push({
      id: "increase-cta-path",
      severity: "medium",
      message: "页面转化路径偏少，建议在 Hero、Pricing 和最终 CTA 都保留清晰按钮。",
    });
  }

  return { name: "CTA Clarity", score: clampScore(100 - issues.length * 12), issues };
}

function scoreResponsive(
  project: EasyFrontendProject,
  suggestions: QualitySuggestion[],
): QualityDimension {
  const issues: string[] = [];
  const features = findVisibleSection(project, "feature_grid");
  const faq = findVisibleSection(project, "faq");
  const pricing = findVisibleSection(project, "pricing");

  if (features && (features.content as FeatureGridContent).features.length > 6) {
    issues.push("Feature grid may be dense on mobile.");
    suggestions.push({
      id: "condense-features-mobile",
      severity: "low",
      targetSectionId: features.id,
      message: "功能卡片较多，移动端可能拥挤，建议保留 3 到 6 个重点。",
    });
  }

  if (faq && (faq.content as FAQContent).items.length > 6) {
    issues.push("FAQ list may be long on mobile.");
  }

  if (pricing && (pricing.content as PricingContent).plans.length > 3) {
    issues.push("Pricing has many plans for mobile scanning.");
  }

  if (visibleSections(project).length > 10) {
    issues.push("Page has many visible sections for a first version.");
  }

  return { name: "Responsive Readiness", score: clampScore(100 - issues.length * 10), issues };
}

function scoreAccessibility(
  project: EasyFrontendProject,
  suggestions: QualitySuggestion[],
): QualityDimension {
  const issues: string[] = [];
  const ratio = contrastRatio(project.theme.textColor, project.theme.backgroundColor);
  const hero = findVisibleSection(project, "hero");

  if (ratio < 4.5) {
    issues.push("Theme text and background contrast may be insufficient.");
    suggestions.push({
      id: "improve-theme-contrast",
      severity: "medium",
      message: "主文字和背景对比度可能不足，建议换更深的文字色或更浅的背景色。",
    });
  }

  if (hero && !(hero.content as HeroContent).imagePlaceholder.trim()) {
    issues.push("Hero image placeholder is empty.");
  }

  collectCtaLabels(project).forEach((label) => {
    if (!label.trim()) {
      issues.push("A CTA label is empty.");
    }
  });

  return { name: "Accessibility Basics", score: clampScore(100 - issues.length * 12), issues };
}

function scoreContent(
  project: EasyFrontendProject,
  suggestions: QualitySuggestion[],
): QualityDimension {
  const issues: string[] = [];
  const vagueWords = ["lorem", "placeholder", "todo"];

  visibleSections(project).forEach((section) => {
    const text = JSON.stringify(section.content).toLowerCase();
    if (vagueWords.some((word) => text.includes(word))) {
      issues.push(`${section.label} still has placeholder-like content.`);
      suggestions.push({
        id: `replace-placeholder-${section.id}`,
        severity: "medium",
        targetSectionId: section.id,
        message: `${section.label} 里还有占位感文案，建议替换成真实业务信息。`,
      });
    }
  });

  return { name: "Content Clarity", score: clampScore(100 - issues.length * 10), issues };
}

function scoreExport(
  project: EasyFrontendProject,
  suggestions: QualitySuggestion[],
): QualityDimension {
  const validation = validateProject(project);
  const issues = validation.issues.map((issue) => issue.message);

  if (!validation.valid) {
    suggestions.push({
      id: "fix-dsl-validation",
      severity: "high",
      message: "DSL 校验未通过，导出前需要修复项目结构。",
    });
  }

  return { name: "Export Readiness", score: clampScore(100 - issues.length * 15), issues };
}

function collectCtaLabels(project: EasyFrontendProject) {
  const labels: string[] = [];

  visibleSections(project).forEach((section) => {
    if (section.type === "header") {
      labels.push(((section.content as { cta?: { label?: string } }).cta?.label ?? "").trim());
    }
    if (section.type === "hero") {
      const content = section.content as HeroContent;
      labels.push(content.primaryCta.label, content.secondaryCta.label);
    }
    if (section.type === "pricing") {
      labels.push(...(section.content as PricingContent).plans.map((plan) => plan.ctaLabel));
    }
    if (section.type === "cta") {
      labels.push((section.content as CTASectionContent).buttonLabel);
    }
  });

  return labels.filter(Boolean);
}
