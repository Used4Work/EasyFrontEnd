"use client";

import type { EasyFrontendProject } from "@/lib/dsl/types";
import { RenderSection } from "./RenderSection";

type Props = {
  project: EasyFrontendProject;
  selectedSectionId?: string;
  onSectionSelect?: (sectionId: string) => void;
};

export function RenderPage({ project, selectedSectionId, onSectionSelect }: Props) {
  const page = project.pages[0];

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
          onSelect={onSectionSelect}
          section={section}
          selected={section.id === selectedSectionId}
          theme={project.theme}
        />
      ))}
    </div>
  );
}
