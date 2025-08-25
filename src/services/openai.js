

export async function askOpenAI({
  apiKey,
  model,
  messages,
  baseUrl = import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1"
}) {
  // you can call the unified Responses API with 'input' as text/history,
  // or use classic chat.completions. Here's a simple Responses API call:
  const res = await fetch(`${baseUrl}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || import.meta.env.VITE_DEFAULT_MODEL || "gpt-4o-mini",
      input: messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n")
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `HTTP ${res.status}`);
  }

  const data = await res.json();
  // new API often provides a convenience text field:
  const text = data.output_text ?? data.content?.[0]?.text ?? "";
  return text;
}
