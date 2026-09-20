import PageHeader from "../../components/PageHeader";
import UserChip from "../../components/UserChip";
import EmptyState from "../../components/EmptyState";
import { CardIcon } from "../../components/icons";

export default function HiddenMarkup() {
  return (
    <div>
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Hidden Markup" subtitle="Your competitive edge \u2014 dual invoicing & GST compliance" />
        <UserChip />
      </div>

      <div className="card mb-5 p-4">
        <p className="text-[13.5px] font-semibold text-ink-900">How hidden markup works</p>
        <p className="mt-1 max-w-2xl text-[12.5px] leading-relaxed text-ink-500">
          When you add a margin on top of a vendor's net rate, MoonTrip keeps two GST-compliant invoices in
          sync automatically: one to your customer at the marked-up price, and one from your vendor at the
          net price. The difference accumulates here as your real, trackable profit.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Accumulated Markup", value: "\u20b90" },
          { label: "Pending Roll-over", value: "\u20b90" },
          { label: "Realized This Month", value: "\u20b90" },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-[12.5px] text-ink-500">{s.label}</p>
            <p className="mt-1 text-[20px] font-semibold text-ink-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <EmptyState
          icon={<CardIcon className="h-6 w-6" />}
          title="No markup entries yet"
          description="Markup recorded from your quotes and vendor bills will appear here, tied to each trip."
        />
      </div>
    </div>
  );
}
