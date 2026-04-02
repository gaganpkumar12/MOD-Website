"use client";

import StoreBadges from "./StoreBadges";
import ScrollReveal from "./ui/ScrollReveal";

export default function AppDownload() {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-white py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(2,132,199,0.14),transparent_35%)]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-8">
        <div className="rounded-3xl border border-sky-200 bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-black uppercase tracking-[0.01em] text-brand-dark sm:text-5xl">
              Download The Clean Fantics App
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Fast booking, verified professionals, and spotless results in
              minutes.
            </p>
          </ScrollReveal>

          <div className="mt-8 flex justify-center">
            <StoreBadges />
          </div>
        </div>
      </div>
    </section>
  );
}
