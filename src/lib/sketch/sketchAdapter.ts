import type { EasyFrontendProject } from "@/lib/dsl/types";

export type SketchParseInput = {
  fileName: string;
  mimeType: string;
  fileSize: number;
  imageDataUrl?: string;
};

export type SketchParseResult = {
  project: EasyFrontendProject;
  notes: string[];
};

export type SketchAdapter = {
  parseSketchToProject: (input: SketchParseInput) => Promise<SketchParseResult>;
};
