import { createSampleProject } from "@/lib/dsl/sampleProjects";
import type {
  EasyFrontendProject,
  FeatureGridContent,
  HeroContent,
  SectionNode,
  WizardAnswers,
} from "@/lib/dsl/types";
import type { SketchAdapter, SketchParseInput } from "./sketchAdapter";

export const mockSketchAdapter: SketchAdapter = {
  async parseSketchToProject(input) {
    const intent = inferSketchIntent(input.fileName);
    const answers: WizardAnswers = {
      scenario: "saas",
      audience: "想把手绘想法变成前端页面的人",
      offer: intent.offer,
      primaryAction: intent.primaryAction,
      tone: intent.tone,
    };
    const project = createSampleProject(answers);
    const sketchProject = applySketchInterpretation(project, input, intent);

    return {
      project: sketchProject,
      notes: [
        "MVP 使用 mock 草图解析器，尚未调用真实视觉模型。",
        "草图图片只用于本次解析，不会写入项目 DSL。",
        "解析结果已转换为可编辑页面模块，可继续拖拽、点选、修改和导出。",
      ],
    };
  },
};

function inferSketchIntent(fileName: string) {
  const normalized = fileName.toLowerCase();

  if (normalized.includes("component") || normalized.includes("组件")) {
    return {
      offer: "手绘组件草图",
      primaryAction: "查看组件方案",
      tone: "modern_saas" as const,
      title: "把手绘组件想法变成可编辑前端模块",
      subtitle: "系统已将草图理解为组件展示、状态说明和行动入口。",
    };
  }

  if (normalized.includes("dashboard") || normalized.includes("后台") || normalized.includes("admin")) {
    return {
      offer: "手绘后台界面草图",
      primaryAction: "查看界面方案",
      tone: "business" as const,
      title: "把后台界面草图整理成清晰页面结构",
      subtitle: "系统已将草图理解为导航、核心区域、信息卡片和行动入口。",
    };
  }

  return {
    offer: "手绘页面草图",
    primaryAction: "查看构建结果",
    tone: "modern_saas" as const,
    title: "把手绘页面草图变成可编辑前端页面",
    subtitle: "系统已根据草图生成一个结构化起点，后续可在编辑器里继续调整。",
  };
}

function applySketchInterpretation(
  project: EasyFrontendProject,
  input: SketchParseInput,
  intent: ReturnType<typeof inferSketchIntent>,
): EasyFrontendProject {
  const sketchName = readableName(input.fileName);

  return {
    ...project,
    id: `project-sketch-${Date.now()}`,
    name: `${intent.offer}解析稿`,
    pages: project.pages.map((page) => ({
      ...page,
      name: "草图解析稿",
      sections: page.sections.map((section) => interpretSection(section, intent, sketchName, input)),
    })),
  };
}

function interpretSection(
  section: SectionNode,
  intent: ReturnType<typeof inferSketchIntent>,
  sketchName: string,
  input: SketchParseInput,
): SectionNode {
  if (section.type === "hero") {
    const content = section.content as HeroContent;
    return {
      ...section,
      label: "草图首屏",
      content: {
        ...content,
        eyebrow: "由手绘草图解析生成",
        title: intent.title,
        subtitle: `${intent.subtitle} 来源文件：${sketchName}。`,
        primaryCta: { ...content.primaryCta, label: intent.primaryAction },
        imagePlaceholder: `草图视觉参考：${sketchName}`,
      },
      style: { ...section.style, layout: "split", cardStyle: "elevated" },
    };
  }

  if (section.type === "feature_grid") {
    const content = section.content as FeatureGridContent;
    return {
      ...section,
      label: "解析出的界面区域",
      content: {
        ...content,
        title: "从草图中识别出的主要界面区域",
        subtitle: "MVP 先生成可编辑结构，之后可以替换为真实视觉解析。",
        features: [
          {
            id: "sketch-region-layout",
            title: "整体布局",
            description: "根据手绘图推断导航、主视觉和内容区的顺序。",
            icon: "布局",
          },
          {
            id: "sketch-region-cards",
            title: "信息模块",
            description: "将草图中的卡片、按钮和文本块转成可编辑模块。",
            icon: "模块",
          },
          {
            id: "sketch-region-responsive",
            title: "响应式起点",
            description: `图片大小约 ${formatFileSize(input.fileSize)}，已生成可切换桌面/手机的页面草稿。`,
            icon: "适配",
          },
        ],
      },
    };
  }

  if (section.type === "pain_points") {
    return {
      ...section,
      label: "草图待确认点",
      content: {
        title: "这些地方需要你在编辑器里继续确认",
        items: [
          {
            id: "sketch-unknown-copy",
            title: "文字内容",
            description: "手绘草图通常无法准确识别最终文案，请在右侧面板替换成真实内容。",
          },
          {
            id: "sketch-unknown-assets",
            title: "图片与图标",
            description: "MVP 先保留占位说明，后续可接入真实视觉识别或素材替换。",
          },
          {
            id: "sketch-unknown-actions",
            title: "转化路径",
            description: "请确认按钮文案和跳转目标是否符合你的业务目标。",
          },
        ],
      },
    };
  }

  return section;
}

function readableName(fileName: string) {
  const trimmed = fileName.trim();
  return trimmed || "未命名草图";
}

function formatFileSize(fileSize: number) {
  if (fileSize < 1024) {
    return `${fileSize} B`;
  }

  if (fileSize < 1024 * 1024) {
    return `${Math.round(fileSize / 1024)} KB`;
  }

  return `${(fileSize / 1024 / 1024).toFixed(1)} MB`;
}
