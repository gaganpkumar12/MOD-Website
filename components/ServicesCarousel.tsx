"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import StoreBadges from "./StoreBadges";
import TwinkleSparkle from "./ui/TwinkleSparkle";
import { submitEarlyAccessRequest } from "../lib/earlyAccessClient";

interface ServiceItem {
  name: string;
  image: string;
}

const services: ServiceItem[] = [
  { name: "Window Cleaning", image: "/Window Cleaning CFH.png" },
  { name: "Bathroom Cleaning", image: "/Bathroom Cleaning CFH.png" },
  { name: "Kitchen Cleaning", image: "/Kitchen Cleaning CFH.png" },
  { name: "Dusting", image: "/Dusting CFH.png" },
  { name: "Dishwashing", image: "/Utensils CFH.png" },
  { name: "Floor mopping", image: "/Mopping CFH.png" },
  { name: "Laundry", image: "/Laundry CFH.png" },
  { name: "Sweeping", image: "/Sweeping CFH.png" },
];

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="w-[200px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-[0_14px_35px_rgba(15,27,45,0.14)] sm:w-[280px] md:w-[360px]">
      <div className="relative h-[180px] sm:h-[320px] md:h-[430px]">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-[64px] items-center justify-center bg-white px-3 sm:h-[74px] sm:px-4">
        <p className="text-center text-lg font-black capitalize text-slate-900 sm:text-2xl">
          {service.name}
        </p>
      </div>
    </article>
  );
}

export default function ServicesCarousel() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  const loopedServices = useMemo(() => [...services, ...services], []);

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

      <section
        id="services"
        className="relative overflow-hidden bg-white py-16 sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              <Sparkles className="h-4 w-4" />
              Our Services
            </p>
            <h2 className="mt-4 font-display text-3xl font-black text-slate-900 sm:text-5xl lg:text-6xl">
              Book trusted cleaning help
            </h2>
            <p className="mt-3 text-base font-semibold text-slate-500 sm:text-lg">
              From stubborn mess to daily upkeep, CleanFanatic&apos;s has you covered
            </p>
          </div>
        </div>

        <div className="carousel-wrapper relative left-1/2 w-screen -translate-x-1/2">
          <div className="carousel-track">
            {loopedServices.map((service, index) => (
              <ServiceCard key={`${service.name}-${index}`} service={service} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-4xl px-4 sm:px-8 md:hidden">
          <div className="rounded-3xl border border-sky-200 bg-sky-50 px-6 py-8 text-center shadow-lg shadow-sky-100/70 sm:px-8">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Download the app to book faster, track your service, and keep your
              next clean one tap away.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4">
              <button
                onClick={handleEarlyAccess}
                className="relative mx-auto inline-flex items-center justify-center rounded-lg bg-brand-dark px-6 py-2 text-center font-semibold text-white hover:bg-slate-900 transition-colors duration-200"
              >
                <span className="relative inline-block pr-1">
                  Get Early Access
                  <span className="pointer-events-none absolute -right-[0.55em] -top-3">
                    <TwinkleSparkle className="h-6 w-6" />
                  </span>
                </span>
              </button>
              <StoreBadges size="md" />
            </div>
          </div>
        </div>

        <style jsx>{`
          .carousel-wrapper {
            position: relative;
            overflow: visible;
            width: 100%;
          }

          .carousel-track {
            display: flex;
            align-items: stretch;
            gap: 14px;
            width: max-content;
            padding: 0 8px;
            animation: slideLeft 24s linear infinite;
          }

          .carousel-track:hover {
            animation-play-state: paused;
          }

          @keyframes slideLeft {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .carousel-track {
              animation: none !important;
            }
          }

          @media (min-width: 640px) {
            .carousel-track {
              gap: 24px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
