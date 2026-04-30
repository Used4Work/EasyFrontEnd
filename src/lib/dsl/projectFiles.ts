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
    throw new Error(`无法备份无效项目：${validation.issues[0]?.message}`);
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
    return { ok: false, reason: "项目备份文件不是有效的 JSON。" };
  }

  if (isProjectFile(parsed)) {
    if (parsed.version !== projectFileVersion) {
      return {
        ok: false,
        reason: `不支持的项目备份版本：${String(parsed.version)}。`,
      };
    }

    const validation = validateProject(parsed.project);

    if (!validation.valid) {
      return {
        ok: false,
        reason: validation.issues[0]?.message ?? "项目备份校验失败。",
      };
    }

    return { ok: true, project: parsed.project, file: parsed };
  }

  if (looksLikeRawProject(parsed)) {
    const validation = validateProject(parsed);

    if (!validation.valid) {
      return {
        ok: false,
        reason: validation.issues[0]?.message ?? "项目 DSL 校验失败。",
      };
    }

    return { ok: true, project: parsed };
  }

  return {
    ok: false,
    reason: "项目备份文件必须包含 EasyFrontEnd 项目。",
  };
};

export const createProjectFileName = (project: EasyFrontendProject) => {
  const nameStem = toSafeFileStem(project.name);
  const safeName = nameStem.length >= 3 ? nameStem : toSafeFileStem(project.id);

  return `${safeName || "easyfrontend-project"}.easyfrontend.json`;
};

const toSafeFileStem = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

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
