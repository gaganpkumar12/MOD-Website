"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import StoreBadges from "./StoreBadges";

const words = ["TRUSTED", "QUICK", "HOME", "HELP", "IN", "MINUTES!"];
const homeScreenSrc = "/home.jpeg";
const bookingScreenSrc = "/booking.jpeg";
const bookingSuccessScreenSrc = "/booking%20success.jpeg";

function PhonePreview({
  className = "",
  rotateClass = "",
  imageSrc,
}: {
  className?: string;
  rotateClass?: string;
  imageSrc: string;
}) {
  return (
    <div
      className={`relative h-[520px] w-[275px] rounded-[3rem] border-[3px] border-slate-300 bg-black p-[6px] shadow-2xl shadow-slate-800/25 ${rotateClass} ${className}`}
    >
      <div className="absolute left-1/2 top-[10px] z-20 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full overflow-hidden rounded-[2.55rem] bg-white">
        <div className="absolute inset-x-0 top-1 bottom-0">
          <Image
            src={imageSrc}
            alt="Clean Fanatics app screen"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-sky-50 to-white pt-24 sm:pt-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="pointer-events-none absolute inset-x-0 top-[160px] z-0 hidden justify-center lg:flex"
      >
        <div className="relative h-20 w-full max-w-3xl">
          <motion.div
            animate={{ x: [-200, 200, -200], opacity: [0, 0.85, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-6 h-10 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-sky-200/80 to-transparent blur-md"
          />
          <motion.div
            animate={{
              rotate: [0, 16, 0],
              scale: [0.9, 1.15, 0.9],
              opacity: [0.55, 1, 0.55],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[24%] top-2 text-sky-400"
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, -14, 0],
              scale: [0.8, 1.05, 0.8],
              opacity: [0.45, 0.9, 0.45],
            }}
            transition={{
              duration: 3.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute right-[24%] top-0 text-sky-300"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, -220]) }}
        className="pointer-events-none absolute right-4 top-48 h-64 w-64 rounded-full bg-cyan-100/70 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 1000], [0, 180]) }}
        className="pointer-events-none absolute bottom-10 right-1/3 h-60 w-60 rounded-full bg-blue-100/60 blur-3xl"
      />
      {/* Left side image (inverted) */}
      <div className="pointer-events-none absolute left-[-20%] top-[14.2%] z-30 flex h-[540px] w-[68%] items-start scale-x-[-1] lg:left-[-13%] lg:h-[860px] lg:w-[56%]">
        <Image
          src="/right-image.png"
          alt="decoration left"
          fill
          className="object-contain object-left object-top"
        />
      </div>

      {/* Right side image */}
      <div className="pointer-events-none absolute right-[-20%] top-[14.2%] z-30 flex h-[540px] w-[68%] items-start lg:right-[-13%] lg:h-[860px] lg:w-[56%]">
        <Image
          src="/right-image.png"
          alt="decoration right"
          fill
          className="object-contain object-right object-top"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[42.7%] h-[480px] rounded-b-[5rem] bg-[linear-gradient(to_bottom,rgba(217,226,255,0.28)_0%,rgba(67,102,192,0.62)_35%,rgba(18,26,56,0.92)_100%)] sm:rounded-b-[6rem]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/65 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[86vh] w-full max-w-5xl flex-col items-center px-4 pb-10 pt-4 text-center sm:px-8">
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/95 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Clean Fanatics - your home, spotless in a tap.
          </p>

          <h1 className="font-display text-5xl font-black uppercase leading-[0.94] tracking-[0.01em] text-brand-dark sm:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                className="mr-3 inline-block"
              >
                {word === "QUICK" ? (
                  <span className="italic text-sky-500">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.48,
            }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600"
          >
            Download the app and book verified professionals for spotless
            cleaning in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.62,
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <StoreBadges />
          </motion.div>

          <p className="mx-auto mt-8 max-w-lg text-xl font-medium text-slate-500">
            Trusted by 28,000+ customers with a 4.9⭐️ Google rating
          </p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.7,
            }}
            className="mt-10 flex justify-center lg:hidden"
          >
            <PhonePreview
              className="h-[460px] w-[240px]"
              imageSrc={homeScreenSrc}
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative mt-14 hidden h-[580px] w-full max-w-[980px] items-end justify-center lg:flex"
        >
          <PhonePreview
            className="absolute bottom-8 left-[116px] z-10"
            rotateClass="-rotate-[10deg]"
            imageSrc={bookingScreenSrc}
          />
          <PhonePreview
            className="relative z-20 h-[580px] w-[300px]"
            imageSrc={homeScreenSrc}
          />
          <PhonePreview
            className="absolute bottom-8 right-[116px] z-10"
            rotateClass="rotate-[10deg]"
            imageSrc={bookingSuccessScreenSrc}
          />
        </motion.div>
      </div>
    </section>
  );
}
