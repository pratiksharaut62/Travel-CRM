import PageHeader from "../../components/PageHeader";
import UserChip from "../../components/UserChip";
import { BarChartIcon, DownloadIcon, BookIcon, WalletIcon, ReceiptIcon, BankIcon } from "../../components/icons";

const reports = [
  { name: "Profit & Loss", icon: BarChartIcon, desc: "Income vs. expenses over a period" },
  { name: "Balance Sheet", icon: BookIcon, desc: "Assets, liabilities and equity snapshot" },
  { name: "Cash Flow", icon: WalletIcon, desc: "Cash in vs. cash out by account" },
  { name: "Receivables Aging", icon: ReceiptIcon, desc: "Outstanding customer invoices by age" },
  { name: "Payables Aging", icon: BankIcon, desc: "Outstanding vendor bills by age" },
  { name: "GST Summary", icon: BarChartIcon, desc: "Tax collected and paid, by period" },
];

export default function Reports() {
  return (
    <div>
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Reports" subtitle="Financial reports across your business" />
        <UserChip />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <button key={r.name} className="card flex items-start gap-3 p-4 text-left hover:border-brand-200">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <r.icon className="h-[18px] w-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold text-ink-900">{r.name}</p>
              <p className="mt-0.5 text-[12px] text-ink-500">{r.desc}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium text-brand-600">
                <DownloadIcon className="h-3.5 w-3.5" /> Export
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
