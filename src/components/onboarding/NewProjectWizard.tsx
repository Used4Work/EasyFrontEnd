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
  ["business", "商务稳重"],
  ["modern_saas", "现代 SaaS"],
  ["education", "教育亲和"],
  ["playful", "轻松活泼"],
  ["premium", "高端专业"],
];

export function NewProjectWizard() {
  const router = useRouter();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [answers, setAnswers] = useState<WizardAnswers>(getDefaultWizardAnswers());
  const [status, setStatus] = useState("准备好生成页面草稿");
  const [isGenerating, setIsGenerating] = useState(false);

  const selectScenario = (scenario: ScenarioOption) => {
    setAnswers(getDefaultWizardAnswers(scenario.id));
  };

  const generateDraft = async () => {
    setIsGenerating(true);
    setStatus("正在生成页面草稿...");

    const project = await mockAiAdapter.generateLandingPageDraft(answers);
    const result = saveProjectToStorage(window.localStorage, project);

    if (!result.ok) {
      setStatus(`保存失败：${result.reason}`);
      setIsGenerating(false);
      return;
    }

    setStatus("草稿已生成，正在进入可视化编辑器...");
    router.push("/");
  };

  const restoreProject = async (file: File) => {
    const result = parseProjectFileJson(await file.text());

    if (!result.ok) {
      setStatus(`恢复失败：${result.reason}`);
      return;
    }

    const saveResult = saveProjectToStorage(window.localStorage, result.project);

    if (!saveResult.ok) {
      setStatus(`保存失败：${saveResult.reason}`);
      return;
    }

    setStatus("项目已恢复，正在进入可视化编辑器...");
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5">
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">EasyFrontEnd</p>
            <h1 className="mt-1 text-xl font-semibold">AI 辅助生成页面初稿</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => importInputRef.current?.click()} variant="secondary">
              恢复备份
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
              <h2 className="text-sm font-semibold">选择页面场景</h2>
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
              <h2 className="text-sm font-semibold">填写草稿信息</h2>
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
              <p className="text-xs font-semibold uppercase tracking-normal text-slate-500">页面草稿摘要</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight">
                为「{answers.audience}」设计「{answers.offer}」
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                这里用于快速生成起点。真正的主界面是可视化编辑器，你可以继续拖拽、点选和修改模块。
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <BriefItem label="页面场景" value={scenarioLabel(answers.scenario)} />
              <BriefItem label="主要行动" value={answers.primaryAction} />
              <BriefItem label="整体语气" value={toneLabel(answers.tone)} />
              <BriefItem label="生成结果" value="可视化编辑页面" />
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-200 p-5">
              <span className="text-sm text-slate-500">{status}</span>
              <Button disabled={isGenerating} onClick={generateDraft} variant="primary">
                {isGenerating ? "正在生成" : "生成页面草稿"}
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
  const labelText = fieldLabel(label);

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500" htmlFor={id}>
        {labelText}
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
  const labelText = fieldLabel(label);

  return (
    <div>
      <label className="text-xs font-semibold text-slate-500" htmlFor={id}>
        {labelText}
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
  return scenarioOptions.find((option) => option.id === scenario)?.label ?? "落地页";
}

function toneLabel(tone: ToneToken) {
  return toneOptions.find(([value]) => value === tone)?.[1] ?? "商务稳重";
}

function fieldLabel(label: string) {
  return (
    {
      Audience: "目标用户",
      "Offer Name": "产品 / 服务名称",
      "Primary Action": "希望访客做什么",
      Tone: "页面语气",
    }[label] ?? label
  );
}
