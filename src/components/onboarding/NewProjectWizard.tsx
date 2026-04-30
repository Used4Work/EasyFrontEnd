"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { mockAiAdapter } from "@/lib/ai/mockAiAdapter";
import { parseProjectFileJson } from "@/lib/dsl/projectFiles";
import type { ToneToken, WizardAnswers } from "@/lib/dsl/types";
import {
  getDefaultWizardAnswers,
  scenarioOptions,
  type ScenarioOption,
} from "@/lib/onboarding/wizardDefaults";
import { saveProjectToStorage } from "@/lib/persistence/localProjectStorage";
import { cn } from "@/lib/utils/cn";

const toneOptions: Array<[ToneToken, string]> = [
  ["business", "Business"],
  ["modern_saas", "Modern SaaS"],
  ["education", "Education"],
  ["playful", "Playful"],
  ["premium", "Premium"],
];

export function NewProjectWizard() {
  const router = useRouter();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [answers, setAnswers] = useState<WizardAnswers>(getDefaultWizardAnswers());
  const [status, setStatus] = useState("Ready");
  const [isGenerating, setIsGenerating] = useState(false);

  const selectScenario = (scenario: ScenarioOption) => {
    setAnswers(getDefaultWizardAnswers(scenario.id));
  };

  const generateDraft = async () => {
    setIsGenerating(true);
    setStatus("Generating draft");

    const project = await mockAiAdapter.generateLandingPageDraft(answers);
    const result = saveProjectToStorage(window.localStorage, project);

    if (!result.ok) {
      setStatus(result.reason);
      setIsGenerating(false);
      return;
    }

    setStatus("Draft ready");
    router.push("/editor");
  };

  const restoreProject = async (file: File) => {
    const result = parseProjectFileJson(await file.text());

    if (!result.ok) {
      setStatus(`Restore failed: ${result.reason}`);
      return;
    }

    const saveResult = saveProjectToStorage(window.localStorage, result.project);

    if (!saveResult.ok) {
      setStatus(saveResult.reason);
      return;
    }

    setStatus("Project restored");
    router.push("/editor");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5">
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">EasyFrontEnd</p>
            <h1 className="mt-1 text-xl font-semibold">Create a landing page draft</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => importInputRef.current?.click()} variant="secondary">
              Restore Backup
            </Button>
            <input
              accept="application/json,.json"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];

                if (file) {
                  await restoreProject(file);
                  event.target.value = "";
                }
              }}
              ref={importInputRef}
              type="file"
            />
          </div>
        </header>

        <section className="grid min-h-0 flex-1 gap-5 py-5 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-5">
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold">Page Type</h2>
              <div className="mt-3 space-y-2">
                {scenarioOptions.map((scenario) => (
                  <button
                    className={cn(
                      "w-full rounded-lg border p-3 text-left transition",
                      answers.scenario === scenario.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                    )}
                    key={scenario.id}
                    onClick={() => selectScenario(scenario)}
                    type="button"
                  >
                    <span className="block text-sm font-semibold">{scenario.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {scenario.description}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold">Draft Details</h2>
              <div className="mt-4 space-y-4">
                <TextField
                  label="Audience"
                  onChange={(audience) => setAnswers((current) => ({ ...current, audience }))}
                  value={answers.audience}
                />
                <TextField
                  label="Offer Name"
                  onChange={(offer) => setAnswers((current) => ({ ...current, offer }))}
                  value={answers.offer}
                />
                <TextField
                  label="Primary Action"
                  onChange={(primaryAction) =>
                    setAnswers((current) => ({ ...current, primaryAction }))
                  }
                  value={answers.primaryAction}
                />
                <SelectField
                  label="Tone"
                  onChange={(tone) => setAnswers((current) => ({ ...current, tone: tone as ToneToken }))}
                  options={toneOptions}
                  value={answers.tone}
                />
              </div>
            </section>
          </aside>

          <section className="flex min-h-0 flex-col rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-5">
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">Draft Brief</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight">
                {answers.offer} for {answers.audience}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                The generated draft will use editable sections for message, proof, pricing, FAQ, and a final call to action.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <BriefItem label="Scenario" value={scenarioLabel(answers.scenario)} />
              <BriefItem label="Primary Action" value={answers.primaryAction} />
              <BriefItem label="Tone" value={toneLabel(answers.tone)} />
              <BriefItem label="Output" value="Landing page DSL" />
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-200 p-5">
              <span className="text-sm text-slate-500">{status}</span>
              <Button disabled={isGenerating} onClick={generateDraft} variant="primary">
                {isGenerating ? "Generating" : "Generate Draft"}
              </Button>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `start-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500" htmlFor={id}>
        {label}
      </label>
      <input
        className="mt-1 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </div>
  );
}

function SelectField({
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
  const id = `start-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500" htmlFor={id}>
        {label}
      </label>
      <select
        className="mt-1 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"
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

function BriefItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold">{value}</p>
    </div>
  );
}

function scenarioLabel(scenario: WizardAnswers["scenario"]) {
  return scenarioOptions.find((option) => option.id === scenario)?.label ?? "Landing Page";
}

function toneLabel(tone: ToneToken) {
  return toneOptions.find(([value]) => value === tone)?.[1] ?? "Business";
}
