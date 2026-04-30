import { describe, expect, it } from "vitest";
import {
  findSection,
  moveSectionToTarget,
  reorderSection,
  updateSectionContent,
} from "@/lib/dsl/mutations";
import { sampleProject } from "@/lib/dsl/sampleProjects";
import type { HeroContent } from "@/lib/dsl/types";
import { validateProject } from "@/lib/dsl/validators";

describe("DSL foundation", () => {
  it("validates the sample project", () => {
    const result = validateProject(sampleProject);

    expect(result.valid).toBe(true);
    expect(result.issues).toEqual([]);
  });

  it("updates section content immutably", () => {
    const updated = updateSectionContent(sampleProject, "hero-1", {
      title: "A clearer hero title for testing",
    });
    const hero = findSection(updated, "hero-1");
    const originalHero = findSection(sampleProject, "hero-1");

    expect((hero?.content as HeroContent).title).toBe("A clearer hero title for testing");
    expect((originalHero?.content as HeroContent).title).not.toBe(
      "A clearer hero title for testing",
    );
  });

  it("reorders sections", () => {
    const updated = reorderSection(sampleProject, "hero-1", "down");
    const sectionIds = updated.pages[0].sections.map((section) => section.id);

    expect(sectionIds[0]).toBe("header-1");
    expect(sectionIds[1]).toBe("pain-1");
    expect(sectionIds[2]).toBe("hero-1");
  });

  it("moves sections relative to a drop target", () => {
    const updated = moveSectionToTarget(sampleProject, "pricing-1", "hero-1", "before");
    const sectionIds = updated.pages[0].sections.map((section) => section.id);

    expect(sectionIds[0]).toBe("header-1");
    expect(sectionIds[1]).toBe("pricing-1");
    expect(sectionIds[2]).toBe("hero-1");
  });
});
