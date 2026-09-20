import { useState, type ReactNode, type ChangeEvent, type FormEvent, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import UserChip from "../components/UserChip";
import Modal from "../components/Modal";
import { useData } from "../context/DataContext";
import {
  FileTextIcon,
  CardIcon,
  CalendarIcon,
  WalletIcon,
  PlusIcon,
  UsersIcon,
  PlaneIcon,
  TrendingUpArrow,
  ChevronRightIcon,
  SparkleIcon,
  RouteIcon,
} from "../components/icons";

/* ---------- Info Tooltip Icon ---------- */
function InfoIcon() {
  return (
    <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-300 text-[9px] font-bold text-slate-400">
      i
    </span>
  );
}

/* ---------- Stat card ---------- */
function StatCard({
  label,
  value,
  sub,
  icon,
  bgLight,
  iconBg,
}: {
  label: string;
  value: string;
  sub: string;
  icon: ReactNode;
  bgLight: string;
  iconBg: string;
}) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border border-slate-100 ${bgLight}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-[26px] font-extrabold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${iconBg}`}>
          {icon}
        </div>
      </div>
      <p className="mt-2 flex items-center gap-1 text-[11.5px] font-medium text-emerald-600">
        <span className="text-[10px]">↑</span> {sub}
      </p>
    </div>
  );
}

function ChartPlaceholder({ label }: { label?: string }) {
  const dates = ["22 Aug", "29 Aug", "05 Sep", "12 Sep", "19 Sep"];
  return (
    <div className="relative h-52 w-full pt-2">
      <div className="absolute inset-0 flex flex-col justify-between pb-6 pt-1 text-[10px] font-medium text-slate-300">
        {[4, 3, 2, 1, 0].map((n) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-2 text-right">{n}</span>
            <span className="h-px flex-1 border-t border-dashed border-slate-100" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-5 right-0 flex justify-between text-[10px] font-medium text-slate-400">
        {dates.map((date) => (
          <span key={date}>{date}</span>
        ))}
      </div>
      {label && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
}

/* ---------- "What do you want to create?" chooser ---------- */
function ContinueLink() {
  return (
    <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-bold text-[#e05638]">
      Continue
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#e05638] text-[#e05638]">
        <ChevronRightIcon className="h-3 w-3" />
      </span>
    </span>
  );
}

function QuoteTypeModal({
  open,
  onClose,
  onChoose,
}: {
  open: boolean;
  onClose: () => void;
  onChoose: (type: "quote" | "quote-itinerary" | "itinerary") => void;
}) {
  const options: {
    key: "quote" | "quote-itinerary" | "itinerary";
    title: string;
    desc: string;
    icon: ReactNode;
  }[] = [
    {
      key: "quote",
      title: "Quote",
      desc: "Creates a quote only — no itinerary is made here. Full pricing, GST, margin and booking-ready flow.",
      icon: <FileTextIcon className="h-5 w-5 text-[#e05638]" />,
    },
    {
      key: "quote-itinerary",
      title: "Quote + Itinerary",
      desc: "Full quote plus the day-wise customer itinerary, built together in one flow.",
      icon: <SparkleIcon className="h-5 w-5 text-[#e05638]" />,
    },
    {
      key: "itinerary",
      title: "Itinerary",
      desc: "Just the day-wise plan — no pricing steps. Saves under Itinerary; turn it into a quote whenever you're ready.",
      icon: <RouteIcon className="h-5 w-5 text-[#e05638]" />,
    },
  ];

  return (
    <Modal open={open} onClose={onClose} title="What do you want to create?" width="max-w-4xl">
      <p className="-mt-3 mb-5 text-[12.5px] text-slate-500">
        Start with pricing, or build the customer itinerary first.
      </p>
      <div className="flex flex-col items-stretch gap-3 md:flex-row">
        {options.map((opt, i) => (
          <Fragment key={opt.key}>
            <button
              onClick={() => onChoose(opt.key)}
              className="flex flex-1 flex-col justify-between rounded-2xl border border-red-100 bg-white p-5 text-left transition-all hover:border-[#e05638] hover:shadow-sm"
            >
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50/80">
                  {opt.icon}
                </span>
                <p className="mt-3.5 text-[14.5px] font-bold text-slate-900">{opt.title}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{opt.desc}</p>
              </div>
              <ContinueLink />
            </button>
            {i < options.length - 1 && (
              <div className="hidden shrink-0 items-center text-[11.5px] font-bold text-slate-300 md:flex">
                OR
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Modal>
  );
}

/* ---------- Add Customer form ---------- */
function AddCustomerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addRecord } = useData();
  const [values, setValues] = useState<Record<string, string>>({});

  const set = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addRecord("customersList", values);
    setValues({});
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Customer" width="max-w-lg">
      <p className="-mt-3 mb-4 text-[12px] text-slate-400">Fill in the customer details below</p>
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="mb-1 block text-[11.5px] font-medium text-slate-600">Date of Birth</label>
          <div className="relative">
            <input
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
              type="text"
              placeholder="dd / mm / yyyy"
              value={values.dob ?? ""}
              onChange={set("dob")}
            />
            <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>

        <div className="pt-1">
          <p className="mb-2 text-[12px] font-bold text-slate-800">Address</p>
          <div className="space-y-2.5">
            <div>
              <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                <InfoIcon /> Address
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                placeholder="123 Main Street"
                value={values.address ?? ""}
                onChange={set("address")}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-500">Country</label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-xl border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-800 focus:border-[#e05638] focus:outline-none"
                  value={values.country ?? "India"}
                  onChange={set("country")}
                >
                  <option>🇮🇳 India</option>
                  <option>🇺🇸 United States</option>
                  <option>🇬🇧 United Kingdom</option>
                  <option>🇦🇪 United Arab Emirates</option>
                  <option>🇸🇬 Singapore</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-2.5 text-[10px] text-slate-400">▼</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-500">City</label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                  placeholder="Mumbai"
                  value={values.city ?? ""}
                  onChange={set("city")}
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  State * <InfoIcon />
                </label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-xl border border-slate-200 px-2.5 py-2 text-[12.5px] text-slate-400 focus:border-[#e05638] focus:outline-none">
                    <option>Select State</option>
                  </select>
                  <span className="pointer-events-none absolute right-2 top-2.5 text-[10px] text-slate-400">▼</span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-500">Pincode</label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                  placeholder="400001"
                  value={values.pincode ?? ""}
                  onChange={set("pincode")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <p className="mb-2 text-[12px] font-bold text-slate-800">Business & Identity</p>
          <div className="space-y-2.5">
            <div>
              <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                Customer Type <InfoIcon />
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-xl border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-800 focus:border-[#e05638] focus:outline-none"
                  value={values.customerType ?? "Individual"}
                  onChange={set("customerType")}
                >
                  <option>Individual</option>
                  <option>Corporate</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-2.5 text-[10px] text-slate-400">▼</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  📄 PAN Number <InfoIcon />
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                  placeholder="ABCDE1234F"
                  value={values.panNumber ?? ""}
                  onChange={set("panNumber")}
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  🏢 GSTIN <InfoIcon />
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                  placeholder="22AAAAA0000A1Z5"
                  value={values.gstin ?? ""}
                  onChange={set("gstin")}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                🏢 Company Name
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                placeholder="Acme Corp"
                value={values.companyName ?? ""}
                onChange={set("companyName")}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-500">Passport Number</label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                  placeholder="A1234567"
                  value={values.passportNumber ?? ""}
                  onChange={set("passportNumber")}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-500">Passport Expiry</label>
                <div className="relative">
                  <input
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                    type="text"
                    placeholder="dd / mm / yyyy"
                    value={values.passportExpiry ?? ""}
                    onChange={set("passportExpiry")}
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <p className="mb-2 text-[12px] font-bold text-slate-800">Additional</p>
          <div className="space-y-2.5">
            <div>
              <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                Tags <InfoIcon />
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                placeholder="VIP, Frequent Traveler"
                value={values.tags ?? ""}
                onChange={set("tags")}
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-500">Notes</label>
              <textarea
                className="min-h-[70px] w-full resize-none rounded-xl border border-slate-200 px-3.5 py-2 text-[12.5px] text-slate-800 placeholder:text-slate-300 focus:border-[#e05638] focus:outline-none"
                placeholder="Any additional notes..."
                value={values.notes ?? ""}
                onChange={set("notes")}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-gradient-to-r from-[#e05638] to-[#d04628] py-2.5 text-[13.5px] font-bold text-white shadow-sm hover:opacity-95"
          >
            Add Customer
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[13.5px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------- Dashboard ---------- */
export default function Dashboard() {
  const navigate = useNavigate();
  const { getRecords } = useData();
  const [quoteTypeOpen, setQuoteTypeOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [tripsTab, setTripsTab] = useState<"live" | "upcoming">("live");
  const bookings = getRecords("bookings");
  const leads = getRecords("leads");

  const handleChooseType = (type: "quote" | "quote-itinerary" | "itinerary") => {
    setQuoteTypeOpen(false);
    if (type === "itinerary") navigate("/itinerary");
    else navigate("/quote-booking");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 text-slate-800">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[20px] font-extrabold text-slate-900">Dashboard</h1>
          <p className="mt-0.5 text-[12.5px] text-slate-500">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <CalendarIcon className="h-4 w-4 text-slate-400" />
            Last 30 days
            <span className="text-[9px] text-slate-400">▼</span>
          </button>
          <button
            onClick={() => setQuoteTypeOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#e05638] to-[#d04628] px-3.5 py-1.5 text-[12.5px] font-bold text-white shadow-sm hover:opacity-95"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            New Quote
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
            <FileTextIcon className="h-4 w-4" />
          </div>
          <UserChip />
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Bookings (30d)"
          value={String(bookings.length)}
          sub="0.0% vs 30d"
          icon={<CalendarIcon className="h-5 w-5" />}
          bgLight="bg-[#eff6ff]/70"
          iconBg="bg-[#3b82f6]"
        />
        <StatCard
          label="Revenue (30d)"
          value="₹0"
          sub="0.0% vs 30d"
          icon={<TrendingUpArrow className="h-5 w-5" />}
          bgLight="bg-[#f0fdf4]/80"
          iconBg="bg-[#22c55e]"
        />
        <StatCard
          label="Customer o/s"
          value="₹0"
          sub="0.0% vs 30d"
          icon={<WalletIcon className="h-5 w-5" />}
          bgLight="bg-[#fffbeb]/90"
          iconBg="bg-[#f59e0b]"
        />
        <StatCard
          label="Vendor dues"
          value="₹0"
          sub="0.0% vs 30d"
          icon={<CardIcon className="h-5 w-5" />}
          bgLight="bg-[#faf5ff]/90"
          iconBg="bg-[#a855f7]"
        />
      </div>

      {/* Revenue & Recent Activity */}
      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[15px] font-bold text-slate-900">Revenue Overview</p>
              <p className="text-[12px] text-slate-400">Performance over last 30 days</p>
            </div>
            <div className="flex items-center gap-4 text-[11.5px] font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#e05638]" /> Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Profit
              </span>
            </div>
          </div>
          <ChartPlaceholder label="" />
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div>
            <p className="text-[15px] font-bold text-slate-900">Recent Activity</p>
            <p className="text-[12px] text-slate-400">Latest quotes and bookings</p>
          </div>
          <div className="my-auto py-8 flex flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
              <FileTextIcon className="h-5 w-5" />
            </div>
            <p className="text-[13px] font-semibold text-slate-600">No recent activity</p>
            <p className="mt-1 text-[11.5px] text-slate-400">Create your first quote to get started</p>
          </div>
          <div />
        </div>
      </div>

      {/* Bookings & Financial Summary Section */}
      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Bookings Volume Chart */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-[16px] font-bold text-slate-900">Bookings</h2>
            <p className="text-[12px] text-slate-400">Booking volume over last 30 days</p>
          </div>
          <ChartPlaceholder />
        </div>

        {/* Financial Summary */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-slate-900">Financial Summary</h2>
            <p className="text-[12px] text-slate-400">All-time business overview</p>
          </div>

          <div className="space-y-5">
            {/* Total Revenue */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22c55e] text-white">
                <span className="text-[18px] font-bold">₹</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[12.5px] font-medium text-slate-600">Total Revenue</span>
                  <InfoIcon />
                </div>
                <p className="text-[16px] font-bold text-slate-900">₹0</p>
              </div>
            </div>

            {/* Total Profit */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3b82f6] text-white">
                <TrendingUpArrow className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[12.5px] font-medium text-slate-600">Total Profit</span>
                  <InfoIcon />
                </div>
                <p className="text-[16px] font-bold text-slate-900">₹0</p>
              </div>
            </div>

            {/* Pending Payments */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f59e0b] text-white">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[12.5px] font-medium text-slate-600">Pending Payments</span>
                  <InfoIcon />
                </div>
                <p className="text-[16px] font-bold text-slate-900">₹0</p>
              </div>
            </div>

            {/* Quote Conversion */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a855f7] text-white">
                <span className="text-[16px] font-bold">⇄</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[12.5px] font-medium text-slate-600">Quote Conversion</span>
                  <InfoIcon />
                </div>
                <p className="text-[16px] font-bold text-slate-900">0%</p>
                <p className="text-[11px] text-slate-400">0 of 0 quotes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trips Section */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {/* Updated Trips Icon Container */}
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e05638] text-white">
              <PlaneIcon className="h-5 w-5 -rotate-45" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-slate-900">Trips</p>
              <p className="text-[12px] text-slate-400">Travelling now and departing this week</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl bg-slate-100/80 p-1 text-[12px]">
              <button
                onClick={() => setTripsTab("live")}
                className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                  tripsTab === "live" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                }`}
              >
                Live (0)
              </button>
              <button
                onClick={() => setTripsTab("upcoming")}
                className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                  tripsTab === "upcoming" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                }`}
              >
                Upcoming (0)
              </button>
            </div>
            <button
              onClick={() => navigate("/bookings")}
              className="flex items-center gap-1 text-[12.5px] font-semibold text-[#e05638] hover:underline"
            >
              View all <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="my-10 flex flex-col items-center justify-center text-center">
          <PlaneIcon className="mb-3 h-10 w-10 text-slate-200 -rotate-45" />
          <p className="text-[13.5px] font-semibold text-slate-700">
            {tripsTab === "live" ? "No trips in progress today" : "No upcoming trips"}
          </p>
          <p className="mt-1 text-[12px] text-slate-400">
            {tripsTab === "live"
              ? "Confirmed bookings appear here the day their travel starts"
              : "Confirmed bookings with a future travel date will show here"}
          </p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <button
          onClick={() => setQuoteTypeOpen(true)}
          className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e05638] text-white">
              <FileTextIcon className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-[14px] font-bold text-slate-900">Create Quote</p>
              <p className="text-[11.5px] text-slate-400">Start a new travel quotation</p>
            </div>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
        </button>

        <button
          onClick={() => setAddCustomerOpen(true)}
          className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6] text-white">
              <UsersIcon className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-[14px] font-bold text-slate-900">Add Customer</p>
              <p className="text-[11.5px] text-slate-400">Register a new customer</p>
            </div>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
        </button>

        <button
          onClick={() => navigate("/bookings")}
          className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22c55e] text-white">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-[14px] font-bold text-slate-900">View Bookings</p>
              <p className="text-[11.5px] text-slate-400">Track active bookings</p>
            </div>
          </div>
          <ChevronRightIcon className="h-4 w-4 text-slate-300 group-hover:text-slate-500" />
        </button>
      </div>

      {/* Conversion Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-bold text-slate-900">Lead → Customer conversion</p>
              <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[9.5px] font-bold text-orange-600">
                BETA
              </span>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#e05638]">
              <TrendingUpArrow className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-3 text-[30px] font-extrabold tracking-tight text-slate-900">
            {leads.length === 0
              ? "0%"
              : `${Math.round((leads.filter((l) => l.status === "Converted").length / leads.length) * 100)}%`}
          </p>
          <p className="mt-0.5 text-[11.5px] text-slate-400">0 of 0 generated leads converted</p>
          <button
            onClick={() => navigate("/lead-reports")}
            className="mt-4 text-[12.5px] font-bold text-[#e05638] hover:underline"
          >
            View Lead Reports →
          </button>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-bold text-slate-900">Quote → Booking conversion</p>
              <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[9.5px] font-bold text-orange-600">
                BETA
              </span>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <FileTextIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="my-4 h-1 w-8 rounded bg-slate-900" />
        </div>
      </div>

      {/* Modals */}
      <QuoteTypeModal open={quoteTypeOpen} onClose={() => setQuoteTypeOpen(false)} onChoose={handleChooseType} />
      <AddCustomerModal open={addCustomerOpen} onClose={() => setAddCustomerOpen(false)} />
    </div>
  );
}