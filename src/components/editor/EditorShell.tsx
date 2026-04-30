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
import { PreviewPanel } from "./PreviewPanel";
import { QualityPanel } from "./QualityPanel";

export function EditorShell() {
  const [project, setProject] = useState<EasyFrontendProject>(sampleProject);
  const [selectedSectionId, setSelectedSectionId] = useState("hero-1");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [exportOpen, setExportOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("正在读取本地项目");
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
        setSaveStatus("已恢复本机保存的项目");
      }

      if (result.status === "empty") {
        setSaveStatus("已保存到本机浏览器");
      }

      if (result.status === "invalid") {
        clearProjectStorage(window.localStorage);
        setSaveStatus("已忽略无效的本地项目");
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
      setSaveStatus(result.ok ? "已保存到本机浏览器" : "本地保存失败");
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [project, storageReady]);

  const updateProject = (nextProject: EasyFrontendProject) => {
    setProject(nextProject);
    setSaveStatus("正在保存...");
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
      setSaveStatus("项目备份已下载");
    } catch (error) {
      setSaveStatus(error instanceof Error ? error.message : "项目备份失败");
    }
  };

  const importProjectJson = async (file: File) => {
    const rawJson = await file.text();
    const result = parseProjectFileJson(rawJson);

    if (!result.ok) {
      setSaveStatus(`恢复失败：${result.reason}`);
      return;
    }

    updateProject(result.project);
    setSelectedSectionId(preferredSectionId(result.project));
    setSaveStatus("项目已恢复");
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
            新建
          </Button>
          <Button
            onClick={() => {
              setPreviewOpen(true);
              setSaveStatus("已打开页面预览");
            }}
            variant="secondary"
          >
            预览
          </Button>
          <Button onClick={exportProjectJson} variant="secondary">
            备份
          </Button>
          <Button
            onClick={() => {
              setSaveStatus("请选择要恢复的项目备份文件");
              importInputRef.current?.click();
            }}
            variant="secondary"
          >
            恢复
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
              setSaveStatus("已重置为中文示例项目");
            }}
            variant="secondary"
          >
            重置
          </Button>
          <Button
            onClick={async () => {
              const result = await mockAiAdapter.improveSectionCopy({
                project,
                sectionId: selectedSection?.id ?? "",
              });
              if (result.patch && selectedSection) {
                updateProject(updateSectionContent(project, selectedSection.id, result.patch));
              }
              setSaveStatus(result.message);
              window.setTimeout(() => setSaveStatus("已保存到本机浏览器"), 2200);
            }}
            variant="secondary"
          >
            AI 优化
          </Button>
          <Button
            onClick={() => {
              setExportOpen(true);
              setSaveStatus("已打开导出面板");
            }}
            variant="primary"
          >
            导出
          </Button>
          <span className="min-w-32 text-right text-xs text-slate-500">{saveStatus}</span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <ModuleTree
          onAdd={(type: SectionType) => {
            const nextProject = addSection(project, type, selectedSection?.id);
            const newSectionId = findNewSectionId(project, nextProject);
            updateProject(nextProject);
            if (newSectionId) {
              setSelectedSectionId(newSectionId);
            }
            setSaveStatus("已添加模块");
          }}
          onDelete={(sectionId) => {
            const nextProject = deleteSection(project, sectionId);
            updateProject(nextProject);
            if (sectionId === selectedSectionId) {
              setSelectedSectionId(getPrimaryPage(nextProject).sections[0]?.id ?? "");
            }
            setSaveStatus("已删除模块");
          }}
          onDuplicate={(sectionId) => {
            const nextProject = duplicateSection(project, sectionId);
            const newSectionId = findNewSectionId(project, nextProject);
            updateProject(nextProject);
            if (newSectionId) {
              setSelectedSectionId(newSectionId);
            }
            setSaveStatus("已复制模块");
          }}
          onMove={(sectionId, direction) => {
            updateProject(reorderSection(project, sectionId, direction));
            setSaveStatus(direction === "up" ? "模块已上移" : "模块已下移");
          }}
          onSelect={setSelectedSectionId}
          onToggleVisibility={(sectionId) => {
            const section = findSection(project, sectionId);
            updateProject(toggleSectionVisibility(project, sectionId));
            setSaveStatus(section?.style.visible ? "已隐藏模块" : "已显示模块");
          }}
          sections={getPrimaryPage(project).sections}
          selectedSectionId={selectedSectionId}
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">画布</p>
              <p className="text-sm text-slate-600">点击页面模块即可编辑。</p>
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
      <PreviewPanel
        device={device}
        onClose={() => setPreviewOpen(false)}
        onDeviceChange={setDevice}
        open={previewOpen}
        project={project}
      />
    </div>
  );
}

function preferredSectionId(project: EasyFrontendProject) {
  const sections = getPrimaryPage(project).sections;
  return sections.find((section) => section.type === "hero")?.id ?? sections[0]?.id ?? "";
}

function findNewSectionId(before: EasyFrontendProject, after: EasyFrontendProject) {
  const beforeIds = new Set(getPrimaryPage(before).sections.map((section) => section.id));
  return getPrimaryPage(after).sections.find((section) => !beforeIds.has(section.id))?.id;
}
