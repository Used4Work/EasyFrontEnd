"use client";

import type { QualityScore } from "@/lib/quality/rules";

type Props = {
  score: QualityScore;
};

export function QualityPanel({ score }: Props) {
  return (
    <section className="border-t border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-950">Quality Score</h2>
          <p className="text-xs text-slate-500">Deterministic checks from the DSL.</p>
        </div>
        <div className="text-3xl font-bold text-slate-950">{score.overall}</div>
      </div>
      <div className="mt-4 space-y-3">
        {score.dimensions.map((dimension) => (
          <div key={dimension.name}>
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span>{dimension.name}</span>
              <span>{dimension.score}</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${dimension.score}%` }}
              />
            </div>
            {dimension.issues.length > 0 ? (
              <p className="mt-1 text-xs leading-5 text-amber-700">{dimension.issues[0]}</p>
            ) : null}
          </div>
        ))}
      </div>
      {score.suggestions.length > 0 ? (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
          {score.suggestions[0].message}
        </div>
      ) : null}
    </section>
  );
}
