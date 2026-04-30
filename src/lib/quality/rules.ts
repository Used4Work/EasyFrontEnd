import type { EasyFrontendProject, SectionNode } from "@/lib/dsl/types";

export type QualityDimensionName =
  | "Structure Completeness"
  | "Visual Hierarchy"
  | "CTA Clarity"
  | "Responsive Readiness"
  | "Accessibility Basics"
  | "Content Clarity"
  | "Export Readiness";

export type QualityDimension = {
  name: QualityDimensionName;
  score: number;
  issues: string[];
};

export type QualitySuggestion = {
  id: string;
  severity: "low" | "medium" | "high";
  targetSectionId?: string;
  message: string;
};

export type QualityScore = {
  overall: number;
  dimensions: QualityDimension[];
  suggestions: QualitySuggestion[];
};

export const requiredLandingSections = [
  "header",
  "hero",
  "feature_grid",
  "pricing",
  "faq",
  "cta",
  "footer",
] as const;

export const visibleSections = (project: EasyFrontendProject) =>
  project.pages[0]?.sections.filter((section) => section.style.visible) ?? [];

export const findVisibleSection = (project: EasyFrontendProject, type: SectionNode["type"]) =>
  visibleSections(project).find((section) => section.type === type);

export const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)));

export const hasWeakCtaLabel = (label: string) => {
  const normalized = label.trim().toLowerCase();
  return (
    normalized.length < 8 ||
    ["click here", "submit", "go", "start", "learn more", "more"].includes(normalized)
  );
};

export const contrastRatio = (foreground: string, background: string) => {
  const fg = relativeLuminance(hexToRgb(foreground));
  const bg = relativeLuminance(hexToRgb(background));
  const light = Math.max(fg, bg);
  const dark = Math.min(fg, bg);

  return (light + 0.05) / (dark + 0.05);
};

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const numeric = Number.parseInt(value, 16);

  return {
    r: (numeric >> 16) & 255,
    g: (numeric >> 8) & 255,
    b: numeric & 255,
  };
};

const relativeLuminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const [red, green, blue] = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};
