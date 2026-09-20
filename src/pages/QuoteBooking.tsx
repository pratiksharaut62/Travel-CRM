import { useState } from "react";
import PageHeader from "../components/PageHeader";
import UserChip from "../components/UserChip";
import FormModal from "../components/FormModal";
import { moduleConfigs } from "../data/moduleConfigs";
import { useData } from "../context/DataContext";
import {
  UploadIcon,
  PlusIcon,
  FileTextIcon,
  GlobeIcon,
  ExternalLinkIcon,
  DownloadIcon,
} from "../components/icons";

export default function QuoteBooking() {
  const { getRecords, addRecord } = useData();
  const quotes = getRecords("quotes");
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState<"quote" | "itinerary">("quote");

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <PageHeader
          title="Quotes"
          subtitle={`${quotes.length} quotations`}
          actions={
            <>
              <button className="btn-secondary">
                <UploadIcon className="h-4 w-4" />
                Import
              </button>
              <button onClick={() => setModalOpen(true)} className="btn-primary">
                <PlusIcon className="h-4 w-4" />
                New Quote
              </button>
            </>
          }
        />
        <UserChip />
      </div>

      <p className="mb-1 text-[17px] font-semibold text-ink-900">Build your first quote</p>
      <p className="mb-4 text-[13px] text-ink-500">Start from scratch — or see exactly what your customer receives.</p>

      <button
        onClick={() => setModalOpen(true)}
        className="card mb-6 block w-full bg-gradient-to-br from-brand-50 to-white p-5 text-left hover:border-brand-200"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-white">
            <FileTextIcon className="h-[18px] w-[18px]" />
          </span>
          <p className="text-[14px] font-semibold text-ink-900">Full Quote</p>
          <span className="rounded bg-brand-50 px-2 py-0.5 text-[10.5px] font-semibold text-brand-600">
            Detailed builder
          </span>
        </div>
        <ol className="mt-3 space-y-1.5 pl-1">
          <li className="flex items-center gap-2 text-[12.5px] text-ink-600">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-600">1</span>
            Human led.
          </li>
          <li className="flex items-center gap-2 text-[12.5px] text-ink-600">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-600">2</span>
            Full AI data input, edit and assistance.
          </li>
        </ol>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-600">
          Start full quote →
        </span>
      </button>

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[15px] font-semibold text-ink-900">See a real example</p>
          <p className="text-[12.5px] text-ink-500">A finished quote & itinerary — open or download the PDF to get a better idea.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 rounded-lg border border-ink-200 bg-white p-1">
            <button
              onClick={() => setPreview("quote")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium ${
                preview === "quote" ? "bg-ink-900 text-white" : "text-ink-500"
              }`}
            >
              <FileTextIcon className="h-3.5 w-3.5" /> Quote
            </button>
            <button
              onClick={() => setPreview("itinerary")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium ${
                preview === "itinerary" ? "bg-ink-900 text-white" : "text-ink-500"
              }`}
            >
              <GlobeIcon className="h-3.5 w-3.5" /> Itinerary
            </button>
          </div>
          <button className="btn-secondary">
            <ExternalLinkIcon className="h-4 w-4" />
            Open PDF
          </button>
          <button className="btn-primary">
            <DownloadIcon className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      <div className="card overflow-hidden p-6">
        {preview === "quote" ? (
          <div className="mx-auto max-w-xl">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-[13px] font-bold text-white">
                  YC
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-ink-900">Your Company Name</p>
                  <p className="text-[11.5px] text-ink-400">Your tagline here</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-semibold text-ink-900">Quotation</p>
                <p className="text-[11.5px] text-ink-500">Quote No. NA-2183-QT</p>
                <p className="text-[11.5px] text-ink-500">Date 13/07/2026</p>
              </div>
            </div>
            <div className="h-px w-full bg-brand-gradient" />
            <div className="mt-5 space-y-2">
              <div className="h-2.5 w-2/3 rounded bg-ink-100" />
              <div className="h-2.5 w-1/2 rounded bg-ink-100" />
              <div className="h-2.5 w-3/4 rounded bg-ink-100" />
              <div className="h-2.5 w-1/3 rounded bg-ink-100" />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-xl space-y-3">
            <div className="h-28 w-full rounded-lg bg-ink-100" />
            <div className="h-2.5 w-1/2 rounded bg-ink-100" />
            <div className="h-2.5 w-3/4 rounded bg-ink-100" />
            <div className="h-2.5 w-2/3 rounded bg-ink-100" />
          </div>
        )}
      </div>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(values) => {
          addRecord("quotes", values);
          setModalOpen(false);
        }}
        title="Create Quote"
        fields={moduleConfigs.quotes.fields}
      />
    </div>
  );
}
