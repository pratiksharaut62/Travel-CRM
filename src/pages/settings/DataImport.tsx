import { useState } from "react";
import { UploadIcon, FileTextIcon } from "../../components/icons";

type ImportRow = { id: string; name: string; type: string; status: string };

export default function DataImport() {
  const [imports] = useState<ImportRow[]>([]);

  return (
    <div className="max-w-2xl space-y-4">
      <div className="card p-6">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink-200 py-10 text-center">
          <UploadIcon className="h-6 w-6 text-ink-400" />
          <p className="text-[13px] font-medium text-ink-700">Drag & drop a CSV or Excel file</p>
          <p className="text-[12px] text-ink-500">Import leads, customers, bookings, or vendors in bulk.</p>
          <button className="btn-primary mt-2">Choose File</button>
        </div>
      </div>

      <div className="card">
        <div className="border-b border-ink-100 px-5 py-3.5">
          <p className="text-[13.5px] font-semibold text-ink-900">Recent Imports</p>
        </div>
        {imports.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <FileTextIcon className="h-6 w-6 text-ink-400" />
            <p className="text-[12.5px] text-ink-500">No imports yet</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
