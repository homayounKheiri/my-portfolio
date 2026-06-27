"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Check, Loader2, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const { t } = useI18n();
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data?.ok) {
        setStatus("done");
        setPhone("");
      } else {
        setStatus("error");
        setError(data?.error || "Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-light relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="relative mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-[28px] border border-border bg-white p-8 shadow-[0_40px_100px_-50px_rgba(17,24,39,0.4)] sm:p-12"
        >
          {/* decorative glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-ink/5 blur-3xl" />

          <div className="relative">
            {/* Eyebrow */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand">
                <span className="h-px w-6 bg-brand/50" />
                {t("contact.eyebrow")}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-balance text-center text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-[40px] lg:text-left">
              {t("contact.titlePre")}{" "}
              <span className="text-gradient-brand">{t("contact.titleMid")}</span>{" "}
              {t("contact.titlePost")}
            </h2>

            <p className="mt-3 max-w-lg mx-auto text-center text-[14.5px] leading-relaxed text-ink-muted lg:mx-0 lg:text-left">
              {t("contact.subtitle")}
            </p>

            {/* Form / success */}
            <div className="mt-8 mx-auto max-w-xl lg:mx-0">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50/60 px-5 py-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                      <Check className="h-4.5 w-4.5" strokeWidth={3} />
                    </span>
                    <div>
                      <p className="text-[14.5px] font-semibold text-ink">
                        {t("contact.successTitle")}
                      </p>
                      <p className="text-[13px] text-ink-muted">
                        {t("contact.successBody")}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-muted" />
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t("contact.placeholder")}
                        disabled={status === "loading"}
                        className="h-14 w-full rounded-2xl border border-border bg-white pl-12 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-brand/50 focus-brand disabled:opacity-60"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading" || !phone.trim()}
                      className="group flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-[14.5px] font-semibold text-white shadow-[0_14px_36px_-12px_rgba(249,115,22,0.8)] transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 focus-brand"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          {t("contact.button")}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {status === "error" && error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-[13px] font-medium text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-5 text-[12px] text-ink-muted">
              {t("contact.note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
