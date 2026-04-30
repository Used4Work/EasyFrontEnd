import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";
import path from "node:path";

export const fixturePath = (fileName: string) =>
  path.join(process.cwd(), "e2e/fixtures", fileName);

export async function clearBrowserProject(page: Page) {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());
}

export async function expectNoSeriousAccessibilityIssues(page: Page) {
  const results = await new AxeBuilder({ page })
    .disableRules(["color-contrast"])
    .analyze();
  const seriousViolations = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );

  expect(
    seriousViolations,
    seriousViolations
      .map(
        (violation) =>
          `${violation.id}: ${violation.help} (${violation.nodes.length} node(s))`,
      )
      .join("\n"),
  ).toEqual([]);
}

export async function visibleCanvasSectionIds(page: Page) {
  return page
    .locator("main [data-section-id]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-section-id")),
    );
}
