"use client";

import { useRef, useState } from "react";
import type { EasyFrontendProject } from "@/lib/dsl/types";
import { RenderSection, type SectionDropPosition } from "./RenderSection";

type Props = {
  project: EasyFrontendProject;
  selectedSectionId?: string;
  onSectionSelect?: (sectionId: string) => void;
  onSectionMove?: (
    sectionId: string,
    targetSectionId: string,
    position: SectionDropPosition,
  ) => void;
};

export function RenderPage({
  project,
  selectedSectionId,
  onSectionSelect,
  onSectionMove,
}: Props) {
  const page = project.pages[0];
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);
  const draggedSectionIdRef = useRef<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    sectionId: string;
    position: SectionDropPosition;
  } | null>(null);
  const canDragSections = Boolean(onSectionMove);

  const clearDragState = () => {
    draggedSectionIdRef.current = null;
    setDraggedSectionId(null);
    setDropTarget(null);
  };

  return (
    <div
      className="min-h-full overflow-hidden"
      style={{
        backgroundColor: project.theme.backgroundColor,
        color: project.theme.textColor,
      }}
    >
      {page.sections.map((section) => (
        <RenderSection
          key={section.id}
          draggable={canDragSections}
          dropPosition={
            dropTarget?.sectionId === section.id ? dropTarget.position : undefined
          }
          onDragEnd={clearDragState}
          onDragOver={(sectionId, position) => {
            const sourceId = draggedSectionIdRef.current ?? draggedSectionId;

            if (!sourceId || sourceId === sectionId) {
              return;
            }

            setDropTarget({ sectionId, position });
          }}
          onDragStart={(sectionId) => {
            draggedSectionIdRef.current = sectionId;
            setDraggedSectionId(sectionId);
            onSectionSelect?.(sectionId);
          }}
          onDrop={(targetSectionId, position) => {
            const sourceId = draggedSectionIdRef.current ?? draggedSectionId;

            if (sourceId && sourceId !== targetSectionId) {
              onSectionMove?.(sourceId, targetSectionId, position);
            }

            clearDragState();
          }}
          onSelect={onSectionSelect}
          section={section}
          selected={section.id === selectedSectionId}
          theme={project.theme}
        />
      ))}
    </div>
  );
}
