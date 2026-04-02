"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarryState {
  x: number;
  y: number;
  scale: number;
  opacity: number;
}

export default function HeroServicesPhoneCarry() {
  const [carry, setCarry] = useState<CarryState>({
    x: 0,
    y: 0,
    scale: 0.96,
    opacity: 0,
  });

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      const services = document.getElementById("services");
      if (!hero || !services) return;

      const scrollY = window.scrollY;
      const heroTop = hero.getBoundingClientRect().top + scrollY;
      const heroHeight = hero.offsetHeight;
      const servicesTop = services.getBoundingClientRect().top + scrollY;
      const servicesHeight = services.offsetHeight;

      const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t;
      const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

      const startX =
        window.innerWidth < 640
          ? -window.innerWidth * 0.44
          : -window.innerWidth * 0.38;
      const centerX = 0;
      const stopY = window.innerWidth < 640 ? -76 : -92;

      const stage1Start = heroTop + heroHeight * 0.14;
      const stage1End = servicesTop + servicesHeight * 0.46;
      const stage1 = clamp01(
        (scrollY - stage1Start) / Math.max(1, stage1End - stage1Start),
      );

      const x = lerp(startX, centerX, stage1);
      const y = lerp(50, stopY, stage1);
      const scale = lerp(0.92, 1.06, stage1);

      const appearStart = heroTop + heroHeight * 0.12;
      const appearEnd = heroTop + heroHeight * 0.24;
      const opacity = clamp01(
        (scrollY - appearStart) / Math.max(1, appearEnd - appearStart),
      );

      setCarry({ x, y, scale, opacity });
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
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
      animate={{
        x: carry.x,
        y: carry.y,
        scale: carry.scale,
        opacity: carry.opacity,
      }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-[300px] w-[150px] rounded-[36px] border-[3px] border-slate-500/90 bg-black p-[6px] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:h-[560px] sm:w-[280px] sm:rounded-[56px] sm:p-[10px]">
        <div className="absolute left-1/2 top-[10px] z-20 h-5 w-16 -translate-x-1/2 rounded-full bg-black sm:top-[14px] sm:h-7 sm:w-24" />
        <div className="flex h-full w-full items-center justify-center rounded-[30px] bg-gradient-to-b from-sky-100 to-sky-200 sm:rounded-[46px]">
          <Image
            src="https://cleanfanatics.com/wp-content/uploads/2023/03/logo-25.png"
            alt="Clean Fanatics logo"
            width={72}
            height={72}
            className="drop-shadow-lg sm:h-[98px] sm:w-[98px]"
          />
        </div>
      </div>
    </motion.div>
  );
}
