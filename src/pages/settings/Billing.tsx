import { CardIcon, DownloadIcon } from "../../components/icons";

export default function Billing() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-ink-500">Current Plan</p>
            <p className="mt-0.5 text-[18px] font-semibold text-ink-900">Free Plan</p>
          </div>
          <button className="btn-primary">Upgrade Plan</button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "Quotes this month", value: "0 / 10" },
            { label: "Team members", value: "1 / 1" },
            { label: "Ask Anything queries", value: "0 / 20" },
          ].map((u) => (
            <div key={u.label} className="rounded-lg bg-ink-100/60 p-3">
              <p className="text-[11.5px] text-ink-500">{u.label}</p>
              <p className="text-[14px] font-semibold text-ink-900">{u.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <p className="mb-1 text-[13.5px] font-semibold text-ink-900">Payment Method</p>
        <div className="flex items-center justify-between rounded-lg border border-dashed border-ink-200 p-4">
          <div className="flex items-center gap-2.5 text-ink-500">
            <CardIcon className="h-5 w-5" />
            <span className="text-[13px]">No payment method on file</span>
          </div>
          <button className="btn-secondary">Add Card</button>
        </div>
      </div>

      <div className="card p-5">
        <p className="mb-3 text-[13.5px] font-semibold text-ink-900">Invoice History</p>
        <div className="flex items-center justify-between rounded-lg bg-ink-100/50 px-4 py-6 text-center">
          <p className="w-full text-[12.5px] text-ink-500">No invoices yet</p>
        </div>
        <button className="mt-3 flex items-center gap-1.5 text-[12.5px] font-medium text-brand-600 hover:underline">
          <DownloadIcon className="h-3.5 w-3.5" /> Export billing history
        </button>
      </div>
    </div>
  );
}
