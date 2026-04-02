"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const logoUrl =
  "https://cleanfanatics.com/wp-content/uploads/2023/03/logo-25.png";

const links = [
  { label: "Why Us", href: "#why-clean-fanatics" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQs", href: "#faq" },
];

const leftLinks = links.slice(0, 2);
const rightLinks = links.slice(2);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);

    const delta = latest - lastY.current;

    if (latest < 40) {
      setHidden(false);
    } else if (delta > 6) {
      setHidden(true);
    } else if (delta < -6) {
      setHidden(false);
    }

    lastY.current = latest;
  });

  return (
    <motion.header
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5 sm:py-4"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.96)"
            : "rgba(255,255,255,0.9)",
          borderColor: scrolled
            ? "rgba(194,214,238,0.95)"
            : "rgba(194,214,238,0.85)",
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex w-full max-w-3xl items-center justify-between overflow-hidden rounded-full border px-4 py-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-5 sm:py-3 md:px-7 md:py-3"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.88))]" />

        <div className="relative z-10 flex w-full items-center justify-between md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-dark transition hover:bg-slate-100"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="#" className="inline-flex items-center justify-center">
            <Image
              src={logoUrl}
              alt="Clean Fanatics logo"
              width={82}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </Link>

          <span className="h-11 w-11" aria-hidden="true" />
        </div>

        <div className="relative z-10 hidden w-full items-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-3">
          <div className="flex items-center justify-end gap-3 pr-3 lg:gap-6 lg:pr-5">
            {leftLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:text-slate-950 lg:px-3 lg:text-[17px]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <Link
            href="#"
            className="inline-flex items-center justify-center"
          >
            <Image
              src={logoUrl}
              alt="Clean Fanatics logo"
              width={150}
              height={52}
              className="h-12 w-auto object-contain md:h-14"
            />
          </Link>

          <div className="flex items-center justify-start gap-3 pl-3 lg:gap-6 lg:pl-5">
            {rightLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:text-slate-950 lg:px-3 lg:text-[17px]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-sky-100 bg-white/95 p-4 shadow-lg backdrop-blur"
          >
            <div className="flex flex-col gap-3">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-brand-text transition hover:bg-sky-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#download"
                className="rounded-xl bg-sky-500 px-4 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Download App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

  );
}
