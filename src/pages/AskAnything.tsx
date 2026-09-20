import { useState } from "react";
import UserChip from "../components/UserChip";
import { PlusIcon, SearchIcon } from "../components/icons";

const areas = ["All areas", "Receivables", "Payables", "Bookings & Trips", "Hotels", "Vendors", "Margins & Hidden Markup", "GST & Tax", "Customers", "Entity Ledger"];

const queries = [
  { title: "10 cheapest trips (time window)", desc: "Which were my cheapest trips (time_window)?", tag: "BOOKINGS & TRIPS" },
  { title: "Average booking value (time_window)", desc: "What's my average booking value (time_window)?", tag: "BOOKINGS & TRIPS + CUSTOMERS" },
  { title: "Average trip duration (days)", desc: "How long is my average trip?", tag: "BOOKINGS & TRIPS" },
  { title: "Booking funnel (confirmed \u2192 travelling \u2192 completed \u2192 cancelled)", desc: "Show me the booking funnel by status", tag: "BOOKINGS & TRIPS" },
  { title: "Bookings by status", desc: "How many bookings do I have, broken down by status?", tag: "BOOKINGS & TRIPS" },
  { title: "Bookings missing travel dates", desc: "Which bookings have no travel start or end dates?", tag: "BOOKINGS & TRIPS" },
  { title: "Cancellation rate (time_window)", desc: "What's my cancellation rate?", tag: "BOOKINGS & TRIPS" },
  { title: "Monthly booking volume (last 12 months)", desc: "Show me my booking trend over the last 12 months", tag: "BOOKINGS & TRIPS" },
];

export default function AskAnything() {
  const [area, setArea] = useState("All areas");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const filtered = queries.filter((q) => q.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-5 lg:h-[calc(100vh-3rem)] lg:flex-row">
      <aside className="w-full shrink-0 lg:w-64">
        <div className="card mb-3 p-3">
          <p className="text-[13px] font-semibold text-ink-900">Ask Anything</p>
          <p className="text-[11px] text-ink-500">Pro · live tenant data</p>
          <button className="btn-primary mt-3 w-full !justify-center">
            <PlusIcon className="h-4 w-4" />
            New conversation
          </button>
        </div>
        <div className="card mb-3 p-3">
          <div className="flex items-center justify-between text-[12px] text-ink-500">
            <span>Ask questions</span>
            <span className="font-medium text-ink-700">0 / 20 / month</span>
          </div>
        </div>
        <div className="mb-2 flex gap-1.5 rounded-lg border border-ink-200 bg-white p-1">
          <button className="flex-1 rounded-md bg-ink-900 px-2 py-1.5 text-[12px] font-medium text-white">
            Specific
          </button>
          <button className="flex-1 rounded-md px-2 py-1.5 text-[12px] font-medium text-ink-500">Chats</button>
        </div>
        <div>
          <p className="mb-1 text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">Recent</p>
          <p className="text-[12px] text-ink-400">Your asked questions will appear here.</p>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto">
        <div className="mb-4 flex items-start justify-between">
          <div />
          <UserChip />
        </div>
        <div className="mb-6 text-center">
          <h1 className="text-[24px] font-semibold text-ink-900">Ask anything about your business.</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            Bookings, customers, vendors, hotels, margins, GST — answered live from your tenant data.
          </p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-1.5">
          {areas.map((a) => (
            <button
              key={a}
              onClick={() => setArea(a)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${
                area === a ? "bg-ink-900 text-white" : "border border-ink-200 bg-white text-ink-600 hover:bg-ink-100"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <p className="text-[12.5px] font-semibold text-ink-700">Pre-made queries</p>
          <div className="relative w-64">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
            <input
              className="input py-1.5 pl-8 text-[12.5px]"
              placeholder="Search all templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-24 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((q) => (
            <button
              key={q.title}
              onClick={() => setQuery(q.desc)}
              className="card p-3.5 text-left hover:border-brand-200"
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[13px] font-medium text-ink-900">{q.title}</p>
              </div>
              <p className="text-[12px] text-ink-500">{q.desc}</p>
              <span className="mt-2 inline-block rounded bg-ink-100 px-1.5 py-0.5 text-[9.5px] font-semibold text-ink-500">
                {q.tag}
              </span>
            </button>
          ))}
        </div>

        <div className="sticky bottom-0 mx-auto flex max-w-xl items-center gap-2 rounded-full border border-ink-200 bg-white px-2 py-1.5 shadow-pop">
          <span className="whitespace-nowrap rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
            AUTO-ROUTE
          </span>
          <input
            className="flex-1 border-0 bg-transparent text-[13px] outline-none placeholder:text-ink-400"
            placeholder="Type your question \u2014 I'll figure out which area it belongs to."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-white hover:opacity-90">
            &uarr;
          </button>
        </div>
      </div>
    </div>
  );
}
