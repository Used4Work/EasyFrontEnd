import { describe, expect, it } from "vitest";
import {
  createProjectFileName,
  exportProjectFileJson,
  parseProjectFileJson,
  projectFileFormat,
  projectFileVersion,
} from "@/lib/dsl/projectFiles";
import { sampleProject } from "@/lib/dsl/sampleProjects";

describe("project file import/export", () => {
  it("exports a wrapped project JSON file", () => {
    const json = exportProjectFileJson(sampleProject, "2026-04-30T00:00:00.000Z");
    const parsed = JSON.parse(json);

    expect(parsed.format).toBe(projectFileFormat);
    expect(parsed.version).toBe(projectFileVersion);
    expect(parsed.exportedAt).toBe("2026-04-30T00:00:00.000Z");
    expect(parsed.project.id).toBe(sampleProject.id);
  });

  it("imports a wrapped project JSON file", () => {
    const json = exportProjectFileJson(sampleProject, "2026-04-30T00:00:00.000Z");
    const result = parseProjectFileJson(json);

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.project.name).toBe(sampleProject.name);
      expect(result.file?.format).toBe(projectFileFormat);
    }
  });

  it("imports raw valid project DSL for recovery", () => {
    const result = parseProjectFileJson(JSON.stringify(sampleProject));

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.project.pages[0].sections[0].id).toBe("header-1");
    }
  });

  it("rejects invalid JSON", () => {
    const result = parseProjectFileJson("{not-json");

    expect(result).toEqual({ ok: false, reason: "Project file is not valid JSON." });
  });

  it("rejects unsupported project file versions", () => {
    const wrapped = JSON.parse(exportProjectFileJson(sampleProject));
    wrapped.version = 999;

    const result = parseProjectFileJson(JSON.stringify(wrapped));

    expect(result).toEqual({ ok: false, reason: "Unsupported project file version: 999." });
  });

  it("rejects invalid project content", () => {
    const wrapped = JSON.parse(exportProjectFileJson(sampleProject));
    wrapped.project.pages = [];

    const result = parseProjectFileJson(JSON.stringify(wrapped));

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.reason).toBe("At least one page is required.");
    }
  });

  it("creates safe project file names", () => {
    expect(createProjectFileName(sampleProject)).toBe("ai-course-landing-page.easyfrontend.json");
  });
});
