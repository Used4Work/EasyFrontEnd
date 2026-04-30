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
    issues.push({ path: "project.id", message: "项目 id 不能为空。" });
  }

  if (!project.name) {
    issues.push({ path: "project.name", message: "项目名称不能为空。" });
  }

  if (project.pageType !== "landing_page") {
    issues.push({ path: "project.pageType", message: "当前仅支持 landing_page 页面类型。" });
  }

  if (!project.theme.primaryColor || !project.theme.backgroundColor || !project.theme.textColor) {
    issues.push({ path: "project.theme", message: "主题颜色不能为空。" });
  }

  if (project.pages.length === 0) {
    issues.push({ path: "project.pages", message: "项目至少需要一个页面。" });
  }

  project.pages.forEach((page, pageIndex) => {
    if (!page.id || !page.name) {
      issues.push({
        path: `project.pages.${pageIndex}`,
        message: "页面 id 和名称不能为空。",
      });
    }

    const sectionIds = new Set<string>();

    page.sections.forEach((section, sectionIndex) => {
      validateSection(section, `project.pages.${pageIndex}.sections.${sectionIndex}`, issues);

      if (sectionIds.has(section.id)) {
        issues.push({
          path: `project.pages.${pageIndex}.sections.${sectionIndex}.id`,
          message: `模块 id 重复：${section.id}。`,
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
    issues.push({ path: `${path}.id`, message: "模块 id 不能为空。" });
  }

  if (!sectionTypes.includes(section.type)) {
    issues.push({ path: `${path}.type`, message: `不支持的模块类型：${section.type}。` });
  }

  if (!section.label) {
    issues.push({ path: `${path}.label`, message: "模块名称不能为空。" });
  }

  if (!section.content || typeof section.content !== "object") {
    issues.push({ path: `${path}.content`, message: "模块内容必须是对象。" });
  }

  if (!section.style) {
    issues.push({ path: `${path}.style`, message: "模块样式不能为空。" });
  }
};
