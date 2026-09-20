import UserChip from "../components/UserChip";
import { PlayIcon, ClockIcon } from "../components/icons";

type DemoItem = { title: string; desc: string; time: string; steps: number };
type DemoGroup = { group: string; tag?: string; desc: string; items: DemoItem[] };

const groups: DemoGroup[] = [
  {
    group: "AI Import & Create",
    tag: "5x PRODUCTIVITY",
    desc: "AI reads any file and builds quotes + itineraries in seconds \u2014 not minutes",
    items: [{ title: "Create Quote \u2014 full walkthrough", desc: "First quote walkthrough: paste or import a supplier quote, review line changes, check trip and customer, review services, price, save, and share.", time: "~4 min", steps: 16 }],
  },
  {
    group: "Hidden Markup",
    tag: "KEY FEATURES",
    desc: "Your competitive edge \u2014 dual invoicing & GST compliance",
    items: [
      { title: "Hidden Markup: Dual Invoice", desc: "Learn how your real margin stays hidden with GST-compliant dual invoicing. See both invoices created and how compliance is fully managed.", time: "~6 min", steps: 13 },
      { title: "Hidden Markup: Roll-over & Adjust", desc: "See where your accumulated markup goes as dashboard updates, pending payments reduce, and ledgers update automatically. Full end-to-end flow.", time: "~6 min", steps: 12 },
    ],
  },
  {
    group: "Payments & Profit",
    desc: "Track collections, advances, and real per-trip margins",
    items: [
      { title: "Pending Payments", desc: "Track what's owed, record batch payments, manage customer advances. Generate PDF customer ledgers to share.", time: "~3 min", steps: 4 },
      { title: "Real Profit Tracking", desc: "Per-trip P&L waterfall \u2014 estimated vs. actual, and processing charge vs. hidden markup breakdown.", time: "~3 min", steps: 4 },
    ],
  },
  {
    group: "Operations",
    desc: "Live trips, client history, and cancellation workflows",
    items: [
      { title: "Live Trips", desc: "See today's active trips and upcoming departures at a glance.", time: "~2 min", steps: 3 },
      { title: "Client Ledger", desc: "Full debit/credit history per customer \u2014 ties directly to pending payments and advances. Download PDF to share with customers.", time: "~3 min", steps: 4 },
      { title: "Cancellation Flow", desc: "Cancel a booking step-by-step: credit note, refund options, and accounting impact.", time: "~3 min", steps: 15 },
    ],
  },
];

export default function InteractiveDemo() {
  return (
    <div>
      <div className="mb-5 flex items-start justify-between rounded-xl2 bg-sidebar p-5 text-white">
        <div>
          <h1 className="text-[19px] font-semibold">Interactive Demo</h1>
          <p className="mt-1 text-[13px] text-sidebar-text">
            Walk through each feature step-by-step on the real interface.
          </p>
        </div>
        <div className="text-right">
          <div className="mb-1.5 text-[12px] text-sidebar-text">0/17 completed · 0%</div>
          <div className="mb-3 h-1.5 w-40 rounded-full bg-sidebar-border">
            <div className="h-1.5 w-0 rounded-full bg-brand-500" />
          </div>
          <button className="btn-primary !py-2">
            <PlayIcon className="h-4 w-4" />
            Start Full Tour
          </button>
        </div>
      </div>
      <div className="mb-2 flex justify-end">
        <UserChip />
      </div>

      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.group}>
            <div className="mb-2 flex items-center gap-2">
              <p className="text-[14px] font-semibold text-ink-900">{g.group}</p>
              {g.tag && <span className="badge-beta">{g.tag}</span>}
            </div>
            <p className="mb-2.5 -mt-1.5 text-[12px] text-ink-500">{g.desc}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {g.items.map((item) => (
                <div key={item.title} className="card flex items-start justify-between p-4">
                  <div className="pr-3">
                    <p className="text-[13.5px] font-medium text-ink-900">{item.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-ink-500">{item.desc}</p>
                    <p className="mt-2 flex items-center gap-1 text-[11px] text-ink-400">
                      <ClockIcon className="h-3 w-3" /> {item.time} · {item.steps} steps
                    </p>
                  </div>
                  <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-500 hover:bg-brand-50 hover:text-brand-600">
                    <PlayIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[11.5px] text-ink-400">
        You can restart any module anytime. Progress is saved in your browser.
      </p>
    </div>
  );
}
