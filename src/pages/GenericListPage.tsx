import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import FormModal from "../components/FormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import UserChip from "../components/UserChip";
import { useData } from "../context/DataContext";
import type { ModuleConfig, Record as ModuleRecord } from "../types";
import { SearchIcon, PlusIcon, EditIcon, TrashIcon, RefreshIcon, DownloadIcon, InboxIcon } from "../components/icons";

export default function GenericListPage({ config }: { config: ModuleConfig }) {
  const { getRecords, addRecord, updateRecord, deleteRecord } = useData();
  const records = getRecords(config.key);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(config.statusFilters?.[0] ?? "All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ModuleRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        !search ||
        Object.values(r).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));
      const statusKey = config.columns.find((c) => c.key === "status")?.key ?? "status";
      const matchesStatus =
        !config.statusFilters || statusFilter === "All" || r[statusKey] === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter, config]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (record: ModuleRecord) => {
    setEditing(record);
    setFormOpen(true);
  };

  const handleSubmit = (values: Record<string, string | number>) => {
    if (editing) {
      updateRecord(config.key, editing.id, values);
    } else {
      addRecord(config.key, values);
    }
    setFormOpen(false);
  };

  return (
    <div>
      <div className="mb-1 flex items-start justify-between">
        <PageHeader
          title={config.title}
          subtitle={config.subtitle.replace(/^0/, String(records.length))}
          actions={
            <>
              <button className="btn-secondary">
                <RefreshIcon className="h-4 w-4" />
                Refresh
              </button>
              <button className="btn-secondary">
                <DownloadIcon className="h-4 w-4" />
                Export
              </button>
              <button onClick={openAdd} className="btn-primary">
                <PlusIcon className="h-4 w-4" />
                {config.addLabel}
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
            placeholder={config.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {config.statusFilters && (
          <div className="flex flex-wrap gap-1.5">
            {config.statusFilters.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  statusFilter === s
                    ? "bg-brand-gradient text-white"
                    : "border border-ink-200 bg-white text-ink-500 hover:bg-ink-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<InboxIcon className="h-6 w-6" />}
            title={records.length === 0 ? config.emptyTitle : "No matches found"}
            description={
              records.length === 0 ? config.emptyDesc : "Try a different search term or filter."
            }
            action={
              records.length === 0 && (
                <button onClick={openAdd} className="btn-primary">
                  <PlusIcon className="h-4 w-4" />
                  {config.addLabel}
                </button>
              )
            }
          />
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
                        {row[col.key] ?? "\u2014"}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => openEdit(row)}
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
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        title={editing ? `Edit ${config.title}` : config.addLabel}
        fields={config.fields}
        initial={editing}
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteRecord(config.key, deleteId);
        }}
        description={`This will permanently remove this ${config.title.toLowerCase()} record.`}
      />
    </div>
  );
}
