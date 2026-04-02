"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import ScrollReveal from "./ui/ScrollReveal";

interface Step {
  title: string;
  description: string;
  details: string[];
  image: string;
}

const steps: Step[] = [
  {
    title: "Pick a Service",
    description:
      "Browse from 15+ home services and choose exactly what your home needs.",
    details: ["Select service", "Choose frequency", "Pick your slot"],
    image: "/step-1.png",
  },
  {
    title: "Add Details",
    description: "Schedule instantly or pick a time that works best for you.",
    details: ["Set date & time", "Add preferences", "Confirm details"],
    image: "/step-2.png",
  },
  {
    title: "Professional Arrives",
    description:
      "Verified pro shows up on time. Track booking live and relax at home.",
    details: ["Live tracking", "Professional assigned", "Work begins"],
    image: "/step-3.png",
  },
];

interface StepCardProps {
  step: Step;
  index: number;
  activeIndex: number;
}

function StepStackCard({ step, index, activeIndex }: StepCardProps) {
  const isVisible = activeIndex >= index;
  const isActive = activeIndex === index;
  const settleY = index * 14;

  return (
    <motion.article
      animate={{
        y: isVisible ? settleY : 180,
        opacity: isVisible ? (isActive ? 1 : 0.72) : 0,
        scale: isVisible ? (isActive ? 1 : 0.97) : 0.92,
        rotate: isVisible ? 0 : 4,
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: 20 + index }}
      className="absolute inset-x-0 top-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left: Mobile Mockup */}
        <div className="mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="rounded-[2rem] border-[6px] border-black bg-black p-0 shadow-2xl shadow-black/40">
            <div className="relative h-[360px] w-full overflow-hidden rounded-[1.6rem] bg-white">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center">
          <div>
            <span className="inline-flex rounded-full bg-sky-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
              Step {index + 1}
            </span>
            <h3 className="font-display mt-4 text-2xl font-black uppercase leading-tight text-brand-dark sm:text-3xl">
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base lg:max-w-lg">
              {step.description}
            </p>

            {/* Details List */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {step.details.map((detail) => (
                <div
                  key={detail}
                  className="rounded-xl border border-sky-100 bg-sky-50/50 px-4 py-3 text-xs font-semibold text-slate-700"
                >
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function HowItWorks() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.42) {
      setActiveIndex(0);
      return;
    }
    if (latest < 0.78) {
      setActiveIndex(1);
      return;
    }
    setActiveIndex(2);
  });

  return (
    <section
      id="how-it-works"
      className="relative bg-gradient-to-b from-white to-slate-50 py-10 sm:py-14"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <ScrollReveal className="lg:hidden">
          <h2 className="font-display text-center text-3xl font-black uppercase leading-[0.95] tracking-[0.01em] text-brand-dark sm:text-5xl">
            How Clean Fanatics{" "}
            <span className="italic text-sky-500">WORKS?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
            Three simple steps to a spotless home. As you scroll, each step card
            comes in and stacks on top.
          </p>
        </ScrollReveal>

        {/* Desktop: Isolated sticky scroll scene for proper card stacking */}
        <div ref={stackRef} className="relative mt-6 hidden h-[168vh] lg:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-start">
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-6 text-center">
                <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-[0.01em] text-brand-dark">
                  How Clean Fanatics{" "}
                  <span className="italic text-sky-500">WORKS?</span>
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                  Three simple steps to a spotless home. As you scroll, each
                  step card comes in and stacks on top.
                </p>
              </div>
              <div className="relative h-[560px]">
                {steps.map((step, index) => (
                  <StepStackCard
                    key={step.title}
                    step={step}
                    index={index}
                    activeIndex={activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Sequential cards */}
        <div className="mt-10 space-y-6 lg:hidden">
          {steps.map((step, index) => (
            <article
              key={`mobile-${step.title}`}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8"
            >
              <div className="mb-6 rounded-2xl border-[4px] border-black bg-black p-0 overflow-hidden">
                <div className="relative h-[280px] w-full bg-white">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <span className="inline-flex rounded-full bg-sky-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                Step {index + 1}
              </span>
              <h3 className="font-display mt-4 text-2xl font-black uppercase leading-tight text-brand-dark sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                {step.description}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {step.details.map((detail) => (
                  <div
                    key={`${step.title}-${detail}`}
                    className="rounded-xl border border-sky-100 bg-sky-50/50 px-4 py-3 text-xs font-semibold text-slate-700"
                  >
                    {detail}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
