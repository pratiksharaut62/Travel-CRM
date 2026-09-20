import { useState } from "react";

export default function Profile() {
  const [fullName, setFullName] = useState("Pratiksha Raut");
  const [phone, setPhone] = useState("99603 57199");

  return (
    <div className="card max-w-2xl p-5">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500 text-lg font-semibold text-white">
          PR
        </div>
        <div>
          <p className="text-[15px] font-semibold text-ink-900">{fullName}</p>
          <p className="text-[12.5px] text-ink-500">ms.pratiksha.raut0@gmail.com</p>
          <div className="mt-1.5 flex gap-1.5">
            <span className="rounded bg-ink-100 px-2 py-0.5 text-[10.5px] font-medium text-ink-600">
              Account authority: Owner
            </span>
            <span className="rounded bg-brand-50 px-2 py-0.5 text-[10.5px] font-medium text-brand-600">
              Access preset: Administrator
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Full Name</label>
          <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label className="label">
            Login Email <span className="ml-1 text-[11px] font-medium text-brand-600">Change</span>
          </label>
          <input className="input" value="ms.pratiksha.raut0@gmail.com" disabled />
        </div>
      </div>

      <div className="mt-4">
        <label className="label">Phone</label>
        <div className="flex gap-2">
          <select className="input w-24">
            <option>+91</option>
          </select>
          <input className="input flex-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="mt-5 border-t border-ink-100 pt-4">
        <p className="mb-3 text-[13px] font-medium text-ink-900">Change Password</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Current Password</label>
            <input className="input" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input className="input" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
}
