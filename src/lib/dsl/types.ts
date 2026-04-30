export type PageType = "landing_page";

export type SectionType =
  | "header"
  | "hero"
  | "pain_points"
  | "feature_grid"
  | "social_proof"
  | "pricing"
  | "faq"
  | "cta"
  | "footer";

export type RadiusToken = "none" | "small" | "medium" | "large" | "pill";
export type DensityToken = "compact" | "standard" | "comfortable";
export type ToneToken = "business" | "modern_saas" | "education" | "playful" | "premium";

export type ThemeTokens = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  radius: RadiusToken;
  density: DensityToken;
  tone: ToneToken;
};

export type SectionStyle = {
  background: "default" | "muted" | "primary" | "dark";
  layout: "centered" | "split" | "grid" | "stacked";
  cardStyle: "flat" | "bordered" | "elevated";
  spacing: DensityToken;
  visible: boolean;
};

export type ResponsiveConfig = {
  mobilePriority?: "standard" | "condense" | "feature_first" | "cta_first";
  stackOnMobile?: boolean;
};

export type EasyFrontendProject = {
  id: string;
  name: string;
  pageType: PageType;
  theme: ThemeTokens;
  pages: EasyFrontendPage[];
};

export type EasyFrontendPage = {
  id: string;
  name: string;
  slug: string;
  sections: SectionNode[];
};

export type SectionNode<TContent extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  type: SectionType;
  label: string;
  content: TContent;
  style: SectionStyle;
  responsive?: ResponsiveConfig;
};

export type CtaContent = {
  label: string;
  href: string;
};

export type HeaderContent = {
  brand: string;
  navItems: Array<{ id: string; label: string; href: string }>;
  cta: CtaContent;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: CtaContent;
  secondaryCta: CtaContent;
  imagePlaceholder: string;
};

export type PainPointsContent = {
  title: string;
  items: Array<{ id: string; title: string; description: string }>;
};

export type FeatureGridContent = {
  title: string;
  subtitle: string;
  features: Array<{ id: string; title: string; description: string; icon: string }>;
};

export type SocialProofContent = {
  title: string;
  metrics: Array<{ id: string; value: string; label: string }>;
  quotes: Array<{ id: string; quote: string; author: string }>;
};

export type PricingContent = {
  title: string;
  subtitle: string;
  plans: Array<{
    id: string;
    name: string;
    price: string;
    description: string;
    benefits: string[];
    recommended: boolean;
    ctaLabel: string;
  }>;
};

export type FAQContent = {
  title: string;
  items: Array<{ id: string; question: string; answer: string }>;
};

export type CTASectionContent = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export type FooterContent = {
  brand: string;
  description: string;
  links: Array<{ id: string; label: string; href: string }>;
};

export type WizardAnswers = {
  scenario: "ai_course" | "saas" | "personal_service";
  audience: string;
  offer: string;
  primaryAction: string;
  tone: ToneToken;
};

export const sectionTypes: SectionType[] = [
  "header",
  "hero",
  "pain_points",
  "feature_grid",
  "social_proof",
  "pricing",
  "faq",
  "cta",
  "footer",
];

export const defaultSectionStyle: SectionStyle = {
  background: "default",
  layout: "stacked",
  cardStyle: "bordered",
  spacing: "standard",
  visible: true,
};
