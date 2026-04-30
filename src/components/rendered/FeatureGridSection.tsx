import type { FeatureGridContent, SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { getCardClass, getRadiusClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function FeatureGridSection({ section, theme }: Props) {
  const content = section.content as FeatureGridContent;

  return (
    <div className="mx-auto w-full max-w-6xl px-5" id="features">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold leading-tight">{content.title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">{content.subtitle}</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {content.features.map((feature) => (
          <article className={`${getCardClass(section.style.cardStyle, theme.radius)} p-6`} key={feature.id}>
            <div
              className={`mb-5 grid h-11 w-11 place-items-center text-sm font-bold text-white ${getRadiusClass(
                theme.radius,
              )}`}
              style={{ backgroundColor: theme.primaryColor }}
            >
              {feature.icon.slice(0, 2).toUpperCase()}
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
