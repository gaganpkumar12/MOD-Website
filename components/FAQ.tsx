"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "./ui/ScrollReveal";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is Clean Fanatics?",
    answer:
      "Clean Fanatics is an on-demand home services app that connects you with verified cleaning professionals in minutes.",
  },
  {
    question: "How quickly can I book a cleaner?",
    answer:
      "Most bookings can be confirmed within minutes, with same-day slots available based on your location and time.",
  },
  {
    question: "Are Clean Fanatics professionals verified?",
    answer:
      "Yes. Every professional is background-checked, trained, and quality-reviewed before joining the platform.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is transparent and shown before checkout, based on service type, duration, and frequency.",
  },
  {
    question: "Which cities does Clean Fanatics operate in?",
    answer:
      "Currently: Delhi NCR, Bengaluru, Mumbai, Hyderabad, and Chennai, with more cities launching soon.",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer:
      "Yes. You can cancel or reschedule from the app dashboard. Charges may apply based on timing.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Our support team is available 24/7 through in-app chat and phone assistance.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-8">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-extrabold text-brand-dark sm:text-5xl">
            FAQs
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Everything you need to know before your first booking.
          </p>
        </ScrollReveal>

        <div className="mt-7 divide-y divide-sky-100 rounded-2xl border border-sky-100 bg-white sm:mt-8">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="text-base font-semibold text-brand-dark">
                    {faq.question}
                  </span>
                  <span className="text-sky-500">
                    {open ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
