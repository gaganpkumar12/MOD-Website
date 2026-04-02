import { BadgeCheck, Clock3, Headset, RefreshCw } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";

interface Benefit {
  title: string;
  description: string;
  icon: typeof BadgeCheck;
}

const benefits: Benefit[] = [
  {
    title: "Verified Professionals",
    description: "Background-checked, trained staff.",
    icon: BadgeCheck,
  },
  {
    title: "In Minutes",
    description: "Book and get help the same day.",
    icon: Clock3,
  },
  {
    title: "Flexible Plans",
    description: "One-time, weekly, or monthly.",
    icon: RefreshCw,
  },
  {
    title: "Real Support",
    description: "24/7 customer care, always responsive.",
    icon: Headset,
  },
];

export default function WhyCleanFanatics() {
  return (
    <section
      id="why-clean-fanatics"
      className="relative overflow-hidden bg-brand-dark py-16 text-sky-100 sm:py-24"
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
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-extrabold text-sky-100 sm:text-5xl">
            Why Clean Fanatics
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-sky-200 sm:text-base">
            Built for busy urban homes: verified professionals, instant slots,
            and support that actually responds.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal key={benefit.title} delay={index * 0.08}>
                <article className="group rounded-2xl border border-sky-100 bg-white p-6 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-sky-100">
                  <div className="inline-flex rounded-xl bg-sky-100 p-3 text-sky-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-brand-dark">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{benefit.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
