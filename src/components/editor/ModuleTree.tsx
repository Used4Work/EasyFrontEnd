"use client";

import { useRef, useState, type DragEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { SectionNode, SectionType } from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";

type DropPosition = "before" | "after";

type Props = {
  sections: SectionNode[];
  selectedSectionId: string;
  onSelect: (sectionId: string) => void;
  onMove: (sectionId: string, direction: "up" | "down") => void;
  onMoveToTarget: (
    sectionId: string,
    targetSectionId: string,
    position: DropPosition,
  ) => void;
  onToggleVisibility: (sectionId: string) => void;
  onDuplicate: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
  onAdd: (type: SectionType) => void;
};

const addableTypes: SectionType[] = [
  "hero",
  "feature_grid",
  "social_proof",
  "pricing",
  "faq",
  "cta",
];

export function ModuleTree({
  sections,
  selectedSectionId,
  onSelect,
  onMove,
  onMoveToTarget,
  onToggleVisibility,
  onDuplicate,
  onDelete,
  onAdd,
}: Props) {
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);
  const draggedSectionIdRef = useRef<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    sectionId: string;
    position: DropPosition;
  } | null>(null);

  const clearDragState = () => {
    draggedSectionIdRef.current = null;
    setDraggedSectionId(null);
    setDropTarget(null);
  };

  return (
    <aside className="flex min-h-0 w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-4">
        <h2 className="text-sm font-semibold text-slate-950">页面结构</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          拖拽模块调整顺序，点选后在右侧编辑。
        </p>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-auto p-3">
        {sections.map((section, index) => (
          <div
            className={cn(
              "rounded-lg border p-2 transition",
              selectedSectionId === section.id
                ? "border-blue-400 bg-blue-50"
                : "border-slate-200 bg-white",
              !section.style.visible && "opacity-55",
              draggedSectionId === section.id && "opacity-40",
              dropTarget?.sectionId === section.id &&
                dropTarget.position === "before" &&
                "border-t-4 border-t-blue-500",
              dropTarget?.sectionId === section.id &&
                dropTarget.position === "after" &&
                "border-b-4 border-b-blue-500",
            )}
            draggable
            onDragEnd={clearDragState}
            onDragOver={(event) => {
              const sourceId = draggedSectionIdRef.current ?? draggedSectionId;

              if (!sourceId || sourceId === section.id) {
                return;
              }

              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setDropTarget({
                sectionId: section.id,
                position: getDropPosition(event),
              });
            }}
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", section.id);
              draggedSectionIdRef.current = section.id;
              setDraggedSectionId(section.id);
              onSelect(section.id);
            }}
            onDrop={(event) => {
              event.preventDefault();
              const sourceId =
                draggedSectionIdRef.current ??
                draggedSectionId ??
                event.dataTransfer.getData("text/plain");
              const position =
                dropTarget?.sectionId === section.id
                  ? dropTarget.position
                  : getDropPosition(event);

              if (sourceId && sourceId !== section.id) {
                onMoveToTarget(sourceId, section.id, position);
              }

              clearDragState();
            }}
            key={section.id}
          >
            <button
              className="flex w-full items-center justify-between gap-3 text-left"
              onClick={() => onSelect(section.id)}
              type="button"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900">
                  {section.label}
                </span>
                <span className="text-xs text-slate-500">
                  {sectionTypeLabel(section.type)}
                </span>
              </span>
              <span className="flex items-center gap-2 text-xs text-slate-400">
                <span title="拖拽排序">↕</span>
                <span>{index + 1}</span>
              </span>
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
        <label
          className="text-xs font-semibold uppercase tracking-normal text-slate-500"
          htmlFor="add-section"
        >
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

function getDropPosition(event: DragEvent<HTMLElement>): DropPosition {
  const rect = event.currentTarget.getBoundingClientRect();
  return event.clientY < rect.top + rect.height / 2 ? "before" : "after";
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
