"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import ScrollReveal from "./ui/ScrollReveal";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-extrabold text-brand-dark sm:text-5xl">What our users are saying</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Real stories from households across Bengaluru.
          </p>
        </ScrollReveal>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 w-full max-w-7xl px-3 sm:mt-10 sm:px-6"
      >
        <div className="w-full rounded-2xl border border-sky-100 bg-sky-50 p-2 shadow-sm sm:p-4">
          <div className="elfsight-app-d1323706-7bd0-4e00-8e5a-15c444c737a1 w-full" data-elfsight-app-lazy />
        </div>
      </motion.div>
    </section>
  );
}
