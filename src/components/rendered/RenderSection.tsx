import type { SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";
import { CTASection } from "./CTASection";
import { FAQSection } from "./FAQSection";
import { FeatureGridSection } from "./FeatureGridSection";
import { FooterSection } from "./FooterSection";
import { HeaderSection } from "./HeaderSection";
import { HeroSection } from "./HeroSection";
import { PainPointsSection } from "./PainPointsSection";
import { PricingSection } from "./PricingSection";
import { getSectionPaddingClass, getSectionStyle, getSectionToneClass } from "./renderHelpers";
import { SocialProofSection } from "./SocialProofSection";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
  selected?: boolean;
  onSelect?: (sectionId: string) => void;
};

export function RenderSection({ section, theme, selected = false, onSelect }: Props) {
  if (!section.style.visible) {
    return null;
  }

  return (
    <section
      className={cn(
        getSectionToneClass(section),
        section.type === "header" || section.type === "footer"
          ? ""
          : getSectionPaddingClass(section.style.spacing),
        selected && "outline outline-4 outline-blue-500/70 outline-offset-[-4px]",
        onSelect && "cursor-pointer",
      )}
      data-section-id={section.id}
      onClick={(event) => {
        if (!onSelect) {
          return;
        }

        event.stopPropagation();
        onSelect(section.id);
      }}
      style={getSectionStyle(section, theme)}
    >
      {renderByType(section, theme)}
    </section>
  );
}

function renderByType(section: SectionNode, theme: ThemeTokens) {
  switch (section.type) {
    case "header":
      return <HeaderSection section={section} theme={theme} />;
    case "hero":
      return <HeroSection section={section} theme={theme} />;
    case "pain_points":
      return <PainPointsSection section={section} theme={theme} />;
    case "feature_grid":
      return <FeatureGridSection section={section} theme={theme} />;
    case "social_proof":
      return <SocialProofSection section={section} theme={theme} />;
    case "pricing":
      return <PricingSection section={section} theme={theme} />;
    case "faq":
      return <FAQSection section={section} theme={theme} />;
    case "cta":
      return <CTASection section={section} theme={theme} />;
    case "footer":
      return <FooterSection section={section} />;
  }
}
