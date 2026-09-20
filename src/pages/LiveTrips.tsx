import { useState } from "react";
import PageHeader from "../components/PageHeader";
import UserChip from "../components/UserChip";
import EmptyState from "../components/EmptyState";
import { PlaneIcon } from "../components/icons";

const tabs = ["Live", "Upcoming", "Ending Soon", "Completed"];

export default function LiveTrips() {
  const [tab, setTab] = useState("Live");

  return (
    <div>
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader title="Live Trips" subtitle="See today's active departures at a glance" />
        <UserChip />
      </div>

      <div className="mb-4 flex gap-1.5 rounded-lg border border-ink-200 bg-white p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium ${
              tab === t ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="card">
        <EmptyState
          icon={<PlaneIcon className="h-6 w-6" />}
          title={`No ${tab.toLowerCase()} trips`}
          description="Confirmed bookings with travel dates in this window will show up here."
        />
      </div>
    </div>
  );
}
