"use client";

import { Button } from "@/components/ui/Button";
import type { SectionNode, SectionType } from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";

type Props = {
  sections: SectionNode[];
  selectedSectionId: string;
  onSelect: (sectionId: string) => void;
  onMove: (sectionId: string, direction: "up" | "down") => void;
  onToggleVisibility: (sectionId: string) => void;
  onDuplicate: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
  onAdd: (type: SectionType) => void;
};

const addableTypes: SectionType[] = ["hero", "feature_grid", "social_proof", "pricing", "faq", "cta"];

export function ModuleTree({
  sections,
  selectedSectionId,
  onSelect,
  onMove,
  onToggleVisibility,
  onDuplicate,
  onDelete,
  onAdd,
}: Props) {
  return (
    <aside className="flex min-h-0 w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-950">页面结构</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">按业务模块编辑，不需要理解图层。</p>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-auto p-3">
        {sections.map((section, index) => (
          <div
            className={cn(
              "rounded-lg border p-2",
              selectedSectionId === section.id ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white",
              !section.style.visible && "opacity-55",
            )}
            key={section.id}
          >
            <button
              className="flex w-full items-center justify-between gap-3 text-left"
              onClick={() => onSelect(section.id)}
              type="button"
            >
              <span>
                <span className="block text-sm font-semibold text-slate-900">{section.label}</span>
                <span className="text-xs text-slate-500">{sectionTypeLabel(section.type)}</span>
              </span>
              <span className="text-xs text-slate-400">{index + 1}</span>
            </button>
            <div className="mt-2 grid grid-cols-5 gap-1">
              <Button
                aria-label={`上移 ${section.label}`}
                disabled={index === 0}
                onClick={() => onMove(section.id, "up")}
                size="sm"
                title="上移"
                variant="ghost"
              >
                ↑
              </Button>
              <Button
                aria-label={`下移 ${section.label}`}
                disabled={index === sections.length - 1}
                onClick={() => onMove(section.id, "down")}
                size="sm"
                title="下移"
                variant="ghost"
              >
                ↓
              </Button>
              <Button
                aria-label={`${section.style.visible ? "隐藏" : "显示"} ${section.label}`}
                onClick={() => onToggleVisibility(section.id)}
                size="sm"
                title={section.style.visible ? "隐藏" : "显示"}
                variant="ghost"
              >
                {section.style.visible ? "◐" : "○"}
              </Button>
              <Button
                aria-label={`复制 ${section.label}`}
                onClick={() => onDuplicate(section.id)}
                size="sm"
                title="复制"
                variant="ghost"
              >
                ⧉
              </Button>
              <Button
                aria-label={`删除 ${section.label}`}
                onClick={() => onDelete(section.id)}
                size="sm"
                title="删除"
                variant="danger"
              >
                ×
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 p-3">
        <label className="text-xs font-semibold uppercase tracking-normal text-slate-500" htmlFor="add-section">
          添加模块
        </label>
        <select
          className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          defaultValue=""
          id="add-section"
          onChange={(event) => {
            const value = event.target.value as SectionType;
            if (value) {
              onAdd(value);
              event.target.value = "";
            }
          }}
        >
          <option value="">选择模块</option>
          {addableTypes.map((type) => (
            <option key={type} value={type}>
              {sectionTypeLabel(type)}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

function sectionTypeLabel(type: SectionType) {
  return (
    {
      header: "页头导航",
      hero: "首屏",
      pain_points: "用户痛点",
      feature_grid: "功能亮点",
      social_proof: "信任证明",
      pricing: "价格方案",
      faq: "常见问题",
      cta: "最终行动",
      footer: "页脚",
    }[type] ?? type
  );
}
