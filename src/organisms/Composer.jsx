// src/organisms/Composer.jsx
import { useEffect, useMemo, useState } from "react";
import { keyStore } from "../store/keyStore";

export default function Composer({ onSend }) {
  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState(keyStore.get() || "");
  const [showKey, setShowKey] = useState(false);
  const canSend = useMemo(() => apiKey.trim() && text.trim(), [apiKey, text]);

  // keep checkbox in sync if key already stored
  const isRemembered = useMemo(() => !!keyStore.get(), [apiKey]);

  useEffect(() => {
    // if user typed a new key while "remember" was on, persist it
    if (isRemembered) keyStore.set(apiKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  const handleSend = () => {
    if (!canSend) return;
    onSend(apiKey.trim(), text.trim());
    setText("");
  };

  return (
    <div className="flex flex-col gap-3">
      {/* API key row */}
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="sk-... (paste your OpenAI API key)"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type={showKey ? "text" : "password"}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setShowKey((s) => !s)}
          className="rounded-lg border px-2.5 py-2 text-xs text-slate-700 hover:bg-slate-50"
          aria-label={showKey ? "Hide API key" : "Show API key"}
        >
          {showKey ? "Hide" : "Show"}
        </button>
      </div>

      {/* message composer */}
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-end gap-2 rounded-2xl border bg-white/80 px-3 py-2 shadow-sm">
        <textarea
          id="chat"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask me anything… (Enter to send, Shift+Enter for newline)"
          className="mx-1 w-full resize-none rounded-xl  bg-white p-2.5 text-sm text-slate-900 outline-none "
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={`inline-flex items-center justify-center rounded-full p-2 transition
            ${canSend
              ? "text-indigo-600 hover:bg-indigo-50 active:scale-95"
              : "text-slate-400 cursor-not-allowed"}`}
          aria-label="Send message"
          title="Send"
        >
          <svg className="h-5 w-5 rotate-90 rtl:-rotate-90" viewBox="0 0 18 20" fill="currentColor">
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
        </button>
      </div>

      <p className="text-[11px] text-slate-500">
        Tip: Don’t share real secrets on public sites. For production, keep your key on a server/proxy.
      </p>
    </div>
  );
}
