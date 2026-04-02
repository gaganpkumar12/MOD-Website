"use client";

import { motion } from "framer-motion";
import { Copyright } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StoreBadges from "./StoreBadges";

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [dockToFooter, setDockToFooter] = useState(false);
  const [travelProgress, setTravelProgress] = useState(0);
  const [floatingOpacity, setFloatingOpacity] = useState(0);

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
      const shouldDock = footerRect.top <= window.innerHeight - 180;

      const handoffProgressRaw =
        (fadeStart - servicesRect.bottom) / Math.max(1, fadeStart - hideAt);
      const handoffProgress = Math.max(0, Math.min(1, handoffProgressRaw));

      const travelStart = servicesTop + services.offsetHeight * 0.62;
      const travelEnd = servicesTop + services.offsetHeight + 280;
      const progressRaw =
        (window.scrollY - travelStart) / Math.max(1, travelEnd - travelStart);
      const progress = Math.max(0, Math.min(1, progressRaw));

      setShowCard(hasPassedServices);
      setDockToFooter(hasPassedServices && shouldDock);
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

  const downloadCard = (
    <div className="font-display w-fit rounded-3xl border border-white/55 bg-white/95 p-4 shadow-xl shadow-sky-950/30 backdrop-blur-sm sm:p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-sm">
        Download
      </p>
      <p className="text-3xl font-black text-sky-600">
        Clean Fantics
      </p>
      <StoreBadges className="mt-3" size="sm" stacked />
    </div>
  );

  return (
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

      {showCard && !dockToFooter ? (
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

      {showCard && dockToFooter ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.12 },
            duration: 0.22,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -top-6 left-4 z-50 hidden lg:block"
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
            2025 Clean Fantics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
