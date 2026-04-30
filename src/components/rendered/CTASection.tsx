import type { CTASectionContent, SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { getRadiusClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function CTASection({ section, theme }: Props) {
  const content = section.content as CTASectionContent;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 text-center" id="cta">
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{content.title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/85">{content.subtitle}</p>
      <a
        className={`mt-7 inline-flex items-center justify-center bg-white px-6 py-3 font-semibold ${getRadiusClass(
          theme.radius,
        )}`}
        href="#pricing"
        style={{ color: theme.primaryColor }}
      >
        {content.buttonLabel}
      </a>
    </div>
  );
}
