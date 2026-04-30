import type { FAQContent, SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { getCardClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function FAQSection({ section, theme }: Props) {
  const content = section.content as FAQContent;

  return (
    <div className="mx-auto w-full max-w-4xl px-5" id="faq">
      <h2 className="text-3xl font-bold leading-tight">{content.title}</h2>
      <div className="mt-8 space-y-4">
        {content.items.map((item) => (
          <article className={`${getCardClass(section.style.cardStyle, theme.radius)} p-6`} key={item.id}>
            <h3 className="font-semibold">{item.question}</h3>
            <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
