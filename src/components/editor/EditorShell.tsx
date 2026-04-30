"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import {
  createProjectFileName,
  exportProjectFileJson,
  parseProjectFileJson,
} from "@/lib/dsl/projectFiles";
import { sampleProject } from "@/lib/dsl/sampleProjects";
import type { EasyFrontendProject, SectionType } from "@/lib/dsl/types";
import {
  clearProjectStorage,
  loadProjectFromStorage,
  saveProjectToStorage,
} from "@/lib/persistence/localProjectStorage";
import { scoreProject } from "@/lib/quality/scoreProject";
import { CanvasPreview } from "./CanvasPreview";
import { DeviceSwitcher, type DeviceMode } from "./DeviceSwitcher";
import { ExportPanel } from "./ExportPanel";
import { InspectorPanel } from "./InspectorPanel";
import { ModuleTree } from "./ModuleTree";
import { QualityPanel } from "./QualityPanel";

export function EditorShell() {
  const [project, setProject] = useState<EasyFrontendProject>(sampleProject);
  const [selectedSectionId, setSelectedSectionId] = useState("hero-1");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [exportOpen, setExportOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Loading local project");
  const [storageReady, setStorageReady] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  const selectedSection = findSection(project, selectedSectionId) ?? getPrimaryPage(project).sections[0];
  const quality = useMemo(() => scoreProject(project), [project]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const result = loadProjectFromStorage(window.localStorage);

      if (result.status === "loaded") {
        setProject(result.project);
        setSelectedSectionId(preferredSectionId(result.project));
        setSaveStatus("Restored from this browser");
      }

      if (result.status === "empty") {
        setSaveStatus("Saved to this browser");
      }

      if (result.status === "invalid") {
        clearProjectStorage(window.localStorage);
        setSaveStatus("Ignored invalid saved project");
      }

      setStorageReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const result = saveProjectToStorage(window.localStorage, project);
      setSaveStatus(result.ok ? "Saved to this browser" : "Could not save locally");
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [project, storageReady]);

  const updateProject = (nextProject: EasyFrontendProject) => {
    setProject(nextProject);
    setSaveStatus("Saving...");
  };

  const exportProjectJson = () => {
    try {
      const json = exportProjectFileJson(project);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = createProjectFileName(project);
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setSaveStatus("Project JSON exported");
    } catch (error) {
      setSaveStatus(error instanceof Error ? error.message : "Project JSON export failed");
    }
  };

  const importProjectJson = async (file: File) => {
    const rawJson = await file.text();
    const result = parseProjectFileJson(rawJson);

    if (!result.ok) {
      setSaveStatus(`Import failed: ${result.reason}`);
      return;
    }

    updateProject(result.project);
    setSelectedSectionId(preferredSectionId(result.project));
    setSaveStatus("Project JSON imported");
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-950">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">EasyFrontEnd</p>
          <h1 className="text-lg font-semibold">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => window.location.assign("/")} variant="secondary">
            New Project
          </Button>
          <Button onClick={() => setDevice("desktop")} variant="secondary">
            Preview
          </Button>
          <Button onClick={exportProjectJson} variant="secondary">
            Backup
          </Button>
          <Button onClick={() => importInputRef.current?.click()} variant="secondary">
            Restore
          </Button>
          <input
            accept="application/json,.json"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];

              if (file) {
                await importProjectJson(file);
                event.target.value = "";
              }
            }}
            ref={importInputRef}
            type="file"
          />
          <Button
            onClick={() => {
              clearProjectStorage(window.localStorage);
              updateProject(sampleProject);
              setSelectedSectionId("hero-1");
              setSaveStatus("Reset to sample project");
            }}
            variant="secondary"
          >
            Reset
          </Button>
          <Button
            onClick={async () => {
              const result = await mockAiAdapter.improveSectionCopy({
                project,
                sectionId: selectedSection?.id ?? "",
              });
              setSaveStatus(result.message);
              window.setTimeout(() => setSaveStatus("Saved to this browser"), 2200);
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

function preferredSectionId(project: EasyFrontendProject) {
  const sections = getPrimaryPage(project).sections;
  return sections.find((section) => section.type === "hero")?.id ?? sections[0]?.id ?? "";
}
