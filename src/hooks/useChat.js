// src/hooks/useChat.js
import { useState, useCallback } from "react";
import { askOpenAI } from "../services/openai";

export function useChat() {
  const [messages, setMessages] = useState([]);          // no TS types in JS
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(
    async (apiKey, userText) => {
      if (!userText) return;
      setError(null);

      // add the user's message
      const next = [...messages, { role: "user", content: userText }];
      setMessages(next);
      setLoading(true);

      try {
        const reply = await askOpenAI({ apiKey, messages: next });
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
      } catch (e) {
        const msg =
          (e && e.message) ||
          (typeof e === "string" ? e : "Request failed");
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  return { messages, send, loading, error };
}
