import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import UserChip from "../components/UserChip";
import FormModal from "../components/FormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useData } from "../context/DataContext";
import { moduleConfigs } from "../data/moduleConfigs";
import {
  SearchIcon,
  UploadIcon,
  HelpIcon,
  RefreshIcon,
  DownloadIcon,
  FileTextIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  CalendarIcon,
} from "../components/icons";

const filters = ["All", "Vendor pending", "Confirmed", "Cancelled"];
const config = moduleConfigs.bookings;

export default function Bookings() {
  const navigate = useNavigate();
  const { getRecords, updateRecord, deleteRecord } = useData();
  const bookings = getRecords("bookings");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<null | (typeof bookings)[number]>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        !search || Object.values(b).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));
      const matchesFilter = filter === "All" || b.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  return (
    <div>
      <div className="mb-1 flex items-start justify-between">
        <PageHeader
          title="Bookings"
          subtitle={`${bookings.length} total bookings`}
          actions={
            <>
              <button className="btn-secondary">
                <UploadIcon className="h-4 w-4" />
                Import
              </button>
              <button className="btn-secondary !border-brand-200 !text-brand-600">
                <HelpIcon className="h-4 w-4" />
                Guide <span className="text-ink-400">~2 min</span>
              </button>
            </>
          }
        />
        <UserChip />
      </div>

      <div className="mb-4 relative">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          className="input pl-9"
          placeholder="Search by booking number or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                filter === f ? "bg-brand-gradient text-white" : "border border-ink-200 bg-white text-ink-500 hover:bg-ink-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary !px-2.5">
            <RefreshIcon className="h-4 w-4" />
          </button>
          <button className="btn-secondary">
            <DownloadIcon className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <p className="text-[15px] font-semibold text-ink-900">
              {bookings.length === 0 ? "No bookings yet" : "No matches found"}
            </p>
            <p className="mt-1 max-w-sm text-[13px] text-ink-500">
              {bookings.length === 0
                ? "Bookings are created when you approve a quote and convert it to a booking. Here's how it works:"
                : "Try a different search term or filter."}
            </p>

            {bookings.length === 0 && (
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileTextIcon className="h-5 w-5" />
                  </span>
                  <p className="text-[12.5px] font-medium text-ink-900">Create a Quote</p>
                  <p className="text-[11px] text-ink-400">Build an itinerary & price</p>
                </div>
                <span className="hidden text-ink-300 sm:block">→</span>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <CheckCircleIcon className="h-5 w-5" />
                  </span>
                  <p className="text-[12.5px] font-medium text-ink-900">Approve Quote</p>
                  <p className="text-[11px] text-ink-400">Mark the quote as approved</p>
                </div>
                <span className="hidden text-ink-300 sm:block">→</span>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <CalendarIcon className="h-5 w-5" />
                  </span>
                  <p className="text-[12.5px] font-medium text-ink-900">Convert to Booking</p>
                  <p className="text-[11px] text-ink-400">Turn it into a confirmed booking</p>
                </div>
              </div>
            )}

            {bookings.length === 0 && (
              <button onClick={() => navigate("/quote-booking")} className="btn-primary mt-6">
                Go to Quotes →
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink-100 bg-ink-100/50">
                  {config.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 font-medium text-ink-500">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium text-ink-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-100/40">
                    {config.columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-ink-700">
                        {row[col.key] ?? "—"}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setEditing(row)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                          aria-label="Edit"
                        >
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(row.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-ink-400 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FormModal
        open={!!editing}
        onClose={() => setEditing(null)}
        onSubmit={(values) => {
          if (editing) updateRecord("bookings", editing.id, values);
          setEditing(null);
        }}
        title="Edit Bookings"
        fields={config.fields}
        initial={editing}
      />
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteRecord("bookings", deleteId);
        }}
        description="This will permanently remove this booking record."
      />
    </div>
  );
}
