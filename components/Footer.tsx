"use client";

import { motion } from "framer-motion";
import { Copyright } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import StoreBadges from "./StoreBadges";
import TwinkleSparkle from "./ui/TwinkleSparkle";
import { submitEarlyAccessRequest } from "../lib/earlyAccessClient";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [travelProgress, setTravelProgress] = useState(0);
  const [floatingOpacity, setFloatingOpacity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal || showSuccessModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal, showSuccessModal]);

  useEffect(() => {
    const onScroll = () => {
      const services = document.getElementById("services");
      const footer = footerRef.current;
      if (!services || !footer) return;

      const servicesRect = services.getBoundingClientRect();
      const servicesTop = servicesRect.top + window.scrollY;
      const fadeStart = window.innerHeight * 0.84;
      const hideAt = window.innerHeight * 0.78;
      const hasPassedServices = servicesRect.bottom <= fadeStart;

      const footerRect = footer.getBoundingClientRect();
      const reachedFooter = footerRect.top <= window.innerHeight - 180;

      const handoffProgressRaw =
        (fadeStart - servicesRect.bottom) / Math.max(1, fadeStart - hideAt);
      const handoffProgress = Math.max(0, Math.min(1, handoffProgressRaw));

      const travelStart = servicesTop + services.offsetHeight * 0.62;
      const travelEnd = servicesTop + services.offsetHeight + 280;
      const progressRaw =
        (window.scrollY - travelStart) / Math.max(1, travelEnd - travelStart);
      const progress = Math.max(0, Math.min(1, progressRaw));

      setShowCard(hasPassedServices && !reachedFooter);
      setTravelProgress(progress);
      setFloatingOpacity(handoffProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
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

  const downloadCard = (
    <div className="font-display w-fit rounded-3xl border border-white/55 bg-white/95 p-4 shadow-xl shadow-sky-950/30 backdrop-blur-sm sm:p-5">
      <p className="text-xs font-bold tracking-wider text-slate-700 sm:text-sm">
        Download
      </p>
      <p className="text-3xl font-bold text-sky-600">Clean Fanatics</p>
      <button
        onClick={handleEarlyAccess}
        className="relative mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand-dark px-4 py-2 text-center font-semibold text-white hover:bg-slate-900 transition-colors duration-200"
      >
        <span className="relative inline-block pr-1">
          Get Early Access
          <span className="pointer-events-none absolute -right-[0.55em] -top-3">
            <TwinkleSparkle className="h-6 w-6" />
          </span>
        </span>
      </button>
      <StoreBadges className="mt-3" size="sm" stacked />
    </div>
  );

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[999] grid h-[100dvh] w-full place-items-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-lg bg-white p-6 text-center shadow-xl sm:p-8"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Request Received!
              </h3>
              <p className="mt-2 text-slate-600">
                We have received your request. Our team will be in touch soon!
              </p>
            </motion.div>
          </div>,
          document.body,
        )}

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

      <footer
        ref={footerRef}
        className="relative overflow-hidden bg-brand-dark pb-10 pt-14 text-sky-100 sm:pt-16"
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

        {showCard ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{
              opacity: floatingOpacity,
              y: -2 + travelProgress * 8,
              x: travelProgress * 5,
              scale: 1 - travelProgress * 0.03,
            }}
            transition={{
              opacity: { duration: 0.12 },
              duration: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed bottom-12 left-4 z-50 hidden lg:block"
          >
            {downloadCard}
          </motion.div>
        ) : null}

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-footer-display text-4xl font-black uppercase leading-[1.03] text-white sm:text-6xl">
              YOUR HOME
            </p>
            <h3 className="font-footer-display mt-1 text-5xl font-black uppercase leading-[0.98] text-white sm:text-7xl">
              <span className="italic text-sky-300 decoration-sky-300/70 underline-offset-4">
                Deserves
              </span>{" "}
              Better
            </h3>
            <p className="mx-auto mt-6 max-w-xl text-lg text-sky-100/90">
              Professional cleaning at your fingertips, whenever you need it.
            </p>
            <div className="mt-10 flex justify-center">
              <StoreBadges />
            </div>
          </div>

          <div className="mt-12 border-t border-white/12 pb-10 pt-6 sm:pb-12">
            <p className="flex items-center justify-center gap-2 text-center text-sm text-sky-100/95">
              <Copyright className="h-4 w-4" />
              2026 Clean Fanatics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
