import type { FooterContent, SectionNode } from "@/lib/dsl/types";

type Props = {
  section: SectionNode;
};

export function FooterSection({ section }: Props) {
  const content = section.content as FooterContent;

  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="font-semibold">{content.brand}</div>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/70">{content.description}</p>
      </div>
      <nav className="flex gap-5 text-sm text-white/70">
        {content.links.map((link) => (
          <a className="transition hover:text-white" href={link.href} key={link.id}>
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
