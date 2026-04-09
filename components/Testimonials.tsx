"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import ScrollReveal from "./ui/ScrollReveal";

type Testimonial = {
  name: string;
  text: string;
};

const testimonials = [
  {
    "name": "Sindhu Herur",
    "text": "Very clean and efficient service."
  },
  {
    "name": "Darshan R",
    "text": "Nice and clean job done. 10 on 10. Very professional service and reliable. Very happy with Clean Fanatics service."
  },
  {
    "name": "Santosh Rout",
    "text": "Awesome experience with Clean Fanatics. Have been using them for 7-8 years and the experience has always been above par."
  },
  {
    "name": "Satya Om Narayan Swami",
    "text": "Best service by Clean Fanatics."
  },
  {
    "name": "Pradeep V Subramanian",
    "text": "Had a very good experience with Clean Fanatics. On time and very neat job, would highly recommend."
  },
  {
    "name": "Ganapathi Subramanian",
    "text": "We used the service of Clean Fanatics and it was very professional and thorough."
  },
  {
    "name": "Dr. Magesh Balakrishnan",
    "text": "Prompt and clean work."
  },
  {
    "name": "Kruthi Gowda",
    "text": "Good work, very clean service."
  },
  {
    "name": "Balakumar Velayudhan",
    "text": "Would recommend this place for sure. Genuine service making sure the windows are very clean."
  },
  {
    "name": "Bharathi Arun",
    "text": "Very clean work. Really recommend them."
  },
  {
    "name": "Shivam Arora",
    "text": "Clean and good service."
  },
  {
    "name": "Ashutosh Sengar",
    "text": "Nice and clean work. Great job guys."
  },
  {
    "name": "Ragha Sudha",
    "text": "Very efficient and clean services."
  },
  {
    "name": "Ramesh Seetharaman",
    "text": "Clean work."
  },
  {
    "name": "Anita Subbarasu",
    "text": "Value for money, clean work."
  },
  {
    "name": "Rajitha J",
    "text": "Professional service and clean work."
  },
  {
    "name": "Krishnan K K",
    "text": "Very neat and clean work."
  },
  {
    "name": "Viswak RK",
    "text": "Good work. Clean and tidy."
  },
  {
    "name": "Gowdamadhu",
    "text": "Good service and cleaning. Amazing job."
  },
  {
    "name": "Dr R Anupama",
    "text": "Very sincere service, clean and on time."
  },

  {
    "name": "Pradnyesh",
    "text": "Great work, my home was left spotless and fresh. The cleaning was thorough, and I appreciated the attention to detail. I'll recommend it."
  },
  {
    "name": "Ridhi Saluja",
    "text": "The services have definitely improved from the first time. Preferences are kept as top priority. Thank you for making our lives easier."
  },
  {
    "name": "Kirti",
    "text": "I'd say it was great value for money. The urgency was handled well, without compromising quality. Really satisfied with the experience."
  },
  {
    "name": "Karishma",
    "text": "Absolutely excellent service. The team was prompt and professional throughout. Would definitely use it again."
  },
  {
    "name": "Rabia",
    "text": "Really impressive compared to other platforms. The service was reliable and professional. Communication was clear and fast, very pleased."
  },
  {
    "name": "Ritika",
    "text": "Seamless experience from booking to completion. The staff was courteous, punctual, and did a fantastic job."
  },
  {
    "name": "Sameer",
    "text": "Really liked the service, smooth, efficient, and exactly what I needed. Would definitely recommend to others."
  },
  {
    "name": "Aarav",
    "text": "Booking was simple and the team arrived on time. Every corner was cleaned properly and the house smelled fresh afterward."
  },
  {
    "name": "Naina",
    "text": "Very polite professionals and great attention to detail. They listened to my requests and handled everything with care."
  },
  {
    "name": "Vikram",
    "text": "I needed urgent service and they still maintained quality. Scheduling support was helpful and the result was excellent."
  },
  {
    "name": "Megha",
    "text": "Super convenient from start to finish. Transparent pricing, smooth communication, and impressive final cleaning quality."
  },
  {
    "name": "Rohan",
    "text": "Reliable team with consistent service quality. I've booked multiple times and the experience has remained strong."
  },
  {
    "name": "Ishita",
    "text": "The staff was courteous and professional. They handled delicate items carefully and left the entire space spotless."
  },
  {
    "name": "Kunal",
    "text": "Great for busy schedules. On-time arrival, efficient process, and no compromise on cleanliness."
  },
  {
    "name": "Sanya",
    "text": "Excellent deep-clean service. The kitchen and bathrooms looked brand new and the team was very respectful."
  },
  {
    "name": "Dev",
    "text": "Fast response and smooth coordination. The cleaning was detailed and I could clearly see the difference immediately."
  },
  {
    "name": "Pooja",
    "text": "One of the best home services I've used. Clear updates, trained staff, and very satisfying outcomes."
  },
  {
    "name": "Ankit",
    "text": "Professional team and very organized execution. They came prepared and completed the job without delays."
  },
  {
    "name": "Tanya",
    "text": "Loved the overall experience. Easy booking, polite staff, and high-quality service from beginning to end."
  },
  {
    "name": "Harsh",
    "text": "Consistent quality every single time. I appreciate how responsive the support team is before and after service."
  }
];

function chunkTestimonials(items: Testimonial[]) {
  const topRowCount = 10;
  return {
    firstRow: items.slice(0, topRowCount),
    secondRow: items.slice(topRowCount),
  };
}

function initialsFromName(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="relative h-full w-[250px] shrink-0 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-[0_8px_24px_rgba(18,26,56,0.08)] sm:w-[320px] sm:p-5">
      <div className="absolute right-4 top-3 text-3xl font-black leading-none text-slate-300">
        &#8221;
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dbeafe] via-[#e9d5ff] to-[#c7d2fe] text-xs font-extrabold text-[#1f2a54] sm:h-14 sm:w-14 sm:text-sm">
          {initialsFromName(testimonial.name)}
        </div>
        <div className="pt-0.5">
          <h3 className="text-xl font-extrabold leading-none tracking-tight text-brand-dark sm:text-2xl">
            {testimonial.name}
          </h3>
          <div
            className="mt-0.5 flex -translate-y-0.5 items-center gap-1 text-lg leading-none text-amber-400 sm:mt-0 sm:-translate-y-1 sm:text-xl"
            aria-label="5 star rating"
          >
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
      </div>

      <p
        className="mt-4 pr-2 text-sm font-semibold leading-relaxed text-slate-700 sm:text-base sm:leading-relaxed"
        aria-label="testimonial content"
      >
        {testimonial.text}
      </p>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = "46s",
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration?: string;
}) {
  const duplicatedItems = [...items, ...items];
  const trackStyle = {
    ["--duration" as string]: duration,
    ["--marquee-shift" as string]: "-50%",
  } as CSSProperties;

  const fadeStyle = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  } as CSSProperties;

  return (
    <div className="marquee-container w-full" style={fadeStyle}>
      <div
        className={`marquee-track gap-4 sm:gap-6 ${reverse ? "reverse" : ""}`}
        style={trackStyle}
      >
        {duplicatedItems.map((item, index) => (
          <TestimonialCard key={`${item.name}-${index}`} testimonial={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { firstRow, secondRow } = chunkTestimonials(testimonials);

  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-extrabold text-brand-dark sm:text-5xl">
            What our users are saying
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Real stories from households across Bengaluru.
          </p>
        </ScrollReveal>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 w-full max-w-[1600px] px-0 sm:mt-10"
      >
        <div className="space-y-8 sm:space-y-14">
          <MarqueeRow items={firstRow} duration="52s" />
          <MarqueeRow items={secondRow} reverse duration="58s" />
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div className="elfsight-app-d1323706-7bd0-4e00-8e5a-15c444c737a1" data-elfsight-app-lazy></div>
        </div>
      </motion.div>
    </section>
  );
}
