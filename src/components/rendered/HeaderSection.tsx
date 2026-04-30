import type { HeaderContent, SectionNode, ThemeTokens } from "@/lib/dsl/types";
import { getRadiusClass } from "./renderHelpers";

type Props = {
  section: SectionNode;
  theme: ThemeTokens;
};

export function HeaderSection({ section, theme }: Props) {
  const content = section.content as HeaderContent;

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5">
      <div className="text-lg font-semibold">{content.brand}</div>
      <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
        {content.navItems.map((item) => (
          <a className="transition hover:text-slate-950" href={item.href} key={item.id}>
            {item.label}
          </a>
        ))}
      </nav>
      <a
        className={`inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white ${getRadiusClass(
          theme.radius,
        )}`}
        href={content.cta.href}
        style={{ backgroundColor: theme.primaryColor }}
      >
        {content.cta.label}
      </a>
    </header>
  );
}
