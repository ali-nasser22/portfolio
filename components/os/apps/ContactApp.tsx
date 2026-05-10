import { useState } from "react";

const ENDPOINT = "https://formsubmit.co/ajax/alinasser.t22@gmail.com";

export function ContactApp() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error"); setErrMsg("all fields required"); return;
    }
    setStatus("sending"); setErrMsg("");
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `AliOS 95 Contact — ${form.name}`,
        }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch (e: any) {
      setStatus("error");
      setErrMsg(e?.message || "send failed");
    }
  };

  const inputCls = "bevel-in-deep w-full px-2 py-1 font-mono text-[13px] outline-none focus:bg-[#fffbe0]";

  return (
    <div className="space-y-2">
      <div className="bevel-in px-2 py-1 text-xs font-mono">C:\Contact\new_message.eml</div>
      <form onSubmit={submit} className="bevel-in-deep p-3 space-y-2 font-mono">
        <div>
          <label className="text-xs block mb-0.5">To:</label>
          <div className="bevel-in-deep px-2 py-1 text-[13px] bg-[var(--color-win)] text-[var(--color-bevel-dark)]">
            alinasser.t22@gmail.com
          </div>
        </div>
        <div>
          <label className="text-xs block mb-0.5">From (your name):</label>
          <input className={inputCls} value={form.name} onChange={set("name")} maxLength={80} />
        </div>
        <div>
          <label className="text-xs block mb-0.5">Reply-to (email):</label>
          <input type="email" className={inputCls} value={form.email} onChange={set("email")} maxLength={120} />
        </div>
        <div>
          <label className="text-xs block mb-0.5">Message:</label>
          <textarea className={inputCls} rows={5} value={form.message} onChange={set("message")} maxLength={2000} />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button type="submit" className="btn-95" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send"}
          </button>
          {status === "ok" && <span className="text-xs text-[oklch(0.45_0.15_140)]">✓ message sent</span>}
          {status === "error" && <span className="text-xs text-[var(--accent-red)]">✕ {errMsg}</span>}
        </div>
      </form>
    </div>
  );
}
