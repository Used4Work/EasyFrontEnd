import { expect, test } from "@playwright/test";
import path from "node:path";

test("human-like sketch upload, edit, suggestion, and export flow", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.localStorage.clear());

  await page.goto("/start");
  await expect(page.getByRole("heading", { name: "AI 辅助生成页面初稿" })).toBeVisible();

  await page
    .locator('input[accept="image/*"]')
    .setInputFiles(path.join(process.cwd(), "e2e/fixtures/hand-drawn-component-sketch.svg"));
  await expect(page.getByText("已选择：hand-drawn-component-sketch.svg")).toBeVisible();

  await page.getByRole("button", { name: "解析草图并构建" }).click();
  await page.waitForURL("**/");
  await expect(page.getByRole("heading", { name: /手绘组件草图解析稿/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^草图首屏 首屏/ })).toBeVisible();

  await page.getByRole("button", { name: "内容" }).click();
  await page.getByRole("textbox", { name: "标题", exact: true }).fill("手绘组件已经变成可编辑页面");
  await expect(page.getByRole("heading", { name: "手绘组件已经变成可编辑页面" })).toBeVisible();

  await page.getByRole("button", { name: "智能建议" }).click();
  await page.getByRole("button", { name: "应用建议" }).first().click();
  await expect(
    page.getByRole("heading", { name: "手绘组件已经变成可编辑页面，让访客更清楚下一步" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "导出" }).click();
  await expect(page.getByRole("heading", { name: "导出代码" })).toBeVisible();
  await expect(page.locator("pre")).toContainText("手绘组件");
});
