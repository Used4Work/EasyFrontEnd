import type { EasyFrontendProject } from "@/lib/dsl/types";
import { validateProject } from "@/lib/dsl/validators";

export const activeProjectStorageKey = "easyfrontend.activeProject.v1";

export type ProjectStorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export type LoadProjectResult =
  | { status: "empty" }
  | { status: "loaded"; project: EasyFrontendProject }
  | { status: "invalid"; reason: string };

export type SaveProjectResult = { ok: true } | { ok: false; reason: string };

export const loadProjectFromStorage = (
  storage: ProjectStorageLike,
  key = activeProjectStorageKey,
): LoadProjectResult => {
  const rawProject = storage.getItem(key);

  if (!rawProject) {
    return { status: "empty" };
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawProject);
  } catch {
    return { status: "invalid", reason: "本地保存的项目 JSON 无法解析。" };
  }

  if (!looksLikeProject(parsed)) {
    return { status: "invalid", reason: "本地保存的项目结构不正确。" };
  }

  const validation = validateProject(parsed);

  if (!validation.valid) {
    return {
      status: "invalid",
      reason: validation.issues.map((issue) => issue.message).join(" "),
    };
  }

  return { status: "loaded", project: parsed };
};

export const saveProjectToStorage = (
  storage: ProjectStorageLike,
  project: EasyFrontendProject,
  key = activeProjectStorageKey,
): SaveProjectResult => {
  const validation = validateProject(project);

  if (!validation.valid) {
    return {
      ok: false,
      reason: validation.issues.map((issue) => issue.message).join(" "),
    };
  }

  try {
    storage.setItem(key, JSON.stringify(project));
  } catch {
    return { ok: false, reason: "项目无法保存到浏览器本地存储。" };
  }

  return { ok: true };
};

export const clearProjectStorage = (
  storage: ProjectStorageLike,
  key = activeProjectStorageKey,
) => {
  storage.removeItem(key);
};

const looksLikeProject = (value: unknown): value is EasyFrontendProject => {
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
