"use client";

import { useMemo, useState } from "react";
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
  suggestions: Array<{ id: string; message: string; targetSectionId?: string }>;
};

export function InspectorPanel({
  project,
  section,
  onContentPatch,
  onStylePatch,
  onThemePatch,
  suggestions,
}: Props) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("content");
  const sectionSuggestions = useMemo(
    () => suggestions.filter((suggestion) => !section || suggestion.targetSectionId === section.id),
    [section, suggestions],
  );

  if (!section) {
    return (
      <aside className="w-80 border-l border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold">Inspector</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">Select a module on the canvas or structure tree.</p>
      </aside>
    );
  }

  return (
    <aside className="flex min-h-0 w-96 flex-col border-l border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Selected Module</p>
        <h2 className="mt-1 text-base font-semibold text-slate-950">{section.label}</h2>
      </div>
      <div className="grid grid-cols-3 gap-1 border-b border-slate-200 p-2">
        {([
          ["content", "Content"],
          ["style", "Style"],
          ["suggestions", "Smart Tips"],
        ] as const).map(([tab, label]) => (
          <Button
            className={cn(activeTab === tab && "bg-slate-900 text-white hover:bg-slate-900")}
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
          <SmartSuggestions suggestions={sectionSuggestions} section={section} />
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
  const patch = (patchValue: Record<string, unknown>) => onContentPatch(section.id, patchValue);

  switch (section.type) {
    case "header": {
      const content = section.content as HeaderContent;
      return (
        <FieldStack>
          <TextField label="Brand" value={content.brand} onChange={(brand) => patch({ brand })} />
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
          <TextField label="Eyebrow" value={content.eyebrow} onChange={(eyebrow) => patch({ eyebrow })} />
          <TextArea label="Title" value={content.title} onChange={(title) => patch({ title })} />
          <TextArea label="Subtitle" value={content.subtitle} onChange={(subtitle) => patch({ subtitle })} />
          <TextField
            label="Primary Button"
            value={content.primaryCta.label}
            onChange={(label) => patch({ primaryCta: { ...content.primaryCta, label } })}
          />
          <TextField
            label="Secondary Button"
            value={content.secondaryCta.label}
            onChange={(label) => patch({ secondaryCta: { ...content.secondaryCta, label } })}
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
          <TextArea label="Section Title" value={content.title} onChange={(title) => patch({ title })} />
          {content.items.map((item, index) => (
            <GroupedFields key={item.id} title={`Pain Point ${index + 1}`}>
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
          <TextArea label="Section Title" value={content.title} onChange={(title) => patch({ title })} />
          <TextArea label="Subtitle" value={content.subtitle} onChange={(subtitle) => patch({ subtitle })} />
          {content.features.map((feature, index) => (
            <GroupedFields key={feature.id} title={`Feature ${index + 1}`}>
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
          <TextArea label="Section Title" value={content.title} onChange={(title) => patch({ title })} />
          {content.quotes.map((quote, index) => (
            <GroupedFields key={quote.id} title={`Quote ${index + 1}`}>
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
          <TextArea label="Section Title" value={content.title} onChange={(title) => patch({ title })} />
          <TextArea label="Subtitle" value={content.subtitle} onChange={(subtitle) => patch({ subtitle })} />
          {content.plans.map((plan, index) => (
            <GroupedFields key={plan.id} title={`Plan ${index + 1}`}>
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
                Recommended plan
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
          <TextArea label="Section Title" value={content.title} onChange={(title) => patch({ title })} />
          {content.items.map((item, index) => (
            <GroupedFields key={item.id} title={`FAQ ${index + 1}`}>
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
          <TextArea label="Title" value={content.title} onChange={(title) => patch({ title })} />
          <TextArea label="Subtitle" value={content.subtitle} onChange={(subtitle) => patch({ subtitle })} />
          <TextField label="Button" value={content.buttonLabel} onChange={(buttonLabel) => patch({ buttonLabel })} />
        </FieldStack>
      );
    }
    case "footer": {
      const content = section.content as FooterContent;
      return (
        <FieldStack>
          <TextField label="Brand" value={content.brand} onChange={(brand) => patch({ brand })} />
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
          onStylePatch(section.id, { background: background as SectionStyle["background"] })
        }
        options={[
          ["default", "Default"],
          ["muted", "Soft"],
          ["primary", "Primary"],
          ["dark", "Dark"],
        ]}
        value={section.style.background}
      />
      <SelectField
        label="Layout Variant"
        onChange={(layout) => onStylePatch(section.id, { layout: layout as SectionStyle["layout"] })}
        options={[
          ["stacked", "Stacked"],
          ["split", "Split"],
          ["grid", "Grid"],
          ["centered", "Centered"],
        ]}
        value={section.style.layout}
      />
      <SelectField
        label="Card Style"
        onChange={(cardStyle) =>
          onStylePatch(section.id, { cardStyle: cardStyle as SectionStyle["cardStyle"] })
        }
        options={[
          ["flat", "Flat"],
          ["bordered", "Bordered"],
          ["elevated", "Elevated"],
        ]}
        value={section.style.cardStyle}
      />
      <SelectField
        label="Spacing Density"
        onChange={(spacing) => onStylePatch(section.id, { spacing: spacing as SectionStyle["spacing"] })}
        options={[
          ["compact", "Compact"],
          ["standard", "Standard"],
          ["comfortable", "Comfortable"],
        ]}
        value={section.style.spacing}
      />
      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="primary-color">
          Primary Color
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
          ["none", "None"],
          ["small", "Small"],
          ["medium", "Medium"],
          ["large", "Large"],
          ["pill", "Pill"],
        ]}
        value={project.theme.radius}
      />
      <SelectField
        label="Overall Tone"
        onChange={(tone) => onThemePatch({ tone: tone as ThemeTokens["tone"] })}
        options={[
          ["business", "Business"],
          ["modern_saas", "Modern SaaS"],
          ["education", "Education"],
          ["playful", "Playful"],
          ["premium", "Premium"],
        ]}
        value={project.theme.tone}
      />
    </FieldStack>
  );
}

function SmartSuggestions({
  suggestions,
  section,
}: {
  suggestions: Array<{ id: string; message: string }>;
  section: SectionNode;
}) {
  const fallback = [
    `${section.label} copy should make the user outcome clear.`,
    "Make the next action visible and specific.",
    "Check the mobile preview if this module has several cards or long text.",
  ];

  const messages = suggestions.length > 0 ? suggestions.map((suggestion) => suggestion.message) : fallback;

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700" key={message}>
          {message}
        </div>
      ))}
    </div>
  );
}

function FieldStack({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}

function GroupedFields({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      {children}
    </div>
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
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label className="text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
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
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label className="text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
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
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label className="text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
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
