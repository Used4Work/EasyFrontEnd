import { describe, expect, it } from "vitest";
import { updateSectionContent } from "@/lib/dsl/mutations";
import { sampleProject } from "@/lib/dsl/sampleProjects";
import type { HeroContent } from "@/lib/dsl/types";
import { scoreProject } from "@/lib/quality/scoreProject";

describe("quality score", () => {
  it("scores the sample project with basic dimensions", () => {
    const score = scoreProject(sampleProject);

    expect(score.overall).toBeGreaterThan(70);
    expect(score.dimensions.map((dimension) => dimension.name)).toContain("CTA Clarity");
  });

  it("flags weak hero CTA text", () => {
    const hero = sampleProject.pages[0].sections.find((section) => section.id === "hero-1");
    const content = hero?.content as HeroContent;
    const weakProject = updateSectionContent(sampleProject, "hero-1", {
      primaryCta: { ...content.primaryCta, label: "Go" },
    });
    const score = scoreProject(weakProject);

    expect(score.suggestions.some((suggestion) => suggestion.id === "improve-hero-cta")).toBe(
      true,
    );
  });
});
