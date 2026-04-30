import type { EasyFrontendProject } from "./types";
import { validateProject } from "./validators";

export const projectFileFormat = "easyfrontend.project";
export const projectFileVersion = 1;

export type EasyFrontendProjectFile = {
  format: typeof projectFileFormat;
  version: typeof projectFileVersion;
  exportedAt: string;
  project: EasyFrontendProject;
};

export type ParseProjectFileResult =
  | { ok: true; project: EasyFrontendProject; file?: EasyFrontendProjectFile }
  | { ok: false; reason: string };

export const exportProjectFileJson = (
  project: EasyFrontendProject,
  exportedAt = new Date().toISOString(),
) => {
  const validation = validateProject(project);

  if (!validation.valid) {
    throw new Error(`Cannot export invalid project: ${validation.issues[0]?.message}`);
  }

  const file: EasyFrontendProjectFile = {
    format: projectFileFormat,
    version: projectFileVersion,
    exportedAt,
    project,
  };

  return `${JSON.stringify(file, null, 2)}\n`;
};

export const parseProjectFileJson = (rawJson: string): ParseProjectFileResult => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { ok: false, reason: "Project file is not valid JSON." };
  }

  if (isProjectFile(parsed)) {
    if (parsed.version !== projectFileVersion) {
      return {
        ok: false,
        reason: `Unsupported project file version: ${String(parsed.version)}.`,
      };
    }

    const validation = validateProject(parsed.project);

    if (!validation.valid) {
      return {
        ok: false,
        reason: validation.issues[0]?.message ?? "Project file failed validation.",
      };
    }

    return { ok: true, project: parsed.project, file: parsed };
  }

  if (looksLikeRawProject(parsed)) {
    const validation = validateProject(parsed);

    if (!validation.valid) {
      return {
        ok: false,
        reason: validation.issues[0]?.message ?? "Project DSL failed validation.",
      };
    }

    return { ok: true, project: parsed };
  }

  return {
    ok: false,
    reason: "Project file must contain an EasyFrontEnd project.",
  };
};

export const createProjectFileName = (project: EasyFrontendProject) => {
  const safeName = project.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return `${safeName || "easyfrontend-project"}.easyfrontend.json`;
};

const isProjectFile = (value: unknown): value is EasyFrontendProjectFile => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.format === projectFileFormat &&
    typeof value.version === "number" &&
    typeof value.exportedAt === "string" &&
    isRecord(value.project)
  );
};

const looksLikeRawProject = (value: unknown): value is EasyFrontendProject => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    value.pageType === "landing_page" &&
    isRecord(value.theme) &&
    Array.isArray(value.pages)
  );
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;
