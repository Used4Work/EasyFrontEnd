import type {
  EasyFrontendProject,
  SectionNode,
  ThemeTokens,
  WizardAnswers,
} from "./types";

const baseTheme: ThemeTokens = {
  primaryColor: "#2563eb",
  backgroundColor: "#f8fafc",
  textColor: "#0f172a",
  radius: "medium",
  density: "standard",
  tone: "modern_saas",
};

export const createLandingPageSections = (answers?: Partial<WizardAnswers>): SectionNode[] => {
  const scenario = answers?.scenario ?? "ai_course";
  const offer =
    answers?.offer ??
    (scenario === "saas"
      ? "LaunchFlow"
      : scenario === "personal_service"
        ? "清晰增长咨询"
        : "AI 实战训练营");
  const audience =
    answers?.audience ??
    (scenario === "saas"
      ? "正在提升转化率的 SaaS 团队"
      : scenario === "personal_service"
        ? "需要专业支持的个人客户"
        : "想系统学习 AI 的职场人");
  const primaryAction = answers?.primaryAction ?? "预约免费体验课";

  return [
    {
      id: "header-1",
      type: "header",
      label: "页头 / 导航",
      content: {
        brand: offer,
        navItems: [
          { id: "nav-features", label: "功能亮点", href: "#features" },
          { id: "nav-pricing", label: "价格方案", href: "#pricing" },
          { id: "nav-faq", label: "常见问题", href: "#faq" },
        ],
        cta: { label: primaryAction, href: "#cta" },
      },
      style: { ...defaultStyle("default"), layout: "split" },
    },
    {
      id: "hero-1",
      type: "hero",
      label: "首屏",
      content: {
        eyebrow:
          scenario === "ai_course"
            ? "面向真实工作的 AI 学习方案"
            : scenario === "saas"
              ? "让产品价值更快被看懂"
              : "用清晰服务页建立信任",
        title:
          scenario === "ai_course"
            ? "把零散 AI 知识变成能上手的实战能力"
            : scenario === "saas"
              ? "在访客离开前，把你的产品价值讲清楚"
              : "把你的服务、案例和预约路径讲得更清楚",
        subtitle: `为${audience}生成的页面草稿，包含可编辑模块、质量评分和可导出的前端代码。`,
        primaryCta: { label: primaryAction, href: "#pricing" },
        secondaryCta: { label: "先看看亮点", href: "#features" },
        imagePlaceholder: "产品 / 服务预览图占位",
      },
      style: { ...defaultStyle("muted"), layout: "split", cardStyle: "elevated" },
      responsive: { mobilePriority: "cta_first", stackOnMobile: true },
    },
    {
      id: "pain-1",
      type: "pain_points",
      label: "用户痛点",
      content: {
        title: "大多数页面还没讲清价值，访客就已经离开",
        items: [
          {
            id: "pain-clarity",
            title: "一句话说不清",
            description: "访客无法快速判断这个产品适合谁、解决什么问题。",
          },
          {
            id: "pain-editing",
            title: "修改成本太高",
            description: "普通用户不想面对 CSS、布局参数和复杂图层。",
          },
          {
            id: "pain-export",
            title: "预览和交付脱节",
            description: "页面看起来不错，但导出的代码和预览效果不一致。",
          },
        ],
      },
      style: defaultStyle("default"),
    },
    {
      id: "features-1",
      type: "feature_grid",
      label: "功能亮点",
      content: {
        title: "从页面草稿到前端交付，一条清晰路径",
        subtitle: "每个模块都可编辑、可评分、可导出。",
        features: [
          {
            id: "feature-ai",
            title: "AI 生成初稿",
            description: "回答几个业务问题，先得到完整页面结构。",
            icon: "AI",
          },
          {
            id: "feature-edit",
            title: "可视化编辑",
            description: "直接修改文案、顺序、按钮和风格，不需要写代码。",
            icon: "编辑",
          },
          {
            id: "feature-score",
            title: "质量评分",
            description: "检查结构完整度、行动按钮、移动端和导出准备度。",
            icon: "评分",
          },
        ],
      },
      style: { ...defaultStyle("muted"), layout: "grid" },
    },
    {
      id: "proof-1",
      type: "social_proof",
      label: "信任证明",
      content: {
        title: "为需要快速完成页面的人设计",
        metrics: [
          { id: "metric-1", value: "8", label: "个可编辑页面模块" },
          { id: "metric-2", value: "1", label: "份稳定页面 DSL" },
          { id: "metric-3", value: "0", label: "个必须理解的 CSS 概念" },
        ],
        quotes: [
          {
            id: "quote-1",
            quote: "我知道下一步该改哪里，而不是盲目拖来拖去。",
            author: "早期体验用户",
          },
        ],
      },
      style: defaultStyle("default"),
    },
    {
      id: "pricing-1",
      type: "pricing",
      label: "价格方案",
      content: {
        title: "选择适合当前阶段的方案",
        subtitle: "先把可信页面做出来，再逐步优化转化。",
        plans: [
          {
            id: "plan-starter",
            name: "基础版",
            price: "¥199",
            description: "适合先验证一个页面想法。",
            benefits: ["AI 页面初稿", "可视化编辑", "HTML 片段导出"],
            recommended: false,
            ctaLabel: "先试基础版",
          },
          {
            id: "plan-pro",
            name: "专业版",
            price: "¥499",
            description: "适合交付一个更完整的发布页面。",
            benefits: ["包含基础版能力", "React/Tailwind 导出", "质量评分建议"],
            recommended: true,
            ctaLabel: primaryAction,
          },
        ],
      },
      style: { ...defaultStyle("muted"), layout: "grid", cardStyle: "elevated" },
    },
    {
      id: "faq-1",
      type: "faq",
      label: "常见问题",
      content: {
        title: "发布前常见问题",
        items: [
          {
            id: "faq-code",
            question: "我需要懂代码吗？",
            answer: "不需要。你可以用业务语义选项编辑页面，需要时再导出代码。",
          },
          {
            id: "faq-edit",
            question: "AI 生成后还能改吗？",
            answer: "可以。每个模块都能在可视化编辑器里继续修改。",
          },
          {
            id: "faq-export",
            question: "预览和导出会一致吗？",
            answer: "会。预览和导出都来自同一份 DSL 结构。",
          },
        ],
      },
      style: defaultStyle("default"),
    },
    {
      id: "cta-1",
      type: "cta",
      label: "最终行动",
      content: {
        title: "准备把页面草稿变成可交付前端了吗？",
        subtitle: "继续调整文案、查看质量评分，然后导出代码。",
        buttonLabel: primaryAction,
      },
      style: { ...defaultStyle("primary"), layout: "centered", cardStyle: "flat" },
    },
    {
      id: "footer-1",
      type: "footer",
      label: "页脚",
      content: {
        brand: offer,
        description: "AI 辅助的可视化前端页面设计工具，基于稳定 DSL 渲染和导出。",
        links: [
          { id: "footer-privacy", label: "隐私", href: "#" },
          { id: "footer-contact", label: "联系", href: "#" },
        ],
      },
      style: { ...defaultStyle("dark"), layout: "split", cardStyle: "flat" },
    },
  ];
};

export const createSampleProject = (
  answers?: Partial<WizardAnswers>,
): EasyFrontendProject => ({
  id: `project-${answers?.scenario ?? "ai-course"}`,
  name:
    answers?.scenario === "saas"
      ? "SaaS 产品落地页"
      : answers?.scenario === "personal_service"
        ? "个人服务落地页"
        : "AI 课程落地页",
  pageType: "landing_page",
  theme: {
    ...baseTheme,
    tone: answers?.tone ?? baseTheme.tone,
  },
  pages: [
    {
      id: "page-home",
      name: "首页",
      slug: "/",
      sections: createLandingPageSections(answers),
    },
  ],
});

export const sampleProject = createSampleProject();

function defaultStyle(background: "default" | "muted" | "primary" | "dark") {
  return {
    background,
    layout: "stacked" as const,
    cardStyle: "bordered" as const,
    spacing: "standard" as const,
    visible: true,
  };
}
