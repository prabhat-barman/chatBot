import { useEffect, useState } from "react";
import { keyStore } from "../store/keyStore";

export default function KeyInput() {
  const [key, setKey] = useState("");

  useEffect(() => {
    const k = keyStore.get();
    if (k) setKey(k);
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <input
        value={key}
        onChange={e => setKey(e.target.value)}
        placeholder="sk-..."
        className="border rounded px-3 py-2 w-full"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!keyStore.get()}
          onChange={e => (e.target.checked ? keyStore.set(key) : keyStore.clear())}
        />
        remember
      </label>
    </div>
  );
}
