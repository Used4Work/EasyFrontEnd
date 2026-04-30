"use client";

import { RenderPage } from "@/components/rendered/RenderPage";
import { Button } from "@/components/ui/Button";
import type { EasyFrontendProject } from "@/lib/dsl/types";
import { cn } from "@/lib/utils/cn";
import { DeviceSwitcher, type DeviceMode } from "./DeviceSwitcher";

type Props = {
  project: EasyFrontendProject;
  device: DeviceMode;
  open: boolean;
  onClose: () => void;
  onDeviceChange: (device: DeviceMode) => void;
};

export function PreviewPanel({ project, device, open, onClose, onDeviceChange }: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/45 p-5">
      <div className="mx-auto flex h-full max-w-7xl flex-col rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div>
            <h2 className="text-base font-semibold text-slate-950">页面预览</h2>
            <p className="text-sm text-slate-500">当前预览来自同一份页面 DSL。</p>
          </div>
          <div className="flex items-center gap-2">
            <DeviceSwitcher onChange={onDeviceChange} value={device} />
            <Button onClick={onClose} variant="ghost">
              关闭
            </Button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 justify-center overflow-auto bg-slate-100 p-5">
          <div
            className={cn(
              "min-h-full overflow-hidden border border-slate-200 bg-white shadow-sm",
              device === "desktop" ? "w-full max-w-6xl" : "w-[390px] max-w-full",
            )}
          >
            <RenderPage project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
