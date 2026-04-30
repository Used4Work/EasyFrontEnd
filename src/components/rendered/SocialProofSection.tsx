import type { SectionNode, SocialProofContent, ThemeTokens } from "@/lib/dsl/types";
import { getCardClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function SocialProofSection({ section, theme }: Props) {
  const content = section.content as SocialProofContent;

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <h2 className="max-w-3xl text-3xl font-bold leading-tight">{content.title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {content.metrics.map((metric) => (
          <div className={`${getCardClass(section.style.cardStyle, theme.radius)} p-6`} key={metric.id}>
            <div className="text-3xl font-bold" style={{ color: theme.primaryColor }}>
              {metric.value}
            </div>
            <p className="mt-2 text-slate-600">{metric.label}</p>
          </div>
        ))}
      </div>
      {content.quotes.map((quote) => (
        <blockquote
          className={`${getCardClass(section.style.cardStyle, theme.radius)} mt-4 p-6 text-lg leading-8`}
          key={quote.id}
        >
          &quot;{quote.quote}&quot;
          <footer className="mt-3 text-sm font-semibold text-slate-500">{quote.author}</footer>
        </blockquote>
      ))}
    </div>
  );
}
