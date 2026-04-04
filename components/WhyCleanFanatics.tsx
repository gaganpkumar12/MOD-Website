"use client";

import { BadgeCheck, Clock3, RefreshCw, Headset } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import StoreBadges from "./StoreBadges";
import TwinkleSparkle from "./ui/TwinkleSparkle";
import { submitEarlyAccessRequest } from "../lib/earlyAccessClient";

interface Benefit {
  title: string;
  description: string;
  icon: typeof BadgeCheck;
}

const benefits: Benefit[] = [
  {
    title: "Verified Professionals",
    description: "Background-checked, trained staff.",
    icon: BadgeCheck,
  },
  {
    title: "In Minutes",
    description: "Book and get help the same day.",
    icon: Clock3,
  },
  {
    title: "Flexible Plans",
    description: "One-time, weekly, or monthly.",
    icon: RefreshCw,
  },
  {
    title: "Highly Rated",
    description:
      "Trusted by 28,000+ customers with 4.9-star Google rating.",
    icon: Headset,
  },
];

export default function WhyCleanFanatics() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleEarlyAccess = () => {
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await submitEarlyAccessRequest(
        formData.name,
        formData.phone,
      );

      if (result.ok) {
        setShowModal(false);
        setFormData({ name: "", phone: "" });
        alert("Success! We'll be in touch soon.");
      } else {
        alert(result?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Form Modal */}
      {showModal &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[999] grid h-[100dvh] w-full place-items-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md max-h-[88dvh] overflow-y-auto rounded-lg bg-white p-5 shadow-xl sm:p-6"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                aria-label="Close form"
              >
                X
              </button>

              <h2 className="mb-4 pr-8 text-2xl font-bold text-brand-dark">
                Get Early Access
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-brand-dark px-4 py-2 font-semibold text-white hover:bg-slate-900 disabled:bg-slate-600 transition-colors duration-200"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </motion.div>
          </div>,
          document.body,
        )}

      <section
        id="why-clean-fanatics"
        className="relative overflow-hidden bg-brand-dark py-16 text-sky-100 sm:py-24"
      >
        <span className="pointer-events-none absolute left-[18%] top-4 text-2xl text-sky-300/90">
          ✦
        </span>
        <span className="pointer-events-none absolute right-[20%] top-24 text-3xl text-sky-300/90">
          ✦
        </span>
        <span className="pointer-events-none absolute left-[2%] top-40 text-2xl text-sky-300/80">
          ✦
        </span>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-extrabold text-sky-100 sm:text-5xl">
              Why Clean Fanatics
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-sky-200 sm:text-base">
              Built for busy urban homes: verified professionals, instant slots,
              and support that actually responds.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={benefit.title} delay={index * 0.08}>
                  <article className="group rounded-2xl border border-sky-100 bg-white p-6 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-sky-100">
                    <div className="inline-flex rounded-xl bg-sky-100 p-3 text-sky-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-brand-dark">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-slate-600">{benefit.description}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.35}>
            <div className="mt-10 rounded-3xl border border-sky-200 bg-slate-950/20 px-6 py-8 text-center shadow-lg shadow-black/10 sm:px-8 md:hidden">
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-sky-100 sm:text-base">
                Download the app to book faster, track your service, and keep
                your next clean one tap away.
              </p>
              <button
                onClick={handleEarlyAccess}
                disabled={loading}
                className="relative mt-4 mx-auto inline-flex items-center justify-center rounded-lg bg-sky-400 px-8 py-3 text-center font-semibold text-brand-dark transition-colors duration-200 hover:bg-sky-300 disabled:bg-sky-200"
              >
                <span className="relative inline-block pr-1">
                  {loading ? "Sending..." : "Get Early Access"}
                  {!loading && (
                    <span className="pointer-events-none absolute -right-[0.55em] -top-3">
                      <TwinkleSparkle className="h-6 w-6" />
                    </span>
                  )}
                </span>
              </button>
              <div className="mt-6 flex justify-center">
                <StoreBadges size="md" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
