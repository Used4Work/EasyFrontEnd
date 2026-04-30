import type { SectionNode, SectionStyle, ThemeTokens } from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";

export const getRadiusClass = (radius: ThemeTokens["radius"]) =>
  ({
    none: "rounded-none",
    small: "rounded",
    medium: "rounded-lg",
    large: "rounded-2xl",
    pill: "rounded-full",
  })[radius];

export const getSectionPaddingClass = (spacing: SectionStyle["spacing"]) =>
  ({
    compact: "py-10",
    standard: "py-16",
    comfortable: "py-24",
  })[spacing];

export const getCardClass = (
  cardStyle: SectionStyle["cardStyle"],
  radius: ThemeTokens["radius"],
) =>
  cn(
    "border border-slate-200 bg-white",
    getRadiusClass(radius),
    cardStyle === "flat" && "border-transparent shadow-none",
    cardStyle === "bordered" && "shadow-sm",
    cardStyle === "elevated" && "shadow-xl shadow-slate-200/60",
  );

export const getSectionToneClass = (section: SectionNode) =>
  cn(
    "relative",
    section.style.background === "default" && "bg-white text-slate-950",
    section.style.background === "muted" && "bg-slate-50 text-slate-950",
    section.style.background === "primary" && "text-white",
    section.style.background === "dark" && "bg-slate-950 text-white",
  );

export const getSectionStyle = (section: SectionNode, theme: ThemeTokens) => {
  if (section.style.background === "primary") {
    return { backgroundColor: theme.primaryColor };
  }

  if (section.style.background === "default") {
    return { backgroundColor: "#ffffff" };
  }

  return undefined;
};
