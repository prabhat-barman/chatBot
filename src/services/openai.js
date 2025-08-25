// src/services/openai.js
export async function askOpenAI({
  apiKey,
  model,
  messages,
  baseUrl = import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1",
}) {
  if (!apiKey) throw new Error("Missing API key");

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || import.meta.env.VITE_DEFAULT_MODEL || "gpt-4o-mini",
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(await res.text().catch(() => `HTTP ${res.status}`));

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || "";
  return text;
}
