"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import StoreBadges from "./StoreBadges";

interface Service {
  name: string;
  image: string;
  emoji: string;
}

const services: Service[] = [
  { name: "General Cleaning", image: "/househelp-right.png", emoji: "🧹" },
  { name: "Dishwashing", image: "/househelp-1.png", emoji: "🍽️" },
  { name: "Laundry", image: "/househelp-left.png", emoji: "🧺" },
  { name: "Fan Cleaning", image: "/househelp-right.png", emoji: "🌀" },
  { name: "Bathroom Cleaning", image: "/househelp-1.png", emoji: "🛁" },
];

function ServiceCard({
  name,
  image,
  emoji,
  index,
}: Service & { index: number }) {
  return (
    <article className="w-[128px] overflow-hidden rounded-3xl border border-white/70 bg-white shadow-lg shadow-sky-800/20 sm:w-[192px]">
      <div className="relative h-[104px] overflow-hidden sm:h-[150px]">
        <Image src={image} alt={name} fill className="object-cover" />
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.12,
          }}
          className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-sm shadow"
        >
          {emoji}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/12 via-transparent to-white/10" />
      </div>
      <p className="truncate px-2 py-3 text-center text-xs font-semibold text-brand-dark sm:px-3 sm:text-base">
        {name}
      </p>
    </article>
  );
}

export default function Services() {
  const track = useMemo(() => [...services, ...services, ...services], []);
  const marqueeDuration = 34;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showInlineDownload, setShowInlineDownload] = useState(true);
  const [inlineCardOpacity, setInlineCardOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.82, 1] : [0, 0.45, 1],
    isMobile ? [760, 0, -8] : [360, 0, -12],
  );
  const phoneScale = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.82, 1] : [0, 0.45, 1],
    isMobile ? [0.3, 1.3, 1.32] : [0.62, 1.04, 1.06],
  );

  const marqueeStyle = useMemo(
    () =>
      ({
        animationDuration: `${marqueeDuration}s`,
        ["--marquee-shift" as string]: "-33.3333%",
      }) as CSSProperties,
    [marqueeDuration],
  );

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const fadeStart = window.innerHeight * 0.84;
      const hideAt = window.innerHeight * 0.78;

      if (rect.bottom > fadeStart) {
        setShowInlineDownload(true);
        setInlineCardOpacity(1);
        return;
      }

      if (rect.bottom > hideAt) {
        setShowInlineDownload(true);
        const progress =
          (rect.bottom - hideAt) / Math.max(1, fadeStart - hideAt);
        setInlineCardOpacity(Math.max(0, Math.min(1, progress)));
        return;
      }

      setShowInlineDownload(false);
      setInlineCardOpacity(0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-sky-700 via-sky-600 to-cyan-600 py-20 text-white sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(224,247,255,0.26),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-[0.01em] text-white sm:text-5xl lg:text-6xl">
            Book trusted cleaning help
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-sky-100 sm:text-base">
            Pick a service and get instant slots. Fast, verified and always on
            time.
          </p>
        </div>

        <div className="relative left-1/2 mt-12 h-[820px] w-screen -translate-x-1/2 sm:h-[570px]">
          <div className="absolute inset-x-0 top-[48%] z-10 -translate-y-1/2 sm:top-1/2">
            <div className="marquee-container overflow-hidden">
              <div className="marquee-track" style={marqueeStyle}>
                {track.map((service, index) => (
                  <div
                    key={`${service.name}-${index}`}
                    className="mx-2.5 sm:mx-3.5"
                  >
                    <ServiceCard {...service} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            style={{ y: phoneY, scale: phoneScale }}
            className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-900/20 blur-xl" />
              <div className="w-[205px] rounded-[2.8rem] border-[7px] border-slate-800 bg-black p-0 shadow-xl shadow-sky-800/25 sm:w-[260px]">
                <div className="relative h-[360px] overflow-hidden rounded-[2.2rem] bg-white sm:h-[440px]">
                  <div className="absolute left-1/2 top-0 h-8 w-28 -translate-x-1/2 rounded-b-3xl bg-black sm:h-9 sm:w-36" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Image
                      src="https://cleanfanatics.com/wp-content/uploads/2023/03/logo-25.png"
                      alt="Clean Fanatics logo"
                      width={86}
                      height={86}
                      className="drop-shadow-xl"
                    />
                    <p className="font-display mt-5 text-5xl font-black text-sky-600">
                      Clean Fanatics
                    </p>
                    <p className="text-sm text-slate-500">
                      Spotless in Minutes
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {showInlineDownload ? (
            <div
              className="absolute -bottom-12 left-2 z-40 transition-opacity duration-150 sm:-bottom-8 sm:left-4"
              style={{ opacity: inlineCardOpacity }}
            >
              <div className="rounded-3xl border border-white/60 bg-white/95 p-4 shadow-xl shadow-sky-800/18 backdrop-blur-sm sm:p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-sm">
                  Download
                </p>
                <p className="text-3xl font-black text-sky-600">
                  Clean Fanatics
                </p>
                <StoreBadges className="mt-3" size="lg" stacked />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
