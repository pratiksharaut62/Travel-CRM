import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import UserChip from "../components/UserChip";
import EmptyState from "../components/EmptyState";
import { useData } from "../context/DataContext";
import { PlusIcon, RefreshIcon, SearchIcon, RouteIcon } from "../components/icons";

const tabs = ["All", "Customer trips", "Samples"];

export default function Itinerary() {
  const navigate = useNavigate();
  const { getRecords } = useData();
  const itineraries = getRecords("itineraries");
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Itinerary"
          subtitle={`${itineraries.length} itineraries`}
          actions={
            <>
              <button className="btn-secondary">
                <RefreshIcon className="h-4 w-4" />
                Refresh
              </button>
              <button onClick={() => navigate("/quote-booking")} className="btn-primary">
                <PlusIcon className="h-4 w-4" />
                Create Itinerary
              </button>
            </>
          }
        />
        <UserChip />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative max-w-md flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            className="input pl-9"
            placeholder="Search by quote number, customer, or destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 rounded-lg border border-ink-200 bg-white p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                tab === t ? "bg-ink-900 text-white" : "text-ink-500 hover:bg-ink-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <EmptyState
          icon={<RouteIcon className="h-6 w-6" />}
          title="No itineraries yet"
          description="Itineraries appear here after you create a quote or build one from a quote."
          action={
            <button onClick={() => navigate("/quote-booking")} className="btn-primary">
              Create Quote
            </button>
          }
        />
      </div>
    </div>
  );
}
