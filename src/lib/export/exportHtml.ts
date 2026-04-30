import type {
  CTASectionContent,
  EasyFrontendProject,
  FAQContent,
  FeatureGridContent,
  FooterContent,
  HeaderContent,
  HeroContent,
  PainPointsContent,
  PricingContent,
  SectionNode,
  SocialProofContent,
} from "@/lib/dsl/types";

export const exportHtml = (project: EasyFrontendProject) => {
  const page = project.pages[0];
  const sections = page.sections.filter((section) => section.style.visible).map(sectionToHtml);

  return [
    `<main data-easyfrontend-project="${escapeHtml(project.id)}" style="background:${escapeHtml(
      project.theme.backgroundColor,
    )};color:${escapeHtml(project.theme.textColor)};">`,
    ...sections,
    "</main>",
  ].join("\n");
};

function sectionToHtml(section: SectionNode) {
  const attrs = `data-section-id="${escapeHtml(section.id)}" data-section-type="${escapeHtml(
    section.type,
  )}"`;

  switch (section.type) {
    case "header": {
      const content = section.content as HeaderContent;
      return `<header ${attrs} class="ef-section ef-header"><strong>${escapeHtml(
        content.brand,
      )}</strong><nav>${content.navItems
        .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
        .join("")}</nav><a href="${escapeHtml(content.cta.href)}">${escapeHtml(content.cta.label)}</a></header>`;
    }
    case "hero": {
      const content = section.content as HeroContent;
      return `<section ${attrs} class="ef-section ef-hero"><p>${escapeHtml(
        content.eyebrow,
      )}</p><h1>${escapeHtml(content.title)}</h1><p>${escapeHtml(
        content.subtitle,
      )}</p><a href="${escapeHtml(content.primaryCta.href)}">${escapeHtml(
        content.primaryCta.label,
      )}</a><a href="${escapeHtml(content.secondaryCta.href)}">${escapeHtml(
        content.secondaryCta.label,
      )}</a><div role="img" aria-label="${escapeHtml(content.imagePlaceholder)}">${escapeHtml(
        content.imagePlaceholder,
      )}</div></section>`;
    }
    case "pain_points": {
      const content = section.content as PainPointsContent;
      return `<section ${attrs} class="ef-section ef-pain-points"><h2>${escapeHtml(
        content.title,
      )}</h2>${content.items
        .map(
          (item) =>
            `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`,
        )
        .join("")}</section>`;
    }
    case "feature_grid": {
      const content = section.content as FeatureGridContent;
      return `<section ${attrs} class="ef-section ef-feature-grid"><h2>${escapeHtml(
        content.title,
      )}</h2><p>${escapeHtml(content.subtitle)}</p>${content.features
        .map(
          (feature) =>
            `<article><span>${escapeHtml(feature.icon)}</span><h3>${escapeHtml(
              feature.title,
            )}</h3><p>${escapeHtml(feature.description)}</p></article>`,
        )
        .join("")}</section>`;
    }
    case "social_proof": {
      const content = section.content as SocialProofContent;
      return `<section ${attrs} class="ef-section ef-social-proof"><h2>${escapeHtml(
        content.title,
      )}</h2>${content.metrics
        .map(
          (metric) =>
            `<div><strong>${escapeHtml(metric.value)}</strong><span>${escapeHtml(metric.label)}</span></div>`,
        )
        .join("")}${content.quotes
        .map(
          (quote) =>
            `<blockquote>${escapeHtml(quote.quote)}<footer>${escapeHtml(quote.author)}</footer></blockquote>`,
        )
        .join("")}</section>`;
    }
    case "pricing": {
      const content = section.content as PricingContent;
      return `<section ${attrs} class="ef-section ef-pricing"><h2>${escapeHtml(
        content.title,
      )}</h2><p>${escapeHtml(content.subtitle)}</p>${content.plans
        .map(
          (plan) =>
            `<article data-recommended="${String(plan.recommended)}"><h3>${escapeHtml(
              plan.name,
            )}</h3><strong>${escapeHtml(plan.price)}</strong><p>${escapeHtml(
              plan.description,
            )}</p><ul>${plan.benefits
              .map((benefit) => `<li>${escapeHtml(benefit)}</li>`)
              .join("")}</ul><a href="#cta">${escapeHtml(plan.ctaLabel)}</a></article>`,
        )
        .join("")}</section>`;
    }
    case "faq": {
      const content = section.content as FAQContent;
      return `<section ${attrs} class="ef-section ef-faq"><h2>${escapeHtml(
        content.title,
      )}</h2>${content.items
        .map(
          (item) =>
            `<article><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></article>`,
        )
        .join("")}</section>`;
    }
    case "cta": {
      const content = section.content as CTASectionContent;
      return `<section ${attrs} class="ef-section ef-cta"><h2>${escapeHtml(
        content.title,
      )}</h2><p>${escapeHtml(content.subtitle)}</p><a href="#pricing">${escapeHtml(
        content.buttonLabel,
      )}</a></section>`;
    }
    case "footer": {
      const content = section.content as FooterContent;
      return `<footer ${attrs} class="ef-section ef-footer"><strong>${escapeHtml(
        content.brand,
      )}</strong><p>${escapeHtml(content.description)}</p>${content.links
        .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
        .join("")}</footer>`;
    }
  }
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
