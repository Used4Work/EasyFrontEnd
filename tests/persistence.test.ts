import { describe, expect, it } from "vitest";
import { sampleProject } from "@/lib/dsl/sampleProjects";
import {
  activeProjectStorageKey,
  clearProjectStorage,
  loadProjectFromStorage,
  saveProjectToStorage,
  type ProjectStorageLike,
} from "@/lib/persistence/localProjectStorage";

class MemoryStorage implements ProjectStorageLike {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

describe("local project storage", () => {
  it("saves and loads a valid project", () => {
    const storage = new MemoryStorage();
    const saveResult = saveProjectToStorage(storage, sampleProject);
    const loadResult = loadProjectFromStorage(storage);

    expect(saveResult.ok).toBe(true);
    expect(loadResult.status).toBe("loaded");

    if (loadResult.status === "loaded") {
      expect(loadResult.project.id).toBe(sampleProject.id);
      expect(loadResult.project.pages[0].sections[0].id).toBe("header-1");
    }
  });

  it("reports empty storage", () => {
    const storage = new MemoryStorage();

    expect(loadProjectFromStorage(storage)).toEqual({ status: "empty" });
  });

  it("rejects invalid JSON", () => {
    const storage = new MemoryStorage();
    storage.setItem(activeProjectStorageKey, "{not-json");

    const result = loadProjectFromStorage(storage);

    expect(result.status).toBe("invalid");
  });

  it("rejects invalid project shape", () => {
    const storage = new MemoryStorage();
    storage.setItem(activeProjectStorageKey, JSON.stringify({ id: "bad" }));

    const result = loadProjectFromStorage(storage);

    expect(result.status).toBe("invalid");
  });

  it("clears saved project data", () => {
    const storage = new MemoryStorage();
    saveProjectToStorage(storage, sampleProject);
    clearProjectStorage(storage);

    expect(loadProjectFromStorage(storage)).toEqual({ status: "empty" });
  });
});
