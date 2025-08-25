// src/pages/ChatPage.jsx
import { useEffect, useRef } from "react";
import Composer from "../organisms/Composer";
import { useChat } from "../hooks/useChat";

export default function ChatPage() {
  const { messages, send, loading, error } = useChat();
  const endRef = useRef(null);

  // auto-scroll to bottom when new messages arrive
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 text-slate-800">
      {/* header */}
     
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl grid place-items-center bg-indigo-600 text-white font-bold shadow-sm">
              AI
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Tiny Chat</h1>
              <p className="text-xs text-slate-500">client-only demo • paste API key below</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {loading && (
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-700">
                <span className="h-2 w-2 animate-ping rounded-full bg-indigo-600" />
                thinking…
              </span>
            )}
            {error && (
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-600/10 px-3 py-1 text-xs font-medium text-rose-700">
                error
              </span>
            )}
          </div>
        </div>
      

      {/* content */}
      <main className="mx-auto max-w-3xl px-4">
        {/* chat card */}
        <div className="mt-4 mb-24 rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
          {/* messages area */}
          <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6">
            {messages.length === 0 && (
              <EmptyState />
            )}

            <div className="space-y-3">
              {messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} text={m.content} />
              ))}
              {loading && <AssistantThinking />}
              <div ref={endRef} />
            </div>
          </div>

          {/* error bar */}
          {error && (
            <div className="border-t bg-rose-50 px-4 py-2 text-sm text-rose-700">
              {String(error)}
            </div>
          )}

          {/* composer */}
          <div className="border-t bg-white/70 p-3 sm:p-4 rounded-b-2xl">
            <Composer onSend={send} />
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="pb-6 text-center text-xs text-slate-500">
        built with vite + react + tailwind
      </footer>
    </div>
  );
}

/* ---------- tiny presentational components ---------- */

function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm",
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white border text-slate-800 rounded-bl-sm"
        ].join(" ")}
      >
        {!isUser && <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">assistant</div>}
        {isUser && <div className="sr-only">you</div>}
        <div className="whitespace-pre-wrap leading-relaxed">{text}</div>
      </div>
    </div>
  );
}

function AssistantThinking() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
        <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-500">assistant</div>
        <div className="flex items-center gap-2">
          <Dot />
          <Dot className="animation-delay-150" />
          <Dot className="animation-delay-300" />
        </div>
      </div>
    </div>
  );
}

function Dot({ className = "" }) {
  return (
    <span
      className={`h-2 w-2 animate-bounce rounded-full bg-slate-400 ${className}`}
      style={{ animationDuration: "900ms" }}
    />
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center py-10 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-indigo-600 text-white grid place-items-center shadow">
          💬
        </div>
        <h2 className="text-base font-semibold">Start a conversation</h2>
        <p className="mt-1 text-sm text-slate-600">
          Paste your OpenAI API key in the field below (toggle “remember” to store it on this device),
          then ask a question in the composer.
        </p>
      </div>
    </div>
  );
}
