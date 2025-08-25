import { useState } from "react";
import { keyStore } from "../store/keyStore";

export default function Composer({ onSend }) {
  const [text, setText] = useState("");
  const [tempKey, setTempKey] = useState(keyStore.get() || "");

  return (
    <div className="flex flex-col gap-2">
      <input
        className="border rounded px-3 py-2"
        placeholder="sk-... (paste your OpenAI API key)"
        value={tempKey}
        onChange={e => setTempKey(e.target.value)}
      />
      <textarea
        className="border rounded px-3 py-2"
        placeholder="Ask me anything…"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        className="border rounded px-3 py-2"
        onClick={() => { if (tempKey && text) { onSend(tempKey, text); setText(""); } }}
      >
        Send
      </button>
    </div>
  );
}
