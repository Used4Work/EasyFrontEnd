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
    label: `${source.label} Copy`,
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
        content: { brand: "New Brand", navItems: [], cta: { label: "Get Started", href: "#" } },
      };
    case "hero":
      return {
        ...base,
        content: {
          eyebrow: "New offer",
          title: "Describe the outcome visitors want",
          subtitle: "Explain who this is for and why it matters.",
          primaryCta: { label: "Get Started", href: "#" },
          secondaryCta: { label: "Learn More", href: "#" },
          imagePlaceholder: "Image placeholder",
        },
      };
    case "pain_points":
      return {
        ...base,
        content: {
          title: "The problem your audience feels",
          items: [{ id: `${id}-item`, title: "Pain point", description: "Describe it simply." }],
        },
      };
    case "feature_grid":
      return {
        ...base,
        content: {
          title: "Key benefits",
          subtitle: "What visitors can expect.",
          features: [
            {
              id: `${id}-feature`,
              title: "Benefit",
              description: "Describe the value.",
              icon: "spark",
            },
          ],
        },
      };
    case "social_proof":
      return {
        ...base,
        content: {
          title: "Proof that builds trust",
          metrics: [{ id: `${id}-metric`, value: "3x", label: "better outcome" }],
          quotes: [{ id: `${id}-quote`, quote: "A short testimonial.", author: "Customer" }],
        },
      };
    case "pricing":
      return {
        ...base,
        content: {
          title: "Simple pricing",
          subtitle: "Choose a plan.",
          plans: [
            {
              id: `${id}-plan`,
              name: "Starter",
              price: "$29",
              description: "For getting started.",
              benefits: ["Core offer"],
              recommended: true,
              ctaLabel: "Choose Starter",
            },
          ],
        },
      };
    case "faq":
      return {
        ...base,
        content: {
          title: "Common questions",
          items: [{ id: `${id}-faq`, question: "Question?", answer: "Answer clearly." }],
        },
      };
    case "cta":
      return {
        ...base,
        content: {
          title: "Ready to begin?",
          subtitle: "Take the next step today.",
          buttonLabel: "Get Started",
        },
      };
    case "footer":
      return {
        ...base,
        content: { brand: "New Brand", description: "Short description.", links: [] },
      };
  }
};

const labelForType = (type: SectionType) =>
  ({
    header: "Header / Navigation",
    hero: "Hero",
    pain_points: "Pain Points",
    feature_grid: "Feature Grid",
    social_proof: "Social Proof",
    pricing: "Pricing",
    faq: "FAQ",
    cta: "Final CTA",
    footer: "Footer",
  })[type];
