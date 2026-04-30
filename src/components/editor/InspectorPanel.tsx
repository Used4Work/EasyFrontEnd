"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
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
  SectionStyle,
  SocialProofContent,
  ThemeTokens,
} from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";

type InspectorTab = "content" | "style" | "suggestions";

type Props = {
  project: EasyFrontendProject;
  section?: SectionNode;
  onContentPatch: (sectionId: string, patch: Record<string, unknown>) => void;
  onStylePatch: (sectionId: string, patch: Partial<SectionStyle>) => void;
  onThemePatch: (patch: Partial<ThemeTokens>) => void;
  onSuggestionApplied?: (message: string) => void;
  suggestions: Array<{ id: string; message: string; targetSectionId?: string }>;
};

export function InspectorPanel({
  project,
  section,
  onContentPatch,
  onStylePatch,
  onThemePatch,
  onSuggestionApplied,
  suggestions,
}: Props) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("content");
  const sectionSuggestions = useMemo(
    () =>
      suggestions.filter(
        (suggestion) => !section || suggestion.targetSectionId === section.id,
      ),
    [section, suggestions],
  );

  if (!section) {
    return (
      <aside className="w-80 border-l border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold">属性面板</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          请先在画布或页面结构中选择一个模块。
        </p>
      </aside>
    );
  }

  return (
    <aside className="flex min-h-0 w-96 flex-col border-l border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
          当前模块
        </p>
        <h2 className="mt-1 text-base font-semibold text-slate-950">{section.label}</h2>
      </div>
      <div className="grid grid-cols-3 gap-1 border-b border-slate-200 p-2">
        {(
          [
            ["content", "内容"],
            ["style", "样式"],
            ["suggestions", "智能建议"],
          ] as const
        ).map(([tab, label]) => (
          <Button
            className={cn(
              activeTab === tab && "bg-slate-900 text-white hover:bg-slate-900",
            )}
            key={tab}
            onClick={() => setActiveTab(tab)}
            size="sm"
            variant="ghost"
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        {activeTab === "content" ? (
          <ContentEditor section={section} onContentPatch={onContentPatch} />
        ) : null}
        {activeTab === "style" ? (
          <StyleEditor
            project={project}
            section={section}
            onStylePatch={onStylePatch}
            onThemePatch={onThemePatch}
          />
        ) : null}
        {activeTab === "suggestions" ? (
          <SmartSuggestions
            onContentPatch={onContentPatch}
            onSuggestionApplied={onSuggestionApplied}
            section={section}
            suggestions={sectionSuggestions}
          />
        ) : null}
      </div>
    </aside>
  );
}

function ContentEditor({
  section,
  onContentPatch,
}: {
  section: SectionNode;
  onContentPatch: (sectionId: string, patch: Record<string, unknown>) => void;
}) {
  const patch = (patchValue: Record<string, unknown>) =>
    onContentPatch(section.id, patchValue);

  switch (section.type) {
    case "header": {
      const content = section.content as HeaderContent;
      return (
        <FieldStack>
          <TextField
            label="Brand"
            value={content.brand}
            onChange={(brand) => patch({ brand })}
          />
          <TextField
            label="Header CTA"
            value={content.cta.label}
            onChange={(label) => patch({ cta: { ...content.cta, label } })}
          />
        </FieldStack>
      );
    }
    case "hero": {
      const content = section.content as HeroContent;
      return (
        <FieldStack>
          <TextField
            label="Eyebrow"
            value={content.eyebrow}
            onChange={(eyebrow) => patch({ eyebrow })}
          />
          <TextArea
            label="Title"
            value={content.title}
            onChange={(title) => patch({ title })}
          />
          <TextArea
            label="Subtitle"
            value={content.subtitle}
            onChange={(subtitle) => patch({ subtitle })}
          />
          <TextField
            label="Primary Button"
            value={content.primaryCta.label}
            onChange={(label) => patch({ primaryCta: { ...content.primaryCta, label } })}
          />
          <TextField
            label="Secondary Button"
            value={content.secondaryCta.label}
            onChange={(label) =>
              patch({ secondaryCta: { ...content.secondaryCta, label } })
            }
          />
          <TextField
            label="Image Placeholder"
            value={content.imagePlaceholder}
            onChange={(imagePlaceholder) => patch({ imagePlaceholder })}
          />
        </FieldStack>
      );
    }
    case "pain_points": {
      const content = section.content as PainPointsContent;
      return (
        <FieldStack>
          <TextArea
            label="Section Title"
            value={content.title}
            onChange={(title) => patch({ title })}
          />
          {content.items.map((item, index) => (
            <GroupedFields key={item.id} title={`痛点 ${index + 1}`}>
              <TextField
                label="Title"
                value={item.title}
                onChange={(title) =>
                  patch({
                    items: content.items.map((entry) =>
                      entry.id === item.id ? { ...entry, title } : entry,
                    ),
                  })
                }
              />
              <TextArea
                label="Description"
                value={item.description}
                onChange={(description) =>
                  patch({
                    items: content.items.map((entry) =>
                      entry.id === item.id ? { ...entry, description } : entry,
                    ),
                  })
                }
              />
            </GroupedFields>
          ))}
        </FieldStack>
      );
    }
    case "feature_grid": {
      const content = section.content as FeatureGridContent;
      return (
        <FieldStack>
          <TextArea
            label="Section Title"
            value={content.title}
            onChange={(title) => patch({ title })}
          />
          <TextArea
            label="Subtitle"
            value={content.subtitle}
            onChange={(subtitle) => patch({ subtitle })}
          />
          {content.features.map((feature, index) => (
            <GroupedFields key={feature.id} title={`功能 ${index + 1}`}>
              <TextField
                label="Title"
                value={feature.title}
                onChange={(title) =>
                  patch({
                    features: content.features.map((entry) =>
                      entry.id === feature.id ? { ...entry, title } : entry,
                    ),
                  })
                }
              />
              <TextArea
                label="Description"
                value={feature.description}
                onChange={(description) =>
                  patch({
                    features: content.features.map((entry) =>
                      entry.id === feature.id ? { ...entry, description } : entry,
                    ),
                  })
                }
              />
              <TextField
                label="Icon Placeholder"
                value={feature.icon}
                onChange={(icon) =>
                  patch({
                    features: content.features.map((entry) =>
                      entry.id === feature.id ? { ...entry, icon } : entry,
                    ),
                  })
                }
              />
            </GroupedFields>
          ))}
        </FieldStack>
      );
    }
    case "social_proof": {
      const content = section.content as SocialProofContent;
      return (
        <FieldStack>
          <TextArea
            label="Section Title"
            value={content.title}
            onChange={(title) => patch({ title })}
          />
          {content.quotes.map((quote, index) => (
            <GroupedFields key={quote.id} title={`评价 ${index + 1}`}>
              <TextArea
                label="Quote"
                value={quote.quote}
                onChange={(nextQuote) =>
                  patch({
                    quotes: content.quotes.map((entry) =>
                      entry.id === quote.id ? { ...entry, quote: nextQuote } : entry,
                    ),
                  })
                }
              />
              <TextField
                label="Author"
                value={quote.author}
                onChange={(author) =>
                  patch({
                    quotes: content.quotes.map((entry) =>
                      entry.id === quote.id ? { ...entry, author } : entry,
                    ),
                  })
                }
              />
            </GroupedFields>
          ))}
        </FieldStack>
      );
    }
    case "pricing": {
      const content = section.content as PricingContent;
      return (
        <FieldStack>
          <TextArea
            label="Section Title"
            value={content.title}
            onChange={(title) => patch({ title })}
          />
          <TextArea
            label="Subtitle"
            value={content.subtitle}
            onChange={(subtitle) => patch({ subtitle })}
          />
          {content.plans.map((plan, index) => (
            <GroupedFields key={plan.id} title={`方案 ${index + 1}`}>
              <TextField
                label="Plan Name"
                value={plan.name}
                onChange={(name) =>
                  patch({
                    plans: content.plans.map((entry) =>
                      entry.id === plan.id ? { ...entry, name } : entry,
                    ),
                  })
                }
              />
              <TextField
                label="Price"
                value={plan.price}
                onChange={(price) =>
                  patch({
                    plans: content.plans.map((entry) =>
                      entry.id === plan.id ? { ...entry, price } : entry,
                    ),
                  })
                }
              />
              <TextArea
                label="Benefits"
                value={plan.benefits.join("\n")}
                onChange={(benefits) =>
                  patch({
                    plans: content.plans.map((entry) =>
                      entry.id === plan.id
                        ? {
                            ...entry,
                            benefits: benefits
                              .split("\n")
                              .map((benefit) => benefit.trim())
                              .filter(Boolean),
                          }
                        : entry,
                    ),
                  })
                }
              />
              <TextField
                label="Button"
                value={plan.ctaLabel}
                onChange={(ctaLabel) =>
                  patch({
                    plans: content.plans.map((entry) =>
                      entry.id === plan.id ? { ...entry, ctaLabel } : entry,
                    ),
                  })
                }
              />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  checked={plan.recommended}
                  onChange={(event) =>
                    patch({
                      plans: content.plans.map((entry) =>
                        entry.id === plan.id
                          ? { ...entry, recommended: event.target.checked }
                          : { ...entry, recommended: false },
                      ),
                    })
                  }
                  type="checkbox"
                />
                推荐方案
              </label>
            </GroupedFields>
          ))}
        </FieldStack>
      );
    }
    case "faq": {
      const content = section.content as FAQContent;
      return (
        <FieldStack>
          <TextArea
            label="Section Title"
            value={content.title}
            onChange={(title) => patch({ title })}
          />
          {content.items.map((item, index) => (
            <GroupedFields key={item.id} title={`问题 ${index + 1}`}>
              <TextArea
                label="Question"
                value={item.question}
                onChange={(question) =>
                  patch({
                    items: content.items.map((entry) =>
                      entry.id === item.id ? { ...entry, question } : entry,
                    ),
                  })
                }
              />
              <TextArea
                label="Answer"
                value={item.answer}
                onChange={(answer) =>
                  patch({
                    items: content.items.map((entry) =>
                      entry.id === item.id ? { ...entry, answer } : entry,
                    ),
                  })
                }
              />
            </GroupedFields>
          ))}
        </FieldStack>
      );
    }
    case "cta": {
      const content = section.content as CTASectionContent;
      return (
        <FieldStack>
          <TextArea
            label="Title"
            value={content.title}
            onChange={(title) => patch({ title })}
          />
          <TextArea
            label="Subtitle"
            value={content.subtitle}
            onChange={(subtitle) => patch({ subtitle })}
          />
          <TextField
            label="Button"
            value={content.buttonLabel}
            onChange={(buttonLabel) => patch({ buttonLabel })}
          />
        </FieldStack>
      );
    }
    case "footer": {
      const content = section.content as FooterContent;
      return (
        <FieldStack>
          <TextField
            label="Brand"
            value={content.brand}
            onChange={(brand) => patch({ brand })}
          />
          <TextArea
            label="Description"
            value={content.description}
            onChange={(description) => patch({ description })}
          />
        </FieldStack>
      );
    }
  }
}

function StyleEditor({
  project,
  section,
  onStylePatch,
  onThemePatch,
}: {
  project: EasyFrontendProject;
  section: SectionNode;
  onStylePatch: (sectionId: string, patch: Partial<SectionStyle>) => void;
  onThemePatch: (patch: Partial<ThemeTokens>) => void;
}) {
  return (
    <FieldStack>
      <SelectField
        label="Module Background"
        onChange={(background) =>
          onStylePatch(section.id, {
            background: background as SectionStyle["background"],
          })
        }
        options={[
          ["default", "默认"],
          ["muted", "柔和"],
          ["primary", "主色"],
          ["dark", "深色"],
        ]}
        value={section.style.background}
      />
      <SelectField
        label="Layout Variant"
        onChange={(layout) =>
          onStylePatch(section.id, { layout: layout as SectionStyle["layout"] })
        }
        options={[
          ["stacked", "上下排列"],
          ["split", "左右分栏"],
          ["grid", "网格"],
          ["centered", "居中"],
        ]}
        value={section.style.layout}
      />
      <SelectField
        label="Card Style"
        onChange={(cardStyle) =>
          onStylePatch(section.id, { cardStyle: cardStyle as SectionStyle["cardStyle"] })
        }
        options={[
          ["flat", "简洁"],
          ["bordered", "描边"],
          ["elevated", "浮起"],
        ]}
        value={section.style.cardStyle}
      />
      <SelectField
        label="Spacing Density"
        onChange={(spacing) =>
          onStylePatch(section.id, { spacing: spacing as SectionStyle["spacing"] })
        }
        options={[
          ["compact", "紧凑"],
          ["standard", "标准"],
          ["comfortable", "宽松"],
        ]}
        value={section.style.spacing}
      />
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="primary-color">
          主色
        </label>
        <div className="mt-2 flex items-center gap-2">
          <input
            className="h-10 w-14 rounded-md border border-slate-200 bg-white p-1"
            id="primary-color"
            onChange={(event) => onThemePatch({ primaryColor: event.target.value })}
            type="color"
            value={project.theme.primaryColor}
          />
          <span className="text-sm text-slate-500">{project.theme.primaryColor}</span>
        </div>
      </div>
      <SelectField
        label="Corner Style"
        onChange={(radius) => onThemePatch({ radius: radius as ThemeTokens["radius"] })}
        options={[
          ["none", "无圆角"],
          ["small", "小圆角"],
          ["medium", "中等圆角"],
          ["large", "大圆角"],
          ["pill", "胶囊"],
        ]}
        value={project.theme.radius}
      />
      <SelectField
        label="Overall Tone"
        onChange={(tone) => onThemePatch({ tone: tone as ThemeTokens["tone"] })}
        options={[
          ["business", "商务稳重"],
          ["modern_saas", "现代 SaaS"],
          ["education", "教育亲和"],
          ["playful", "轻松活泼"],
          ["premium", "高端专业"],
        ]}
        value={project.theme.tone}
      />
    </FieldStack>
  );
}

function SmartSuggestions({
  suggestions,
  section,
  onContentPatch,
  onSuggestionApplied,
}: {
  suggestions: Array<{ id: string; message: string }>;
  section: SectionNode;
  onContentPatch: (sectionId: string, patch: Record<string, unknown>) => void;
  onSuggestionApplied?: (message: string) => void;
}) {
  const fallback = [
    `${section.label} 的文案应当让用户一眼看懂结果。`,
    "按钮文案要具体，让访客知道下一步做什么。",
    "如果模块里卡片或长文案较多，请检查手机预览是否拥挤。",
  ];

  const messages =
    suggestions.length > 0
      ? suggestions.map((suggestion) => suggestion.message)
      : fallback;
  const actions = buildSmartActions(section);

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700"
          key={message}
        >
          {message}
        </div>
      ))}
      {actions.length > 0 ? (
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">
            可一键应用
          </p>
          {actions.map((action) => (
            <div
              className="rounded-lg border border-blue-100 bg-blue-50 p-3"
              key={action.id}
            >
              <div className="text-sm font-semibold text-slate-950">{action.label}</div>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {action.description}
              </p>
              <Button
                className="mt-3"
                onClick={() => {
                  onContentPatch(section.id, action.patch);
                  onSuggestionApplied?.(`已应用建议：${action.label}`);
                }}
                size="sm"
                variant="primary"
              >
                应用建议
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type SmartAction = {
  id: string;
  label: string;
  description: string;
  patch: Record<string, unknown>;
};

function buildSmartActions(section: SectionNode): SmartAction[] {
  switch (section.type) {
    case "header": {
      const content = section.content as HeaderContent;
      return [
        {
          id: "header-cta",
          label: "强化导航行动按钮",
          description: "让页头按钮更像明确行动，而不是普通链接。",
          patch: { cta: { ...content.cta, label: strongerCta(content.cta.label) } },
        },
      ];
    }
    case "hero": {
      const content = section.content as HeroContent;
      return [
        {
          id: "hero-title",
          label: "让首屏标题更像结果承诺",
          description: "标题会更聚焦用户能获得的结果。",
          patch: { title: strongerTitle(content.title) },
        },
        {
          id: "hero-cta",
          label: "强化首屏主按钮",
          description: "主按钮会变成更明确的下一步行动。",
          patch: {
            primaryCta: {
              ...content.primaryCta,
              label: strongerCta(content.primaryCta.label),
            },
          },
        },
      ];
    }
    case "pain_points": {
      const content = section.content as PainPointsContent;
      return [
        {
          id: "pain-title",
          label: "让痛点标题更直接",
          description: "用更清楚的问题表达帮助访客产生共鸣。",
          patch: { title: strongerTitle(content.title) },
        },
      ];
    }
    case "feature_grid": {
      const content = section.content as FeatureGridContent;
      return [
        {
          id: "feature-subtitle",
          label: "强调功能带来的业务价值",
          description: "副标题会从功能罗列转向用户收益。",
          patch: {
            subtitle: content.subtitle.includes("价值")
              ? content.subtitle
              : `${content.subtitle} 每个功能都应对应一个清晰价值。`,
          },
        },
      ];
    }
    case "social_proof": {
      const content = section.content as SocialProofContent;
      const hasQuotes = content.quotes.length > 0;
      return [
        {
          id: "proof-quote",
          label: hasQuotes ? "优化第一条客户评价" : "补一条客户评价",
          description: "信任证明会更像真实用户反馈，而不是占位文字。",
          patch: {
            quotes: hasQuotes
              ? content.quotes.map((quote, index) =>
                  index === 0
                    ? {
                        ...quote,
                        quote: "这个页面让我很快看懂价值，也知道下一步该怎么行动。",
                        author: quote.author || "早期客户",
                      }
                    : quote,
                )
              : [
                  {
                    id: `${section.id}-quote-1`,
                    quote: "这个页面让我很快看懂价值，也知道下一步该怎么行动。",
                    author: "早期客户",
                  },
                ],
          },
        },
      ];
    }
    case "pricing": {
      const content = section.content as PricingContent;
      const recommendedPlanId =
        content.plans.find((plan) => plan.recommended)?.id ?? content.plans[0]?.id;

      if (!recommendedPlanId) {
        return [];
      }

      return [
        {
          id: "pricing-recommend",
          label: "突出一个推荐方案",
          description: "降低访客选择成本，并强化推荐方案按钮。",
          patch: {
            plans: content.plans.map((plan) =>
              plan.id === recommendedPlanId
                ? { ...plan, recommended: true, ctaLabel: strongerCta(plan.ctaLabel) }
                : { ...plan, recommended: false },
            ),
          },
        },
      ];
    }
    case "faq": {
      const content = section.content as FAQContent;
      return [
        {
          id: "faq-objection",
          label: "补一个成交顾虑问题",
          description: "增加一个常见疑问，帮助访客更放心地继续行动。",
          patch: {
            items: [
              ...content.items,
              {
                id: `${section.id}-trust-faq`,
                question: "如果我还不确定适不适合怎么办？",
                answer: "可以先通过一次轻量咨询或体验，确认需求匹配后再决定下一步。",
              },
            ],
          },
        },
      ];
    }
    case "cta": {
      const content = section.content as CTASectionContent;
      return [
        {
          id: "cta-button",
          label: "强化最终行动按钮",
          description: "最终按钮会更明确地推动访客继续。",
          patch: { buttonLabel: strongerCta(content.buttonLabel) },
        },
      ];
    }
    case "footer":
      return [];
  }
}

function strongerCta(currentLabel: string) {
  const trimmed = currentLabel.trim();

  if (!trimmed) {
    return "立即开始";
  }

  if (trimmed.startsWith("立即")) {
    return trimmed;
  }

  if (trimmed.includes("预约")) {
    return "立即预约体验";
  }

  if (trimmed.includes("试用")) {
    return "立即免费试用";
  }

  return `立即${trimmed}`;
}

function strongerTitle(currentTitle: string) {
  const trimmed = currentTitle.trim();

  if (!trimmed) {
    return "把核心价值讲清楚，让访客马上行动";
  }

  if (trimmed.includes("更清楚") || trimmed.includes("马上行动")) {
    return trimmed;
  }

  return `${trimmed}，让访客更清楚下一步`;
}

function FieldStack({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}

function GroupedFields({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <fieldset className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <legend className="px-1 text-sm font-semibold text-slate-800">{title}</legend>
      {children}
    </fieldset>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useFieldId(label);
  const labelText = fieldLabel(label);

  return (
    <div>
      <label className="text-sm font-medium text-slate-700" htmlFor={id}>
        {labelText}
      </label>
      <input
        className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useFieldId(label);
  const labelText = fieldLabel(label);

  return (
    <div>
      <label className="text-sm font-medium text-slate-700" htmlFor={id}>
        {labelText}
      </label>
      <textarea
        className="mt-2 min-h-24 w-full rounded-md border border-slate-200 px-3 py-2 text-sm leading-6 text-slate-900 outline-none focus:border-blue-400"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}) {
  const id = useFieldId(label);
  const labelText = fieldLabel(label);

  return (
    <div>
      <label className="text-sm font-medium text-slate-700" htmlFor={id}>
        {labelText}
      </label>
      <select
        className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([optionValue, labelText]) => (
          <option key={optionValue} value={optionValue}>
            {labelText}
          </option>
        ))}
      </select>
    </div>
  );
}

function useFieldId(label: string) {
  const generatedId = useId();
  return `${generatedId}-${label.toLowerCase().replaceAll(" ", "-")}`;
}

function fieldLabel(label: string) {
  return (
    {
      Brand: "品牌名称",
      "Header CTA": "导航按钮",
      Eyebrow: "小标题",
      Title: "标题",
      Subtitle: "副标题",
      "Primary Button": "主按钮",
      "Secondary Button": "次按钮",
      "Image Placeholder": "图片占位说明",
      "Section Title": "模块标题",
      Description: "描述",
      "Icon Placeholder": "图标占位",
      Quote: "客户评价",
      Author: "署名",
      "Plan Name": "方案名称",
      Price: "价格",
      Benefits: "权益列表",
      Button: "按钮文案",
      Question: "问题",
      Answer: "答案",
      "Module Background": "模块背景",
      "Layout Variant": "布局样式",
      "Card Style": "卡片风格",
      "Spacing Density": "间距密度",
      "Corner Style": "圆角",
      "Overall Tone": "整体语气",
    }[label] ?? label
  );
}
