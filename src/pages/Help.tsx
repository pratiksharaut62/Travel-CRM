import { useState } from "react";
import UserChip from "../components/UserChip";
import { SearchIcon, ChevronDownIcon, WhatsAppIcon } from "../components/icons";

const manual = [
  { title: "Getting Started", sub: "5 articles" },
  { title: "Dashboard", sub: "3 articles" },
  { title: "Quotes", sub: "8 articles" },
  { title: "Bookings", sub: "6 articles" },
  { title: "Invoices", sub: "4 articles" },
  { title: "Payments", sub: "5 articles" },
  { title: "Refunds & Cancellations", sub: "3 articles" },
  { title: "Settings", sub: "6 articles" },
];

const faqs = [
  "How do I create my first quote?",
  "How do I convert a quote to a booking?",
  "What billing model should I use?",
  "How do I record a payment?",
  "How does the advance balance work?",
  "How do I cancel a booking and issue a refund?",
  "What is TCS and when does it apply?",
  "How are GST/TCS/TDS discovered?",
  "Can I customize invoice numbering?",
  "What roles and permissions are available?",
  "How do I share a quote or invoice?",
  "What is the External Balance Merge (EBM)?",
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [reportType, setReportType] = useState<"feature" | "bug" | "idea">("idea");
  const [search, setSearch] = useState("");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="text-[19px] font-semibold text-ink-900">Help Center</h1>
          <p className="text-[13px] text-ink-500">FAQ, manual, and live support</p>
        </div>
        <UserChip />
      </div>

      <div className="relative mb-6">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          className="input py-3 pl-10 text-[13.5px]"
          placeholder='Search help \u2014 eg. "refund", "GST", "billing model"...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="mb-2 text-[12.5px] font-semibold uppercase tracking-wide text-ink-400">Manual</p>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {manual
          .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))
          .map((m) => (
            <button key={m.title} className="card p-3.5 text-left hover:border-brand-200">
              <p className="text-[13px] font-medium text-ink-900">{m.title}</p>
              <p className="text-[11.5px] text-ink-500">{m.sub}</p>
            </button>
          ))}
      </div>

      <p className="mb-2 text-[13.5px] font-semibold text-ink-900">Frequently Asked Questions</p>
      <div className="card mb-6 divide-y divide-ink-100">
        {faqs
          .filter((q) => q.toLowerCase().includes(search.toLowerCase()))
          .map((q, i) => (
            <div key={q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-[13px] text-ink-700">{q}</span>
                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="px-4 pb-3 text-[12.5px] leading-relaxed text-ink-500">
                  This preview build doesn&rsquo;t have real answer content wired up yet — connect your help
                  content source to populate this section.
                </p>
              )}
            </div>
          ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button className="card flex items-center gap-3 p-3.5 text-left hover:border-brand-200">
          <WhatsAppIcon className="h-8 w-8 shrink-0" />
          <div>
            <p className="text-[13px] font-medium text-ink-900">WhatsApp Support</p>
            <p className="text-[11.5px] text-ink-500">Chat with our team</p>
          </div>
        </button>
        <button className="card flex items-center gap-3 p-3.5 text-left hover:border-brand-200">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 text-[13px] font-bold">
            @
          </span>
          <div>
            <p className="text-[13px] font-medium text-ink-900">Email Support</p>
            <p className="text-[11.5px] text-ink-500">support@moontrip.app</p>
          </div>
        </button>
      </div>

      <div className="card p-4">
        <p className="mb-3 text-[13.5px] font-semibold text-ink-900">Send Feedback</p>
        <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(["feature", "bug", "idea"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setReportType(t)}
              className={`rounded-lg border px-3 py-2 text-center text-[12.5px] font-medium capitalize ${
                reportType === t
                  ? "border-brand-500 bg-brand-50 text-brand-600"
                  : "border-ink-200 text-ink-500 hover:bg-ink-100"
              }`}
            >
              {t === "feature" ? "Feature Request" : t === "bug" ? "Bug Report" : "Idea"}
            </button>
          ))}
        </div>
        <label className="label">Subject</label>
        <input className="input mb-3" placeholder="e.g. Questions about balance" />
        <label className="label">Message</label>
        <textarea className="input min-h-[90px] resize-none" placeholder="Describe your feedback in detail..." />
        <div className="mt-4 flex justify-end">
          <button className="btn-primary">Send Feedback</button>
        </div>
      </div>
    </div>
  );
}
