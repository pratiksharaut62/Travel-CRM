import { useState } from "react";
import { UploadIcon } from "../../components/icons";

const palette = ["#F87C56", "#2563EB", "#16A34A", "#7C3AED", "#D97706", "#0EA5E9"];

export default function Branding() {
  const [color, setColor] = useState(palette[0]);

  return (
    <div className="max-w-2xl space-y-4">
      <div className="card p-5">
        <p className="mb-3 text-[13.5px] font-semibold text-ink-900">Logo</p>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink-200 py-10 text-center">
          <UploadIcon className="h-6 w-6 text-ink-400" />
          <p className="text-[12.5px] text-ink-500">Drag & drop, or click to upload your logo</p>
          <button className="btn-secondary mt-1">Upload Logo</button>
        </div>
      </div>

      <div className="card p-5">
        <p className="mb-3 text-[13.5px] font-semibold text-ink-900">Brand Color</p>
        <p className="mb-3 text-[12px] text-ink-500">Used on quotes, invoices, and the customer-facing portal.</p>
        <div className="flex flex-wrap gap-2.5">
          {palette.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="flex h-9 w-9 items-center justify-center rounded-full ring-offset-2"
              style={{ backgroundColor: c, boxShadow: color === c ? `0 0 0 2px ${c}` : undefined }}
              aria-label={c}
            />
          ))}
        </div>
      </div>

      <div className="card p-5">
        <p className="mb-3 text-[13.5px] font-semibold text-ink-900">Quote Preview</p>
        <div className="overflow-hidden rounded-lg border border-ink-100">
          <div className="px-4 py-3 text-[13px] font-semibold text-white" style={{ backgroundColor: color }}>
            Travel Agency
          </div>
          <div className="space-y-2 p-4">
            <div className="h-2.5 w-2/3 rounded bg-ink-100" />
            <div className="h-2.5 w-1/2 rounded bg-ink-100" />
            <div className="h-2.5 w-3/4 rounded bg-ink-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
