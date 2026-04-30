import { describe, expect, it } from "vitest";
import { sampleProject } from "@/lib/dsl/sampleProjects";
import { exportHtml } from "@/lib/export/exportHtml";
import { exportReactTailwind } from "@/lib/export/exportReactTailwind";

describe("exporters", () => {
  it("exportHtml preserves expected section order", () => {
    const html = exportHtml(sampleProject);

    expect(html.indexOf('data-section-type="header"')).toBeLessThan(
      html.indexOf('data-section-type="hero"'),
    );
    expect(html.indexOf('data-section-type="hero"')).toBeLessThan(
      html.indexOf('data-section-type="pricing"'),
    );
    expect(html.indexOf('data-section-type="pricing"')).toBeLessThan(
      html.indexOf('data-section-type="faq"'),
    );
  });

  it("exportReactTailwind includes key content", () => {
    const output = exportReactTailwind(sampleProject);

    expect(output).toContain("LandingPage");
    expect(output).toContain("Turn your expertise into a polished AI course landing page");
    expect(output).toContain("Choose the starting point that fits your launch");
  });
});
