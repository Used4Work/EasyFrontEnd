import type { PainPointsContent, SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { getCardClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function PainPointsSection({ section, theme }: Props) {
  const content = section.content as PainPointsContent;

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <h2 className="max-w-3xl text-3xl font-bold leading-tight">{content.title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {content.items.map((item) => (
          <article className={`${getCardClass(section.style.cardStyle, theme.radius)} p-6`} key={item.id}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
