import { useState } from "react";
import PageHeader from "../components/PageHeader";
import UserChip from "../components/UserChip";
import { useData } from "../context/DataContext";
import { UsersIcon, ClockIcon } from "../components/icons";

function StatBlock({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="card flex items-center justify-between p-4">
      <div>
        <p className="text-[12.5px] text-ink-500">{label}</p>
        <p className="mt-1 text-[22px] font-semibold text-ink-900">{value}</p>
        <p className="mt-0.5 text-[11px] text-ink-400">{sub}</p>
      </div>
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}1A`, color }}
      >
        <UsersIcon className="h-[18px] w-[18px]" />
      </div>
    </div>
  );
}

function ChartCard({ title, sub, empty }: { title: string; sub: string; empty: string }) {
  return (
    <div className="card p-4">
      <p className="text-[13.5px] font-semibold text-ink-900">{title}</p>
      <p className="mb-3 text-[12px] text-ink-500">{sub}</p>
      <div className="flex h-28 items-center justify-center text-[12.5px] text-ink-400">{empty}</div>
    </div>
  );
}

export default function LeadReports() {
  const { getRecords } = useData();
  const leads = getRecords("leads");
  const [tab, setTab] = useState<"funnel" | "performance">("funnel");

  return (
    <div>
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Lead Reports" subtitle="Where your leads come from & how good they are" />
        <UserChip />
      </div>

      <div className="mb-4 flex gap-1.5 rounded-lg border border-ink-200 bg-white p-1 w-fit">
        <button
          onClick={() => setTab("funnel")}
          className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium ${
            tab === "funnel" ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-100"
          }`}
        >
          Funnel &amp; Quality
        </button>
        <button
          onClick={() => setTab("performance")}
          className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium ${
            tab === "performance" ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-100"
          }`}
        >
          Lead Performance
        </button>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatBlock label="Total Leads" value={String(leads.length)} sub="All leads captured" color="#2563EB" />
        <StatBlock
          label="Hot Leads"
          value={String(leads.filter((l) => l.temperature === "Hot").length)}
          sub="Hot + Very Hot by AI"
          color="#DC2626"
        />
        <StatBlock
          label="Converted Leads"
          value={String(leads.filter((l) => l.status === "Converted").length)}
          sub="Became customers"
          color="#16A34A"
        />
        <StatBlock label="Conversion %" value="0%" sub="Lead \u2192 customer rate" color="#7C3AED" />
      </div>

      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-[12.5px] text-amber-800">
        No leads scored yet — new leads score automatically for older ones, tap <b>Score old leads</b> on the Leads
        page.
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ChartCard title="Lead quality" sub="Leads generated vs. converted per AI band, with each band's win-rate" empty="No scored leads" />
        <ChartCard title="Score distribution" sub="How your leads spread across AI score bands (0\u2013100)" empty="No score distribution" />
        <ChartCard title="Budget-fit vs conversion" sub="Do leads whose budget fits their trip convert better?" empty="No budget-fit data" />
        <ChartCard title="Most requested destinations" sub="Ranked by how many leads asked for each place" empty="No lead destinations yet" />
      </div>

      <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide text-ink-400">
        <ClockIcon className="h-3.5 w-3.5" /> Sources &amp; Campaigns
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ChartCard title="By source" sub="" empty="No data" />
        <ChartCard title="By UTM source" sub="" empty="No data" />
        <ChartCard title="By UTM campaign" sub="" empty="No data" />
      </div>

      <div className="card p-4">
        <p className="text-[13.5px] font-semibold text-ink-900">Sales output by team member</p>
        <p className="mb-3 text-[12px] text-ink-500">
          Quotes &amp; bookings each team member created — revenue, profit and speed to book.
        </p>
        <div className="flex h-24 items-center justify-center text-[12.5px] text-ink-400">
          No team-member activity in this range
        </div>
      </div>
    </div>
  );
}
