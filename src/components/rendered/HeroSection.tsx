import type { HeroContent, SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";
import { getCardClass, getRadiusClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function HeroSection({ section, theme }: Props) {
  const content = section.content as HeroContent;

  return (
    <div
      className={cn(
        "mx-auto grid w-full max-w-6xl items-center gap-10 px-5",
        section.style.layout === "centered" ? "text-center" : "md:grid-cols-[1.05fr_0.95fr]",
      )}
    >
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-normal" style={{ color: theme.primaryColor }}>
          {content.eyebrow}
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-inherit md:text-6xl">
          {content.title}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">{content.subtitle}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            className={`inline-flex items-center justify-center px-5 py-3 font-semibold text-white ${getRadiusClass(
              theme.radius,
            )}`}
            href={content.primaryCta.href}
            style={{ backgroundColor: theme.primaryColor }}
          >
            {content.primaryCta.label}
          </a>
          <a
            className={`inline-flex items-center justify-center border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 ${getRadiusClass(
              theme.radius,
            )}`}
            href={content.secondaryCta.href}
          >
            {content.secondaryCta.label}
          </a>
        </div>
      </div>
      <div className={getCardClass(section.style.cardStyle, theme.radius)}>
        <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-slate-100 via-white to-slate-200 p-8 text-center">
          <div>
            <div
              className="mx-auto mb-4 h-14 w-14"
              style={{ borderRadius: 16, backgroundColor: theme.primaryColor }}
            />
            <p className="text-sm font-medium text-slate-500">{content.imagePlaceholder}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
