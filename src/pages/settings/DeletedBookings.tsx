import { TrashIcon } from "../../components/icons";

export default function DeletedBookings() {
  return (
    <div className="card">
      <div className="border-b border-ink-100 px-5 py-3.5">
        <p className="text-[13.5px] font-semibold text-ink-900">Deleted Bookings</p>
        <p className="text-[12px] text-ink-500">Bookings you've removed stay here for 30 days before permanent deletion.</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
        <TrashIcon className="h-6 w-6 text-ink-400" />
        <p className="text-[13px] font-medium text-ink-700">No deleted bookings</p>
        <p className="max-w-xs text-[12px] text-ink-500">Bookings you delete from the Bookings page will show up here.</p>
      </div>
    </div>
  );
}
