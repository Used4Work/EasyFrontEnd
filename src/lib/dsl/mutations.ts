import {
  defaultSectionStyle,
  type EasyFrontendProject,
  type SectionNode,
  type SectionStyle,
  type SectionType,
} from "./types";

export const getPrimaryPage = (project: EasyFrontendProject) => project.pages[0];

export const findSection = (project: EasyFrontendProject, sectionId: string) =>
  getPrimaryPage(project).sections.find((section) => section.id === sectionId);

export const updateSectionContent = (
  project: EasyFrontendProject,
  sectionId: string,
  patch: Record<string, unknown>,
): EasyFrontendProject =>
  mapSections(project, (section) =>
    section.id === sectionId
      ? { ...section, content: { ...section.content, ...patch } }
      : section,
  );

export const updateSectionStyle = (
  project: EasyFrontendProject,
  sectionId: string,
  patch: Partial<SectionStyle>,
): EasyFrontendProject =>
  mapSections(project, (section) =>
    section.id === sectionId ? { ...section, style: { ...section.style, ...patch } } : section,
  );

export const updateTheme = (
  project: EasyFrontendProject,
  patch: Partial<EasyFrontendProject["theme"]>,
): EasyFrontendProject => ({
  ...project,
  theme: { ...project.theme, ...patch },
});

export const reorderSection = (
  project: EasyFrontendProject,
  sectionId: string,
  direction: "up" | "down",
): EasyFrontendProject => {
  const page = getPrimaryPage(project);
  const currentIndex = page.sections.findIndex((section) => section.id === sectionId);

  if (currentIndex < 0) {
    return project;
  }

  const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (nextIndex < 0 || nextIndex >= page.sections.length) {
    return project;
  }

  const sections = [...page.sections];
  const [section] = sections.splice(currentIndex, 1);
  sections.splice(nextIndex, 0, section);

  return replacePrimaryPageSections(project, sections);
};

export const toggleSectionVisibility = (
  project: EasyFrontendProject,
  sectionId: string,
): EasyFrontendProject =>
  mapSections(project, (section) =>
    section.id === sectionId
      ? { ...section, style: { ...section.style, visible: !section.style.visible } }
      : section,
  );

export const duplicateSection = (
  project: EasyFrontendProject,
  sectionId: string,
): EasyFrontendProject => {
  const page = getPrimaryPage(project);
  const currentIndex = page.sections.findIndex((section) => section.id === sectionId);

  if (currentIndex < 0) {
    return project;
  }

  const source = page.sections[currentIndex];
  const copy: SectionNode = {
    ...structuredClone(source),
    id: `${source.id}-copy-${Date.now()}`,
    label: `${source.label} 副本`,
  };
  const sections = [...page.sections];
  sections.splice(currentIndex + 1, 0, copy);

  return replacePrimaryPageSections(project, sections);
};

export const deleteSection = (
  project: EasyFrontendProject,
  sectionId: string,
): EasyFrontendProject => {
  const page = getPrimaryPage(project);
  const sections = page.sections.filter((section) => section.id !== sectionId);
  return replacePrimaryPageSections(project, sections);
};

export const addSection = (
  project: EasyFrontendProject,
  type: SectionType,
  afterSectionId?: string,
): EasyFrontendProject => {
  const page = getPrimaryPage(project);
  const newSection = createEmptySection(type);
  const sections = [...page.sections];
  const afterIndex = afterSectionId
    ? sections.findIndex((section) => section.id === afterSectionId)
    : sections.length - 1;
  sections.splice(Math.max(afterIndex + 1, 0), 0, newSection);

  return replacePrimaryPageSections(project, sections);
};

const mapSections = (
  project: EasyFrontendProject,
  mapper: (section: SectionNode) => SectionNode,
): EasyFrontendProject =>
  replacePrimaryPageSections(project, getPrimaryPage(project).sections.map(mapper));

const replacePrimaryPageSections = (
  project: EasyFrontendProject,
  sections: SectionNode[],
): EasyFrontendProject => ({
  ...project,
  pages: project.pages.map((page, index) => (index === 0 ? { ...page, sections } : page)),
});

const createEmptySection = (type: SectionType): SectionNode => {
  const id = `${type}-${Date.now()}`;
  const base = {
    id,
    type,
    label: labelForType(type),
    style: { ...defaultSectionStyle },
  };

  switch (type) {
    case "header":
      return {
        ...base,
        content: { brand: "新品牌", navItems: [], cta: { label: "立即咨询", href: "#" } },
      };
    case "hero":
      return {
        ...base,
        content: {
          eyebrow: "新的核心卖点",
          title: "写清访客最想获得的结果",
          subtitle: "说明这个页面面向谁、能解决什么问题，以及为什么值得继续了解。",
          primaryCta: { label: "立即预约", href: "#" },
          secondaryCta: { label: "了解亮点", href: "#" },
          imagePlaceholder: "产品 / 服务图片占位",
        },
      };
    case "pain_points":
      return {
        ...base,
        content: {
          title: "目标用户正在遇到的问题",
          items: [{ id: `${id}-item`, title: "核心痛点", description: "用简单语言说明这个痛点。" }],
        },
      };
    case "feature_grid":
      return {
        ...base,
        content: {
          title: "核心功能与收益",
          subtitle: "告诉访客他们能得到什么。",
          features: [
            {
              id: `${id}-feature`,
              title: "关键收益",
              description: "说明这个能力带来的具体价值。",
              icon: "亮点",
            },
          ],
        },
      };
    case "social_proof":
      return {
        ...base,
        content: {
          title: "建立信任的证明",
          metrics: [{ id: `${id}-metric`, value: "3x", label: "更好的结果" }],
          quotes: [{ id: `${id}-quote`, quote: "这里放一句真实客户评价。", author: "客户姓名" }],
        },
      };
    case "pricing":
      return {
        ...base,
        content: {
          title: "简单清晰的价格方案",
          subtitle: "选择适合当前阶段的方案。",
          plans: [
            {
              id: `${id}-plan`,
              name: "入门版",
              price: "¥199",
              description: "适合先验证一个页面想法。",
              benefits: ["核心服务内容"],
              recommended: true,
              ctaLabel: "选择入门版",
            },
          ],
        },
      };
    case "faq":
      return {
        ...base,
        content: {
          title: "常见问题",
          items: [{ id: `${id}-faq`, question: "这里写一个问题？", answer: "用清楚的答案降低用户顾虑。" }],
        },
      };
    case "cta":
      return {
        ...base,
        content: {
          title: "准备开始了吗？",
          subtitle: "让访客清楚知道下一步应该做什么。",
          buttonLabel: "立即开始",
        },
      };
    case "footer":
      return {
        ...base,
        content: { brand: "新品牌", description: "一句话说明品牌或服务。", links: [] },
      };
  }
};

const labelForType = (type: SectionType) =>
  ({
    header: "页头 / 导航",
    hero: "首屏",
    pain_points: "用户痛点",
    feature_grid: "功能亮点",
    social_proof: "信任证明",
    pricing: "价格方案",
    faq: "常见问题",
    cta: "最终行动",
    footer: "页脚",
  })[type];
