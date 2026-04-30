import type { EasyFrontendProject } from "@/lib/dsl/types";

export const exportReactTailwind = (project: EasyFrontendProject) => {
  const sections = project.pages[0].sections
    .filter((section) => section.style.visible)
    .map(
      (section) => `      <section data-section-id="${escapeJsx(section.id)}" data-section-type="${
        section.type
      }" className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase text-slate-500">${escapeJsx(section.label)}</p>
          <h2 className="mt-2 text-3xl font-bold">${escapeJsx(primaryHeading(section.content))}</h2>
          <div className="mt-4 text-slate-600">${escapeJsx(summaryText(section.content))}</div>
        </div>
      </section>`,
    )
    .join("\n");

  return `export function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
${sections}
    </main>
  );
}
`;
};

function primaryHeading(content: Record<string, unknown>) {
  const title = content.title;
  const brand = content.brand;
  return typeof title === "string" ? title : typeof brand === "string" ? brand : "落地页模块";
}

function summaryText(content: Record<string, unknown>) {
  const subtitle = content.subtitle;
  const description = content.description;
  const primaryCta = content.primaryCta;
  const buttonLabel = content.buttonLabel;

  if (typeof subtitle === "string") {
    return subtitle;
  }

  if (typeof description === "string") {
    return description;
  }

  if (typeof buttonLabel === "string") {
    return buttonLabel;
  }

  if (
    typeof primaryCta === "object" &&
    primaryCta !== null &&
    "label" in primaryCta &&
    typeof primaryCta.label === "string"
  ) {
    return primaryCta.label;
  }

  return JSON.stringify(content).slice(0, 220);
}

const escapeJsx = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
