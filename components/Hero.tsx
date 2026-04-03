"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import StoreBadges from "./StoreBadges";

const words = ["TRUSTED", "QUICK", "HOUSE", "HELP", "IN", "MINUTES!"];
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
      <div className="pointer-events-none absolute z-[2] hidden items-start scale-x-[-1] lg:left-[-18%] lg:top-[24%] lg:flex lg:h-[600px] lg:w-[520px] xl:left-[-10%] xl:top-[23%] xl:h-[720px] xl:w-[640px] min-[1320px]:left-[-4.7%] min-[1320px]:top-[21.8%] min-[1320px]:h-[860px] min-[1320px]:w-[760px]" aria-hidden="true">
        <Image
          src="/right-image.png"
          alt="decoration left"
          fill
          className="object-contain object-left object-top"
        />
      </div>

      {/* Right side image */}
      <div className="pointer-events-none absolute z-[2] hidden items-start lg:right-[-18%] lg:top-[24%] lg:flex lg:h-[600px] lg:w-[520px] xl:right-[-10%] xl:top-[23%] xl:h-[720px] xl:w-[640px] min-[1320px]:right-[-4.7%] min-[1320px]:top-[21.8%] min-[1320px]:h-[860px] min-[1320px]:w-[760px]" aria-hidden="true">
        <Image
          src="/right-image.png"
          alt="decoration right"
          fill
          className="object-contain object-right object-top"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[42.7%] z-[1] h-[480px] rounded-b-[5rem] bg-[linear-gradient(to_bottom,rgba(217,226,255,0.28)_0%,rgba(67,102,192,0.62)_35%,rgba(18,26,56,0.92)_100%)] sm:rounded-b-[6rem]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-white/65 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[86vh] w-full max-w-5xl flex-col items-center px-4 pb-10 pt-4 text-center sm:px-8">
        <div className="max-w-3xl">
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
            Book verified professionals for a spotless home - all in just three
            taps.
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
            className="relative isolate z-[200] mt-10 flex justify-center lg:hidden"
          >
            <PhonePreview
              className="relative z-[210] h-[420px] w-[220px] min-[430px]:h-[460px] min-[430px]:w-[240px]"
              imageSrc={homeScreenSrc}
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative isolate z-[200] mt-14 hidden h-[580px] w-full max-w-[980px] items-end justify-center lg:flex"
        >
          <PhonePreview
            className="absolute bottom-8 left-[116px] z-[210]"
            rotateClass="-rotate-[10deg]"
            imageSrc={bookingScreenSrc}
          />
          <PhonePreview
            className="relative z-[220] h-[580px] w-[300px]"
            imageSrc={homeScreenSrc}
          />
          <PhonePreview
            className="absolute bottom-8 right-[116px] z-[210]"
            rotateClass="rotate-[10deg]"
            imageSrc={bookingSuccessScreenSrc}
          />
        </motion.div>
      </div>
    </section>
  );
}
