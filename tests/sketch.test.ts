import { describe, expect, it } from "vitest";
import { mockSketchAdapter } from "@/lib/sketch/mockSketchAdapter";
import { validateProject } from "@/lib/dsl/validators";
import type { FeatureGridContent, HeroContent } from "@/lib/dsl/types";

describe("sketch adapter", () => {
  it("parses an uploaded sketch into a valid editable project DSL", async () => {
    const result = await mockSketchAdapter.parseSketchToProject({
      fileName: "component-sketch.png",
      fileSize: 184_000,
      imageDataUrl: "data:image/png;base64,abc123",
      mimeType: "image/png",
    });
    const validation = validateProject(result.project);
    const hero = result.project.pages[0].sections.find((section) => section.type === "hero");
    const features = result.project.pages[0].sections.find(
      (section) => section.type === "feature_grid",
    );

    expect(validation.valid).toBe(true);
    expect(result.notes[0]).toContain("mock 草图解析器");
    expect(result.project.name).toContain("手绘组件草图");
    expect((hero?.content as HeroContent).title).toContain("手绘组件想法");
    expect((features?.content as FeatureGridContent).features[0].title).toBe("整体布局");
    expect(JSON.stringify(result.project)).not.toContain("data:image/png");
  });
});
