# Project DSL Schema

The EasyFrontEnd DSL is the contract between AI generation, visual editing, rendering, scoring, and export.

```ts
type EasyFrontendProject = {
  id: string;
  name: string;
  pageType: "landing_page";
  theme: ThemeTokens;
  pages: EasyFrontendPage[];
};

type EasyFrontendPage = {
  id: string;
  name: string;
  slug: string;
  sections: SectionNode[];
};

type SectionNode = {
  id: string;
  type:
    | "header"
    | "hero"
    | "pain_points"
    | "feature_grid"
    | "social_proof"
    | "pricing"
    | "faq"
    | "cta"
    | "footer";
  label: string;
  content: Record<string, unknown>;
  style: SectionStyle;
  responsive?: ResponsiveConfig;
};

type ThemeTokens = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  radius: "none" | "small" | "medium" | "large" | "pill";
  density: "compact" | "standard" | "comfortable";
  tone: "business" | "modern_saas" | "education" | "playful" | "premium";
};
```

MVP content shapes are implemented in `src/lib/dsl/types.ts`.

## MVP Content Shapes

- `HeaderContent`: brand, navigation items, header CTA.
- `HeroContent`: eyebrow, title, subtitle, primary CTA, secondary CTA, image placeholder.
- `PainPointsContent`: title and repeated pain-point cards.
- `FeatureGridContent`: title, subtitle, repeated features with icon placeholders.
- `SocialProofContent`: metrics and quotes.
- `PricingContent`: plans, prices, benefits, recommended plan, plan CTA.
- `FAQContent`: repeated question and answer pairs.
- `CTASectionContent`: title, subtitle, button label.
- `FooterContent`: brand, description, links.

Implemented helpers:

- `validateProject(project)`
- `updateSectionContent(project, sectionId, patch)`
- `updateSectionStyle(project, sectionId, patch)`
- `reorderSection(project, sectionId, direction)`
- `toggleSectionVisibility(project, sectionId)`
- `duplicateSection(project, sectionId)`
- `deleteSection(project, sectionId)`
- `addSection(project, type, afterSectionId)`
