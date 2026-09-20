import { useState } from "react";
import { WhatsAppIcon, XIcon, SparkleIcon } from "./icons";

export default function FloatingHelp({
  suggestions = ["What should I check?", "What do I do next?"],
}: {
  suggestions?: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 rounded-xl2 border border-ink-100 bg-white p-4 shadow-pop">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-[10px] font-bold tracking-wide text-brand-500">SCREEN HELP</span>
            <button onClick={() => setOpen(false)} className="text-ink-400 hover:text-ink-700">
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[13.5px] font-semibold text-ink-900">Need help with this page?</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
            Tara looks at this screen&rsquo;s visible snapshot, explains what is unclear, helps you learn how it
            works, and helps you take action.
          </p>
          <div className="mt-2 text-[10px] font-medium text-ink-400">TRY ASKING</div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[11.5px] font-medium text-brand-600 hover:bg-brand-100"
              >
                {s}
              </button>
            ))}
          </div>
          <button className="mt-2 text-[12px] font-medium text-brand-600 hover:underline">
            Ask anything &rarr;
          </button>
        </div>
      )}
      <div className="flex items-center gap-2.5">
        <button
          aria-label="WhatsApp support"
          className="flex h-10 w-10 items-center justify-center rounded-full shadow-pop"
        >
          <WhatsAppIcon className="h-10 w-10" />
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2.5 text-[13px] font-semibold text-white shadow-pop hover:opacity-90"
        >
          <SparkleIcon className="h-4 w-4" />
          Ask Tara
        </button>
      </div>
    </div>
  );
}
