import type { DragEvent } from "react";
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

export type SectionDropPosition = "before" | "after";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
  selected?: boolean;
  onSelect?: (sectionId: string) => void;
  draggable?: boolean;
  dropPosition?: SectionDropPosition;
  onDragStart?: (sectionId: string) => void;
  onDragOver?: (sectionId: string, position: SectionDropPosition) => void;
  onDrop?: (sectionId: string, position: SectionDropPosition) => void;
  onDragEnd?: () => void;
};

export function RenderSection({
  section,
  theme,
  selected = false,
  onSelect,
  draggable = false,
  dropPosition,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: Props) {
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
        dropPosition === "before" && "border-t-4 border-t-blue-500",
        dropPosition === "after" && "border-b-4 border-b-blue-500",
        onSelect && "cursor-pointer",
        draggable && "cursor-grab active:cursor-grabbing",
      )}
      data-section-id={section.id}
      draggable={draggable}
      onClick={(event) => {
        if (!onSelect) {
          return;
        }

        event.stopPropagation();
        onSelect(section.id);
      }}
      onDragEnd={() => onDragEnd?.()}
      onDragOver={(event) => {
        if (!draggable) {
          return;
        }

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        onDragOver?.(section.id, getDropPosition(event));
      }}
      onDragStart={(event) => {
        if (!draggable) {
          return;
        }

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", section.id);
        onDragStart?.(section.id);
      }}
      onDrop={(event) => {
        if (!draggable) {
          return;
        }

        event.preventDefault();
        onDrop?.(section.id, getDropPosition(event));
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

function getDropPosition(event: DragEvent<HTMLElement>): SectionDropPosition {
  const rect = event.currentTarget.getBoundingClientRect();
  return event.clientY < rect.top + rect.height / 2 ? "before" : "after";
}
