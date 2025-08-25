import Composer from "../organisms/Composer";
import { useChat } from "../hooks/useChat";

export default function ChatPage() {
  const { messages, send, loading, error } = useChat();

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Tiny Chat (client-only)</h1>

      <Composer onSend={send} />

      <div className="space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className="inline-block px-3 py-2 rounded border">
              <b>{m.role === "user" ? "You" : "Assistant"}:</b> {m.content}
            </div>
          </div>
        ))}
      </div>

      {loading && <div>Thinking…</div>}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}
