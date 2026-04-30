import { sectionTypes, type EasyFrontendProject, type SectionNode } from "./types";

export type ValidationIssue = {
  path: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  issues: ValidationIssue[];
};

export const validateProject = (project: EasyFrontendProject): ValidationResult => {
  const issues: ValidationIssue[] = [];

  if (!project.id) {
    issues.push({ path: "project.id", message: "Project id is required." });
  }

  if (!project.name) {
    issues.push({ path: "project.name", message: "Project name is required." });
  }

  if (project.pageType !== "landing_page") {
    issues.push({ path: "project.pageType", message: "Only landing_page is supported." });
  }

  if (!project.theme.primaryColor || !project.theme.backgroundColor || !project.theme.textColor) {
    issues.push({ path: "project.theme", message: "Theme colors are required." });
  }

  if (project.pages.length === 0) {
    issues.push({ path: "project.pages", message: "At least one page is required." });
  }

  project.pages.forEach((page, pageIndex) => {
    if (!page.id || !page.name) {
      issues.push({
        path: `project.pages.${pageIndex}`,
        message: "Page id and name are required.",
      });
    }

    const sectionIds = new Set<string>();

    page.sections.forEach((section, sectionIndex) => {
      validateSection(section, `project.pages.${pageIndex}.sections.${sectionIndex}`, issues);

      if (sectionIds.has(section.id)) {
        issues.push({
          path: `project.pages.${pageIndex}.sections.${sectionIndex}.id`,
          message: `Duplicate section id: ${section.id}.`,
        });
      }

      sectionIds.add(section.id);
    });
  });

  return { valid: issues.length === 0, issues };
};

export const validateSection = (
  section: SectionNode,
  path: string,
  issues: ValidationIssue[],
) => {
  if (!section.id) {
    issues.push({ path: `${path}.id`, message: "Section id is required." });
  }

  if (!sectionTypes.includes(section.type)) {
    issues.push({ path: `${path}.type`, message: `Unsupported section type: ${section.type}.` });
  }

  if (!section.label) {
    issues.push({ path: `${path}.label`, message: "Section label is required." });
  }

  if (!section.content || typeof section.content !== "object") {
    issues.push({ path: `${path}.content`, message: "Section content must be an object." });
  }

  if (!section.style) {
    issues.push({ path: `${path}.style`, message: "Section style is required." });
  }
};
