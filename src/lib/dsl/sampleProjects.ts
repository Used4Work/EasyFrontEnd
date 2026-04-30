import type {
  EasyFrontendProject,
  SectionNode,
  ThemeTokens,
  WizardAnswers,
} from "./types";

const baseTheme: ThemeTokens = {
  primaryColor: "#2563eb",
  backgroundColor: "#f8fafc",
  textColor: "#0f172a",
  radius: "medium",
  density: "standard",
  tone: "modern_saas",
};

export const createLandingPageSections = (answers?: Partial<WizardAnswers>): SectionNode[] => {
  const scenario = answers?.scenario ?? "ai_course";
  const offer =
    answers?.offer ??
    (scenario === "saas"
      ? "LaunchFlow"
      : scenario === "personal_service"
        ? "Clarity Coaching"
        : "AI Course Studio");
  const audience =
    answers?.audience ??
    (scenario === "saas"
      ? "small SaaS teams"
      : scenario === "personal_service"
        ? "independent professionals"
        : "busy creators");
  const primaryAction = answers?.primaryAction ?? "Book a Free Strategy Call";

  return [
    {
      id: "header-1",
      type: "header",
      label: "Header / Navigation",
      content: {
        brand: offer,
        navItems: [
          { id: "nav-features", label: "Features", href: "#features" },
          { id: "nav-pricing", label: "Pricing", href: "#pricing" },
          { id: "nav-faq", label: "FAQ", href: "#faq" },
        ],
        cta: { label: primaryAction, href: "#cta" },
      },
      style: { ...defaultStyle("default"), layout: "split" },
    },
    {
      id: "hero-1",
      type: "hero",
      label: "Hero",
      content: {
        eyebrow:
          scenario === "ai_course"
            ? "AI-powered course launch system"
            : scenario === "saas"
              ? "A calmer way to ship your SaaS launch"
              : "A focused service page that earns trust",
        title:
          scenario === "ai_course"
            ? "Turn your expertise into a polished AI course landing page"
            : scenario === "saas"
              ? "Show your product value clearly before visitors lose interest"
              : "Present your service with clarity, proof, and a direct path to book",
        subtitle: `A guided landing page draft for ${audience}, built with editable sections, quality checks, and export-ready frontend code.`,
        primaryCta: { label: primaryAction, href: "#pricing" },
        secondaryCta: { label: "Preview the Page", href: "#features" },
        imagePlaceholder: "Product preview image placeholder",
      },
      style: { ...defaultStyle("muted"), layout: "split", cardStyle: "elevated" },
      responsive: { mobilePriority: "cta_first", stackOnMobile: true },
    },
    {
      id: "pain-1",
      type: "pain_points",
      label: "Pain Points",
      content: {
        title: "Most landing pages fail before the offer is understood",
        items: [
          {
            id: "pain-clarity",
            title: "The message is vague",
            description: "Visitors cannot quickly tell who the offer is for or why it matters.",
          },
          {
            id: "pain-editing",
            title: "Editing feels too technical",
            description: "Raw design controls force beginners to think like frontend engineers.",
          },
          {
            id: "pain-export",
            title: "Export is disconnected",
            description: "The page looks one way in preview and another way in code.",
          },
        ],
      },
      style: defaultStyle("default"),
    },
    {
      id: "features-1",
      type: "feature_grid",
      label: "Feature Grid",
      content: {
        title: "A complete page workflow without design-tool overwhelm",
        subtitle: "Each module stays editable, structured, and export-ready.",
        features: [
          {
            id: "feature-ai",
            title: "Guided AI draft",
            description: "Answer a few questions and get a complete first pass.",
            icon: "spark",
          },
          {
            id: "feature-edit",
            title: "Semantic editing",
            description: "Change content, order, tone, and CTA without touching CSS.",
            icon: "cursor",
          },
          {
            id: "feature-score",
            title: "Quality scoring",
            description: "See structure, clarity, accessibility, and export readiness feedback.",
            icon: "score",
          },
        ],
      },
      style: { ...defaultStyle("muted"), layout: "grid" },
    },
    {
      id: "proof-1",
      type: "social_proof",
      label: "Social Proof",
      content: {
        title: "Built for people who need a page they can actually finish",
        metrics: [
          { id: "metric-1", value: "8", label: "editable landing-page modules" },
          { id: "metric-2", value: "1", label: "shared DSL source of truth" },
          { id: "metric-3", value: "0", label: "CSS concepts required" },
        ],
        quotes: [
          {
            id: "quote-1",
            quote: "The guided edits made it obvious what to improve next.",
            author: "MVP tester",
          },
        ],
      },
      style: defaultStyle("default"),
    },
    {
      id: "pricing-1",
      type: "pricing",
      label: "Pricing",
      content: {
        title: "Choose the starting point that fits your launch",
        subtitle: "Simple packages for getting a credible page online faster.",
        plans: [
          {
            id: "plan-starter",
            name: "Starter",
            price: "$29",
            description: "For validating one page idea.",
            benefits: ["AI draft", "Visual edits", "HTML export"],
            recommended: false,
            ctaLabel: "Start Lean",
          },
          {
            id: "plan-pro",
            name: "Builder",
            price: "$79",
            description: "For shipping a polished launch page.",
            benefits: ["Everything in Starter", "React/Tailwind export", "Quality checks"],
            recommended: true,
            ctaLabel: primaryAction,
          },
        ],
      },
      style: { ...defaultStyle("muted"), layout: "grid", cardStyle: "elevated" },
    },
    {
      id: "faq-1",
      type: "faq",
      label: "FAQ",
      content: {
        title: "Questions before you publish",
        items: [
          {
            id: "faq-code",
            question: "Do I need to know code?",
            answer: "No. The editor uses beginner-friendly controls and exports code when needed.",
          },
          {
            id: "faq-edit",
            question: "Can I change the AI result?",
            answer: "Yes. Every section stays editable through the visual editor.",
          },
          {
            id: "faq-export",
            question: "Will preview and export match?",
            answer: "Both are generated from the same DSL, so the structure stays aligned.",
          },
        ],
      },
      style: defaultStyle("default"),
    },
    {
      id: "cta-1",
      type: "cta",
      label: "Final CTA",
      content: {
        title: "Ready to turn the draft into a page you can ship?",
        subtitle: "Use the visual editor to refine the message, check quality, and export.",
        buttonLabel: primaryAction,
      },
      style: { ...defaultStyle("primary"), layout: "centered", cardStyle: "flat" },
    },
    {
      id: "footer-1",
      type: "footer",
      label: "Footer",
      content: {
        brand: offer,
        description: "AI-assisted visual landing-page design with stable DSL export.",
        links: [
          { id: "footer-privacy", label: "Privacy", href: "#" },
          { id: "footer-contact", label: "Contact", href: "#" },
        ],
      },
      style: { ...defaultStyle("dark"), layout: "split", cardStyle: "flat" },
    },
  ];
};

export const createSampleProject = (
  answers?: Partial<WizardAnswers>,
): EasyFrontendProject => ({
  id: `project-${answers?.scenario ?? "ai-course"}`,
  name:
    answers?.scenario === "saas"
      ? "SaaS Launch Landing Page"
      : answers?.scenario === "personal_service"
        ? "Personal Service Landing Page"
        : "AI Course Landing Page",
  pageType: "landing_page",
  theme: {
    ...baseTheme,
    tone: answers?.tone ?? baseTheme.tone,
  },
  pages: [
    {
      id: "page-home",
      name: "Home",
      slug: "/",
      sections: createLandingPageSections(answers),
    },
  ],
});

export const sampleProject = createSampleProject();

function defaultStyle(background: "default" | "muted" | "primary" | "dark") {
  return {
    background,
    layout: "stacked" as const,
    cardStyle: "bordered" as const,
    spacing: "standard" as const,
    visible: true,
  };
}
