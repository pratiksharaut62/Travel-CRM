import { PanelIcon } from "./icons";

export default function UserChip() {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <button
        className="hidden h-8 w-8 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 hover:bg-ink-100 sm:flex"
        aria-label="Toggle layout"
      >
        <PanelIcon className="h-4 w-4" />
      </button>
      <div className="hidden h-6 w-px bg-ink-200 sm:block" />
      <div className="flex items-center gap-2 rounded-lg px-1 py-1 sm:gap-2.5 sm:px-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
          PR
        </div>
        <div className="hidden leading-tight md:block">
          <div className="text-[13px] font-medium text-ink-900">Pratiksha Raut</div>
          <div className="text-[11px] text-ink-400">Free · Owner · Administrator</div>
        </div>
      </div>
    </div>
  );
}
