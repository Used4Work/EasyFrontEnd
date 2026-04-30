import { expect, test } from "@playwright/test";
import path from "node:path";
import {
  clearBrowserProject,
  expectNoSeriousAccessibilityIssues,
  fixturePath,
  visibleCanvasSectionIds,
} from "./helpers";

test.describe("full product human simulation", () => {
  test("handles guarded start-flow mistakes", async ({ page }) => {
    await clearBrowserProject(page);
    await page.goto("/start");

    await expect(page.getByRole("button", { name: "解析草图并构建" })).toBeDisabled();

    await page
      .locator('input[accept="image/*"]')
      .setInputFiles(fixturePath("invalid-project.json"));
    await expect(page.getByText("请上传图片格式的手绘草图。")).toBeVisible();

    await page
      .locator('input[accept="application/json,.json"]')
      .setInputFiles(fixturePath("invalid-project.json"));
    await expect(page.getByText(/恢复失败/)).toBeVisible();
  });

  test("creates a draft from guided answers and runs an accessibility scan", async ({
    page,
  }) => {
    await clearBrowserProject(page);
    await page.goto("/start");

    await page.getByRole("button", { name: /SaaS 产品落地页/ }).click();
    await page.getByLabel("目标用户").fill("正在验证新产品的创业团队");
    await page.getByLabel("产品 / 服务名称").fill("转化雷达");
    await page.getByLabel("希望访客做什么").fill("预约产品演示");
    await page.getByLabel("页面语气").selectOption("premium");
    await page.getByRole("button", { name: "生成页面草稿" }).click();

    await page.waitForURL("**/");
    await expect(page.getByRole("heading", { name: "SaaS 产品落地页" })).toBeVisible();
    await expect(page.getByText("转化雷达").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "质量评分" })).toBeVisible();

    await expectNoSeriousAccessibilityIssues(page);
  });

  test("uses editor, preview, module controls, backup, restore, reset, and export", async ({
    context,
    page,
  }, testInfo) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await clearBrowserProject(page);
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "AI 课程落地页" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "质量评分" })).toBeVisible();

    await page.getByRole("button", { name: "内容" }).click();
    await page
      .getByRole("textbox", { name: "标题", exact: true })
      .fill("全真模拟编辑后的标题");
    await expect(
      page.getByRole("heading", { name: "全真模拟编辑后的标题" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "样式" }).click();
    await page.getByLabel("模块背景").selectOption("dark");
    await page.getByLabel("布局样式").selectOption("centered");
    await page.getByLabel("卡片风格").selectOption("bordered");
    await page.getByLabel("间距密度").selectOption("comfortable");
    await page.locator("#primary-color").fill("#0f766e");
    await page.getByLabel("圆角").selectOption("large");
    await page.getByLabel("整体语气").selectOption("premium");

    await page.getByRole("button", { name: "AI 辅助优化" }).click();
    await expect(
      page.getByRole("link", { name: "立即预约免费体验课" }).first(),
    ).toBeVisible();

    await page.getByRole("button", { name: /^功能亮点 功能亮点/ }).click();
    await page.getByRole("button", { name: "内容" }).click();
    await page
      .getByRole("group", { name: "功能 1" })
      .getByRole("textbox", { name: "标题" })
      .fill("自动化校验亮点");
    await page
      .getByRole("group", { name: "功能 1" })
      .getByRole("textbox", { name: "图标占位" })
      .fill("验");
    await expect(page.getByRole("heading", { name: "自动化校验亮点" })).toBeVisible();

    await page.getByRole("button", { name: /^价格方案 价格方案/ }).click();
    await page
      .getByRole("group", { name: "方案 1" })
      .getByRole("textbox", { name: "方案名称" })
      .fill("模拟专业版");
    await page
      .getByRole("group", { name: "方案 1" })
      .getByRole("textbox", { name: "价格" })
      .fill("¥888");
    await page
      .getByRole("group", { name: "方案 1" })
      .getByRole("checkbox", { name: "推荐方案" })
      .check();
    await expect(page.getByRole("heading", { name: "模拟专业版" })).toBeVisible();
    await expect(page.getByText("¥888")).toBeVisible();

    await page.getByRole("button", { name: /^常见问题 常见问题/ }).click();
    await page
      .getByRole("group", { name: "问题 1" })
      .getByRole("textbox", { name: "问题" })
      .fill("自动化能检查导出吗？");
    await page
      .getByRole("group", { name: "问题 1" })
      .getByRole("textbox", { name: "答案" })
      .fill("可以，浏览器测试会打开导出面板并检查当前 DSL 内容。");
    await expect(
      page.getByRole("heading", { name: "自动化能检查导出吗？" }),
    ).toBeVisible();

    await page.getByRole("button", { name: /^最终行动 最终行动/ }).click();
    await page.getByRole("textbox", { name: "按钮文案" }).fill("提交自动化验证");
    await expect(page.getByRole("link", { name: "提交自动化验证" })).toBeVisible();

    await page.getByRole("button", { name: "隐藏 用户痛点" }).click();
    await expect(page.locator('main [data-section-id="pain-1"]')).toHaveCount(0);
    await page.getByRole("button", { name: "显示 用户痛点" }).click();
    await expect(page.locator('main [data-section-id="pain-1"]')).toHaveCount(1);

    await page.getByRole("button", { name: "复制 首屏" }).click();
    await expect(page.getByRole("button", { name: /^首屏 副本 首屏/ })).toBeVisible();
    await page.getByRole("button", { name: "删除 首屏 副本" }).click();
    await expect(page.getByRole("button", { name: /^首屏 副本 首屏/ })).toHaveCount(0);

    await page.getByLabel("添加模块").selectOption("cta");
    await expect(page.getByRole("button", { name: /^最终行动 最终行动/ })).toHaveCount(2);

    const sectionIdsBeforeDrag = await visibleCanvasSectionIds(page);
    const heroIndexBeforeDrag = sectionIdsBeforeDrag.indexOf("hero-1");

    const sourceModule = page.getByRole("button", { name: /^首屏 首屏/ }).locator("xpath=..");
    const targetModule = page.getByRole("button", { name: /^用户痛点 用户痛点/ }).locator("xpath=..");
    const sourceBox = await sourceModule.boundingBox();
    const targetBox = await targetModule.boundingBox();

    expect(sourceBox).not.toBeNull();
    expect(targetBox).not.toBeNull();

    if (sourceBox && targetBox) {
      await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + 18);
      await page.mouse.down();
      await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + 72, { steps: 6 });
      await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height - 8, {
        steps: 12,
      });
      await page.mouse.up();
    }
    await expect.poll(async () => visibleCanvasSectionIds(page)).toContain("hero-1");
    const sectionIdsAfterDrag = await visibleCanvasSectionIds(page);
    expect(sectionIdsAfterDrag.indexOf("hero-1")).not.toBe(heroIndexBeforeDrag);

    await page.getByRole("button", { name: "手机" }).first().click();
    await expect(page.getByRole("button", { name: "手机" }).first()).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await page.getByRole("button", { name: "桌面" }).first().click();

    await page.getByRole("button", { name: "预览" }).click();
    await expect(page.getByRole("heading", { name: "页面预览" })).toBeVisible();
    await page.getByRole("button", { name: "关闭" }).click();
    await expect(page.getByRole("heading", { name: "页面预览" })).toHaveCount(0);

    await page.getByRole("button", { name: "导出" }).click();
    await expect(page.getByRole("heading", { name: "导出代码" })).toBeVisible();
    await expect(page.locator("pre")).toContainText("全真模拟编辑后的标题");
    await page.getByRole("button", { name: "React" }).click();
    await expect(page.locator("pre")).toContainText("export function LandingPage");
    await page.getByRole("button", { name: "复制代码" }).click();
    await expect(page.getByRole("button", { name: "已复制" })).toBeVisible();
    await page.getByRole("button", { name: "关闭" }).click();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "备份" }).click();
    const download = await downloadPromise;
    const backupPath = path.join(testInfo.outputDir, download.suggestedFilename());
    await download.saveAs(backupPath);

    await page.getByRole("button", { name: "重置" }).click();
    await expect(page.getByRole("heading", { name: "全真模拟编辑后的标题" })).toHaveCount(
      0,
    );
    await page
      .locator('input[accept="application/json,.json"]')
      .setInputFiles(backupPath);
    await expect(
      page.getByRole("heading", { name: "全真模拟编辑后的标题" }),
    ).toBeVisible();
  });
});
