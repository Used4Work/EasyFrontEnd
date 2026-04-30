"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { EasyFrontendProject } from "@/lib/dsl/types";
import { exportHtml } from "@/lib/export/exportHtml";
import { exportReactTailwind } from "@/lib/export/exportReactTailwind";
import { cn } from "@/lib/utils/cn";

type ExportMode = "html" | "react";

type Props = {
  project: EasyFrontendProject;
  open: boolean;
  onClose: () => void;
};

export function ExportPanel({ project, open, onClose }: Props) {
  const [mode, setMode] = useState<ExportMode>("html");
  const [copied, setCopied] = useState(false);
  const output = useMemo(
    () => (mode === "html" ? exportHtml(project) : exportReactTailwind(project)),
    [mode, project],
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/40 p-6">
      <div className="mx-auto flex h-full max-w-5xl flex-col rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Export</h2>
            <p className="text-sm text-slate-500">Generated from the active DSL.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 rounded-md border border-slate-200 bg-white p-1">
              {([
                ["html", "HTML"],
                ["react", "React"],
              ] as const).map(([value, label]) => (
                <Button
                  className={cn(
                    mode === value && "bg-slate-900 text-white hover:bg-slate-900",
                  )}
                  key={value}
                  onClick={() => setMode(value)}
                  size="sm"
                  variant="ghost"
                >
                  {label}
                </Button>
              ))}
            </div>
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(output);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1200);
              }}
              variant="primary"
            >
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </div>
        </div>
        <pre className="min-h-0 flex-1 overflow-auto bg-slate-950 p-5 text-sm leading-6 text-slate-100">
          <code>{output}</code>
        </pre>
      </div>
    </div>
  );
}
