import type { ReactNode } from "react";

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-400">
        {icon}
      </div>
      <p className="text-[15px] font-semibold text-ink-900">{title}</p>
      <p className="mt-1 max-w-sm text-[13px] text-ink-500">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
