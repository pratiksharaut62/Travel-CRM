const rows = [
  { doc: "Quote", prefix: "QT-", nextNumber: "0001" },
  { doc: "Booking", prefix: "BK-", nextNumber: "0001" },
  { doc: "Sales Invoice", prefix: "INV-", nextNumber: "0001" },
  { doc: "Receipt", prefix: "RCT-", nextNumber: "0001" },
  { doc: "Vendor Bill", prefix: "BILL-", nextNumber: "0001" },
];

export default function Nomenclature() {
  return (
    <div className="card max-w-2xl overflow-hidden">
      <div className="border-b border-ink-100 px-5 py-3.5">
        <p className="text-[14px] font-semibold text-ink-900">Document Numbering</p>
        <p className="text-[12px] text-ink-500">Set the prefix and next number for each document type.</p>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="bg-ink-100/50 text-ink-500">
            <th className="px-5 py-2.5 font-medium">Document</th>
            <th className="px-5 py-2.5 font-medium">Prefix</th>
            <th className="px-5 py-2.5 font-medium">Next Number</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.doc} className="border-t border-ink-100">
              <td className="px-5 py-2.5 text-ink-700">{r.doc}</td>
              <td className="px-5 py-2.5">
                <input className="input w-24 py-1.5" defaultValue={r.prefix} />
              </td>
              <td className="px-5 py-2.5">
                <input className="input w-24 py-1.5" defaultValue={r.nextNumber} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="flex justify-end px-5 py-4">
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}
