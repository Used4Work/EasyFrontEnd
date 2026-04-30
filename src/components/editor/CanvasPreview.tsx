"use client";

import { RenderPage } from "@/components/rendered/RenderPage";
import type { SectionDropPosition } from "@/components/rendered/RenderSection";
import type { EasyFrontendProject } from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";
import type { DeviceMode } from "./DeviceSwitcher";

type Props = {
  project: EasyFrontendProject;
  device: DeviceMode;
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
  onMoveSection: (
    sectionId: string,
    targetSectionId: string,
    position: SectionDropPosition,
  ) => void;
};

export function CanvasPreview({
  project,
  device,
  selectedSectionId,
  onSelectSection,
  onMoveSection,
}: Props) {
  return (
    <div className="flex min-h-0 flex-1 justify-center overflow-auto bg-slate-100 p-5">
      <div
        className={cn(
          "min-h-full overflow-hidden border border-slate-200 bg-white shadow-sm transition-all",
          device === "desktop" ? "w-full max-w-6xl" : "w-[390px] max-w-full",
        )}
      >
        <RenderPage
          onSectionMove={onMoveSection}
          onSectionSelect={onSelectSection}
          project={project}
          selectedSectionId={selectedSectionId}
        />
      </div>
    </div>
  );
}
