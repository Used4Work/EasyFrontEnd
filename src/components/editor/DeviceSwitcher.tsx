"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export type DeviceMode = "desktop" | "mobile";

type Props = {
  value: DeviceMode;
  onChange: (value: DeviceMode) => void;
};

export function DeviceSwitcher({ value, onChange }: Props) {
  return (
    <div className="inline-grid grid-cols-2 rounded-md border border-slate-200 bg-white p-1">
      {(["desktop", "mobile"] as const).map((mode) => (
        <Button
          aria-pressed={value === mode}
          className={cn(
            "border-0",
            value === mode ? "bg-slate-900 text-white hover:bg-slate-900" : "bg-transparent",
          )}
          key={mode}
          onClick={() => onChange(mode)}
          size="sm"
          variant="ghost"
        >
          {mode === "desktop" ? "桌面" : "手机"}
        </Button>
      ))}
    </div>
  );
}
