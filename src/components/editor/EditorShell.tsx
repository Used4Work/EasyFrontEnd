"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { mockAiAdapter } from "@/lib/ai/mockAiAdapter";
import {
  addSection,
  deleteSection,
  duplicateSection,
  findSection,
  getPrimaryPage,
  reorderSection,
  toggleSectionVisibility,
  updateSectionContent,
  updateSectionStyle,
  updateTheme,
} from "@/lib/dsl/mutations";
import { sampleProject } from "@/lib/dsl/sampleProjects";
import type { EasyFrontendProject, SectionType, ToneToken, WizardAnswers } from "@/lib/dsl/types";
import { scoreProject } from "@/lib/quality/scoreProject";
import { CanvasPreview } from "./CanvasPreview";
import { DeviceSwitcher, type DeviceMode } from "./DeviceSwitcher";
import { ExportPanel } from "./ExportPanel";
import { InspectorPanel } from "./InspectorPanel";
import { ModuleTree } from "./ModuleTree";
import { QualityPanel } from "./QualityPanel";

const defaultAnswers: WizardAnswers = {
  scenario: "ai_course",
  audience: "busy creators",
  offer: "AI Course Studio",
  primaryAction: "Book a Free Strategy Call",
  tone: "education",
};

export function EditorShell() {
  const [project, setProject] = useState<EasyFrontendProject>(sampleProject);
  const [answers, setAnswers] = useState<WizardAnswers>(defaultAnswers);
  const [selectedSectionId, setSelectedSectionId] = useState("hero-1");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [exportOpen, setExportOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved locally");

  const selectedSection = findSection(project, selectedSectionId) ?? getPrimaryPage(project).sections[0];
  const quality = useMemo(() => scoreProject(project), [project]);

  const updateProject = (nextProject: EasyFrontendProject) => {
    setProject(nextProject);
    setSaveStatus("Unsaved preview");
    window.setTimeout(() => setSaveStatus("Saved locally"), 600);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-950">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">EasyFrontEnd</p>
          <h1 className="text-lg font-semibold">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setDevice("desktop")} variant="secondary">
            Preview
          </Button>
          <Button
            onClick={async () => {
              const result = await mockAiAdapter.improveSectionCopy({
                project,
                sectionId: selectedSection?.id ?? "",
              });
              setSaveStatus(result.message);
              window.setTimeout(() => setSaveStatus("Saved locally"), 2200);
            }}
            variant="secondary"
          >
            AI Optimize
          </Button>
          <Button onClick={() => setExportOpen(true)} variant="primary">
            Export
          </Button>
          <span className="min-w-32 text-right text-xs text-slate-500">{saveStatus}</span>
        </div>
      </header>

      <section className="grid gap-3 border-b border-slate-200 bg-white px-4 py-3 md:grid-cols-[180px_1fr_1fr_1fr_160px_auto]">
        <Select
          label="Page Type"
          onChange={(value) =>
            setAnswers((current) => ({ ...current, scenario: value as WizardAnswers["scenario"] }))
          }
          options={[
            ["ai_course", "AI Course"],
            ["saas", "SaaS Product"],
            ["personal_service", "Personal Service"],
          ]}
          value={answers.scenario}
        />
        <Input
          label="Audience"
          onChange={(audience) => setAnswers((current) => ({ ...current, audience }))}
          value={answers.audience}
        />
        <Input
          label="Offer"
          onChange={(offer) => setAnswers((current) => ({ ...current, offer }))}
          value={answers.offer}
        />
        <Input
          label="Primary Action"
          onChange={(primaryAction) => setAnswers((current) => ({ ...current, primaryAction }))}
          value={answers.primaryAction}
        />
        <Select
          label="Tone"
          onChange={(tone) => setAnswers((current) => ({ ...current, tone: tone as ToneToken }))}
          options={[
            ["business", "Business"],
            ["modern_saas", "Modern SaaS"],
            ["education", "Education"],
            ["playful", "Playful"],
            ["premium", "Premium"],
          ]}
          value={answers.tone}
        />
        <div className="flex items-end">
          <Button
            onClick={async () => {
              const draft = await mockAiAdapter.generateLandingPageDraft(answers);
              updateProject(draft);
              setSelectedSectionId("hero-1");
            }}
            variant="primary"
          >
            Generate Draft
          </Button>
        </div>
      </section>

      <div className="flex min-h-0 flex-1">
        <ModuleTree
          onAdd={(type: SectionType) => {
            const nextProject = addSection(project, type, selectedSection?.id);
            updateProject(nextProject);
          }}
          onDelete={(sectionId) => {
            const nextProject = deleteSection(project, sectionId);
            updateProject(nextProject);
            if (sectionId === selectedSectionId) {
              setSelectedSectionId(getPrimaryPage(nextProject).sections[0]?.id ?? "");
            }
          }}
          onDuplicate={(sectionId) => updateProject(duplicateSection(project, sectionId))}
          onMove={(sectionId, direction) => updateProject(reorderSection(project, sectionId, direction))}
          onSelect={setSelectedSectionId}
          onToggleVisibility={(sectionId) => updateProject(toggleSectionVisibility(project, sectionId))}
          sections={getPrimaryPage(project).sections}
          selectedSectionId={selectedSectionId}
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Canvas</p>
              <p className="text-sm text-slate-600">Click any module to edit it.</p>
            </div>
            <DeviceSwitcher onChange={setDevice} value={device} />
          </div>
          <CanvasPreview
            device={device}
            onSelectSection={setSelectedSectionId}
            project={project}
            selectedSectionId={selectedSectionId}
          />
        </main>

        <div className="flex min-h-0 w-96 flex-col">
          <InspectorPanel
            onContentPatch={(sectionId, patch) =>
              updateProject(updateSectionContent(project, sectionId, patch))
            }
            onStylePatch={(sectionId, patch) => updateProject(updateSectionStyle(project, sectionId, patch))}
            onThemePatch={(patch) => updateProject(updateTheme(project, patch))}
            project={project}
            section={selectedSection}
            suggestions={quality.suggestions}
          />
          <QualityPanel score={quality} />
        </div>
      </div>

      <ExportPanel onClose={() => setExportOpen(false)} open={exportOpen} project={project} />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `wizard-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500" htmlFor={id}>
        {label}
      </label>
      <input
        className="mt-1 h-9 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </div>
  );
}

function Select({
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
  const id = `wizard-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500" htmlFor={id}>
        {label}
      </label>
      <select
        className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
