import type { PricingContent, SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { getCardClass, getRadiusClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function PricingSection({ section, theme }: Props) {
  const content = section.content as PricingContent;

  return (
    <div className="mx-auto w-full max-w-6xl px-5" id="pricing">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold leading-tight">{content.title}</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">{content.subtitle}</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {content.plans.map((plan) => (
          <article
            className={`${getCardClass(section.style.cardStyle, theme.radius)} relative p-6`}
            key={plan.id}
          >
            {plan.recommended ? (
              <div
                className={`absolute right-5 top-5 px-3 py-1 text-xs font-semibold text-white ${getRadiusClass(
                  theme.radius,
                )}`}
                style={{ backgroundColor: theme.primaryColor }}
              >
                Recommended
              </div>
            ) : null}
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <div className="mt-4 text-4xl font-bold">{plan.price}</div>
            <p className="mt-3 leading-7 text-slate-600">{plan.description}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {plan.benefits.map((benefit) => (
                <li className="flex gap-2" key={benefit}>
                  <span style={{ color: theme.primaryColor }}>✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <a
              className={`mt-6 inline-flex w-full items-center justify-center px-5 py-3 font-semibold text-white ${getRadiusClass(
                theme.radius,
              )}`}
              href="#cta"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {plan.ctaLabel}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
