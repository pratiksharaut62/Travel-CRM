export default function Company() {
  return (
    <div className="card max-w-2xl p-5">
      <p className="mb-4 text-[14px] font-semibold text-ink-900">Company Details</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Company Name</label>
          <input className="input" defaultValue="Travel Agency" />
        </div>
        <div>
          <label className="label">GSTIN</label>
          <input className="input" placeholder="22AAAAA0000A1Z5" />
        </div>
        <div className="col-span-2">
          <label className="label">Registered Address</label>
          <textarea className="input min-h-[70px] resize-none" placeholder="Company address" />
        </div>
        <div>
          <label className="label">Support Email</label>
          <input className="input" placeholder="support@company.com" />
        </div>
        <div>
          <label className="label">Support Phone</label>
          <input className="input" placeholder="+91 00000 00000" />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}
