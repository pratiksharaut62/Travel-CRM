const integrations = [
  { name: "Google Sheets", desc: "Sync leads and bookings to a spreadsheet" },
  { name: "WhatsApp Business", desc: "Send quotes and reminders over WhatsApp" },
  { name: "Razorpay", desc: "Accept online payments on invoices" },
  { name: "Zapier", desc: "Connect MoonTrip to 5,000+ other apps" },
];

export default function Connections() {
  return (
    <div className="grid max-w-2xl grid-cols-1 gap-3">
      {integrations.map((i) => (
        <div key={i.name} className="card flex items-center justify-between p-4">
          <div>
            <p className="text-[13.5px] font-medium text-ink-900">{i.name}</p>
            <p className="text-[12px] text-ink-500">{i.desc}</p>
          </div>
          <button className="btn-secondary">Connect</button>
        </div>
      ))}
    </div>
  );
}
