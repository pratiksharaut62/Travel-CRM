import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserChip from "../components/UserChip";
import { PlusIcon, HelpIcon, SparkleIcon, RefreshIcon } from "../components/icons";

type ChatMessage = { id: string; role: "user" | "tara"; text: string };

export default function Tara() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: `t-${Date.now() + 1}`,
        role: "tara",
        text: "This is a UI preview \u2014 Tara isn't connected to a live model or your data yet, so I can't act on this request just yet.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 hover:bg-ink-100"
          >
            &larr;
          </button>
          <div>
            <h1 className="text-[17px] font-semibold text-ink-900">Tara</h1>
            <p className="text-[12px] text-ink-500">MoonTrip AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost">
            <RefreshIcon className="h-4 w-4" />
          </button>
          <button onClick={() => setMessages([])} className="btn-secondary">
            New chat
          </button>
          <UserChip />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto">
        {messages.length === 0 ? (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500">
              <SparkleIcon className="h-6 w-6" />
            </div>
            <p className="text-[18px] font-semibold text-ink-900">Hi Pratiksha Raut, how can I help?</p>
            <p className="mt-1 text-[13px] text-ink-500">
              I can record transactions, answer questions, or help you navigate MoonTrip.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => send("Record transaction")}
                className="card flex items-center gap-2.5 px-4 py-3 text-left hover:border-brand-200"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-green-50 text-green-600">
                  <PlusIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-ink-900">Record transaction</p>
                  <p className="text-[11.5px] text-ink-500">Payment, receipt, expense, or transfer</p>
                </div>
              </button>
              <button
                onClick={() => send("Ask a question")}
                className="card flex items-center gap-2.5 px-4 py-3 text-left hover:border-brand-200"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <HelpIcon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-medium text-ink-900">Ask a question</p>
                  <p className="text-[11.5px] text-ink-500">Features, accounting help, how-to guides, FAQs</p>
                </div>
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => send("Paid 10k cash to Nam Ho")}
                className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[12px] text-ink-600 hover:bg-ink-100"
              >
                Paid 10k cash to Nam Ho
              </button>
              <button
                onClick={() => send("How does hidden markup work?")}
                className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[12px] text-ink-600 hover:bg-ink-100"
              >
                How does hidden markup work?
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-full max-w-2xl flex-1 flex-col gap-3 self-start overflow-y-auto py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-[13px] ${
                  m.role === "user"
                    ? "self-end bg-brand-500 text-white"
                    : "self-start bg-ink-100 text-ink-700"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-3 py-2.5">
          <input
            className="flex-1 border-0 text-[13.5px] outline-none placeholder:text-ink-400"
            placeholder="Ask Tara anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <button onClick={() => send(input)} className="btn-primary !px-3 !py-1.5">
            Send
          </button>
        </div>
        <p className="mt-1.5 text-center text-[11px] text-ink-400">
          Enter to send · Shift+Enter for new line · Tara uses AI, verify important details · 0/50 this
          week
        </p>
      </div>
    </div>
  );
}
