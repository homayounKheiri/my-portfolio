"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, RotateCcw, Zap } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = [
  "What can you automate for me?",
  "Can you build a website?",
  "How does AI BI help?",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Aria — a lightweight assistant for the studio. Ask me anything about AI automation, business intelligence, or web work.",
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function AIChat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef("sess-" + Math.random().toString(36).slice(2, 10)).current;
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, sessionId }),
      });
      const data = await res.json();
      const reply =
        data?.ok && data.reply
          ? data.reply
          : "I'm having trouble connecting right now. Mind leaving your number in the Contact section?";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Something went wrong on my end. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    setMessages([GREETING]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <section id="chat" className="section-light relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      {/* Modern ambient accent — a soft tint, not a heavy blur orb */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.10),transparent_65%)]" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(17,24,39,0.06),transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand"
          >
            <Zap className="h-3.5 w-3.5" />
            Ask Anything
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-[44px]"
          >
            Meet your lightweight assistant
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-3 max-w-md text-[14.5px] text-ink-muted"
          >
            A small, fast helper — no signup, no noise. Just answers.
          </motion.p>
        </div>

        {/* Chat card — modern, floating, airy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-10 w-full max-w-[460px] overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_30px_80px_-40px_rgba(17,24,39,0.3)]"
        >
          {/* Header bar — gradient accent */}
          <div className="relative flex items-center justify-between border-b border-border px-5 py-4">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-orange-400 text-white shadow-[0_8px_20px_-8px_rgba(249,115,22,0.7)] pulse-ring">
                <Sparkles className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-ink">Aria</p>
                <p className="flex items-center gap-1.5 text-[11.5px] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Online · replies in seconds
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              aria-label="Reset conversation"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted transition-all hover:scale-105 hover:bg-secondary hover:text-ink focus-brand"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="scroll-area h-[320px] overflow-y-auto bg-[#FAFAF9] px-4 py-5 sm:h-[360px]">
            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <Bubble key={i} msg={m} />
                ))}
              </AnimatePresence>
              {loading && <Typing />}
            </div>
          </div>

          {/* Quick replies (only when conversation is fresh) */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t border-border bg-white px-4 py-3">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border bg-white px-3.5 py-1.5 text-[12px] font-medium text-ink-muted transition-all hover:scale-[1.03] hover:border-brand/40 hover:text-ink focus-brand"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input — modern pill */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-white p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              maxLength={1000}
              className="flex-1 rounded-full border border-border bg-[#FAFAF9] px-5 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand/50 focus-brand"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-[0_8px_22px_-8px_rgba(17,24,39,0.7)] transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 focus-brand"
            >
              <Send className="h-4 w-4" strokeWidth={2.4} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Bubble ---------- */
function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
          isUser
            ? "rounded-br-md bg-brand text-white shadow-[0_8px_20px_-10px_rgba(249,115,22,0.7)]"
            : "rounded-bl-md border border-border bg-white text-ink shadow-[0_2px_10px_-6px_rgba(17,24,39,0.2)]"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

/* ---------- Typing indicator ---------- */
function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-white px-4 py-3.5 shadow-[0_2px_10px_-6px_rgba(17,24,39,0.2)]">
        <span className="dot h-2 w-2 rounded-full bg-ink-muted" />
        <span className="dot h-2 w-2 rounded-full bg-ink-muted" />
        <span className="dot h-2 w-2 rounded-full bg-ink-muted" />
      </div>
    </motion.div>
  );
}
