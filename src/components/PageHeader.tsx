import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "./icons";

export default function PageHeader({
  title,
  subtitle,
  showBack = true,
  actions,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  actions?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <div className="mb-5 flex flex-1 flex-col gap-3 min-[860px]:flex-row min-[860px]:items-start min-[860px]:justify-between min-[860px]:gap-4">
      <div className="flex items-start gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 hover:bg-ink-100"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-[17px] font-semibold text-ink-900 sm:text-[19px]">{title}</h1>
          {subtitle && <p className="mt-0.5 text-[12.5px] text-ink-500 sm:text-[13px]">{subtitle}</p>}
        </div>
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 min-[860px]:shrink-0 min-[860px]:flex-nowrap">
          {actions}
        </div>
      )}
    </div>
  );
}
