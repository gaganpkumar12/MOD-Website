"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import StoreBadges from "./StoreBadges";
import ScrollReveal from "./ui/ScrollReveal";
import TwinkleSparkle from "./ui/TwinkleSparkle";
import { submitEarlyAccessRequest } from "../lib/earlyAccessClient";

export default function AppDownload() {
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

            <div className="mt-8 flex flex-col items-center gap-6">
              <button
                onClick={handleEarlyAccess}
                className="relative mx-auto inline-flex items-center justify-center rounded-lg bg-sky-400 px-6 py-3 text-center font-semibold text-slate-900 hover:bg-sky-500 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <span className="relative inline-block pr-1">
                  Get Early Access
                  <span className="pointer-events-none absolute -right-[0.55em] -top-3">
                    <TwinkleSparkle className="h-6 w-6" />
                  </span>
                </span>
              </button>
              <StoreBadges />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
