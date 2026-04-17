"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { type CSSProperties } from "react";
import ScrollReveal from "./ui/ScrollReveal";

type Testimonial = {
  name: string;
  text: string;
  gender?: "men" | "women";
  location?: string;
  rating?: number;
  photoPlaceholder?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sindhu Herur",
    text: "Very clean and efficient service.",
    gender: "women",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Darshan R",
    text: "Nice and clean job done. 10 on 10. Very professional service and reliable. Very happy with Clean Fanatics service.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Santosh Rout",
    text: "Awesome experience with Clean Fanatics. Have been using them for 7-8 years and the experience has always been above par.",
    gender: "men",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Satya Om Narayan Swami",
    text: "Best service by Clean Fanatics.",
    gender: "men",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Pradeep V Subramanian",
    text: "Had a very good experience with Clean Fanatics. On time and very neat job, would highly recommend.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Ganapathi Subramanian",
    text: "We used the service of Clean Fanatics and it was very professional and thorough.",
    gender: "men",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Dr. Magesh Balakrishnan",
    text: "Prompt and clean work.",
    gender: "men",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Kruthi Gowda",
    text: "Good work, very clean service.",
    gender: "women",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Balakumar Velayudhan",
    text: "Would recommend this place for sure. Genuine service making sure the windows are very clean.",
    gender: "men",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Bharathi Arun",
    text: "Very clean work. Really recommend them.",
    gender: "women",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Shivam Arora",
    text: "Clean and good service.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Ashutosh Sengar",
    text: "Nice and clean work. Great job guys.",
    gender: "men",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Ragha Sudha",
    text: "Very efficient and clean services.",
    gender: "women",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Ramesh Seetharaman",
    text: "Clean work.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Anita Subbarasu",
    text: "Value for money, clean work.",
    gender: "women",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Rajitha J",
    text: "Professional service and clean work.",
    gender: "women",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Krishnan K K",
    text: "Very neat and clean work.",
    gender: "men",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Viswak RK",
    text: "Good work. Clean and tidy.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Gowdamadhu",
    text: "Good service and cleaning. Amazing job.",
    gender: "men",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Dr R Anupama",
    text: "Very sincere service, clean and on time.",
    gender: "women",
    rating: 5,
    location: "Haralur",
  },

  {
    name: "Pradnyesh",
    text: "Great work, my home was left spotless and fresh. The cleaning was thorough, and I appreciated the attention to detail. I'll recommend it.",
    gender: "men",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Ridhi Saluja",
    text: "The services have definitely improved from the first time. Preferences are kept as top priority. Thank you for making our lives easier.",
    gender: "women",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Kirti",
    text: "I'd say it was great value for money. The urgency was handled well, without compromising quality. Really satisfied with the experience.",
    gender: "women",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Karishma",
    text: "Absolutely excellent service. The team was prompt and professional throughout. Would definitely use it again.",
    gender: "women",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Rabia",
    text: "Really impressive compared to other platforms. The service was reliable and professional. Communication was clear and fast, very pleased.",
    gender: "women",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Ritika",
    text: "Seamless experience from booking to completion. The staff was courteous, punctual, and did a fantastic job.",
    gender: "women",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Sameer",
    text: "Really liked the service, smooth, efficient, and exactly what I needed. Would definitely recommend to others.",
    gender: "men",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Aarav",
    text: "Booking was simple and the team arrived on time. Every corner was cleaned properly and the house smelled fresh afterward.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Naina",
    text: "Very polite professionals and great attention to detail. They listened to my requests and handled everything with care.",
    gender: "women",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Vikram",
    text: "I needed urgent service and they still maintained quality. Scheduling support was helpful and the result was excellent.",
    gender: "men",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Megha",
    text: "Super convenient from start to finish. Transparent pricing, smooth communication, and impressive final cleaning quality.",
    gender: "women",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Rohan",
    text: "Reliable team with consistent service quality. I've booked multiple times and the experience has remained strong.",
    gender: "men",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Ishita",
    text: "The staff was courteous and professional. They handled delicate items carefully and left the entire space spotless.",
    gender: "women",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Kunal",
    text: "Great for busy schedules. On-time arrival, efficient process, and no compromise on cleanliness.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Dev",
    text: "Fast response and smooth coordination. The cleaning was detailed and I could clearly see the difference immediately.",
    gender: "men",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Pooja",
    text: "One of the best home services I've used. Clear updates, trained staff, and very satisfying outcomes.",
    gender: "women",
    rating: 5,
    location: "Haralur",
  },
  {
    name: "Ankit",
    text: "Professional team and very organized execution. They came prepared and completed the job without delays.",
    gender: "men",
    rating: 5,
    location: "Bellandur",
  },
  {
    name: "Tanya",
    text: "Loved the overall experience. Easy booking, polite staff, and high-quality service from beginning to end.",
    gender: "women",
    rating: 5,
    location: "Koramangala",
  },
  {
    name: "Harsh",
    text: "Consistent quality every single time. I appreciate how responsive the support team is before and after service.",
    gender: "men",
    rating: 5,
    location: "Haralur",
  },
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

function placeholderPhotoFromName(name: string) {
  const initials = initialsFromName(name);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88' viewBox='0 0 88 88'><rect width='88' height='88' rx='44' fill='#ffffff'/><text x='50%' y='52%' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-size='28' font-weight='700' fill='#121a38'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getProfilePhotoSrc(testimonial: Testimonial) {
  if (testimonial.photoPlaceholder) {
    return testimonial.photoPlaceholder;
  }
  if (testimonial.gender === "women") {
    return "/women-placeholder.svg";
  }
  if (testimonial.gender === "men") {
    return "/men-placeholder.svg";
  }
  return placeholderPhotoFromName(testimonial.name);
}

function renderStars(rating: number) {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i}>{i < fullStars ? "★" : "☆"}</span>
  ));
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const rating = testimonial.rating ?? 5;
  const location = testimonial.location ?? "Bengaluru";
  const profilePhotoSrc = getProfilePhotoSrc(testimonial);
  const isWomenPlaceholder = profilePhotoSrc === "/women-placeholder.svg";

  return (
    <article className="relative flex h-[292px] w-[204px] shrink-0 flex-col rounded-[18px] border border-black bg-white p-3 shadow-none sm:h-[380px] sm:w-[320px] sm:p-5">
      <div
        className="text-[64px] font-extrabold leading-[0.58] text-[#2563eb] sm:text-[122px]"
        style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
        aria-hidden="true"
      >
        &#8221;
      </div>

      <div
        className="mt-1.5 flex items-center gap-1.5 text-sm leading-none text-[#ef4444] sm:mt-2 sm:gap-2 sm:text-[22px]"
        aria-label={`${rating.toFixed(1)} star rating`}
      >
        <span className="text-xs font-semibold text-[#121a38] sm:text-base">
          {rating.toFixed(1)}
        </span>
        {renderStars(rating)}
      </div>

      <p
        className="mt-3 flex-1 overflow-hidden text-[14px] leading-relaxed text-[#121a38] sm:mt-4 sm:text-[18px]"
        aria-label="testimonial content"
      >
        {testimonial.text}
      </p>

      <div className="mt-4 flex items-center gap-3 sm:mt-5 sm:gap-4">
        <Image
          src={profilePhotoSrc}
          alt={`${testimonial.name} placeholder`}
          width={56}
          height={56}
          className={`h-10 w-10 rounded-full border border-white bg-white object-cover sm:h-14 sm:w-14 ${isWomenPlaceholder ? "opacity-80" : "opacity-100"}`}
        />
        <div className="min-w-0">
          <h3 className="text-[22px] font-extrabold leading-tight tracking-tight text-[#0f172a] sm:text-2xl">
            {testimonial.name}
          </h3>
          <p className="mt-1 text-[11px] leading-none text-[#121a38] sm:text-base">
            {location}
          </p>
        </div>
      </div>
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

  const leftBlurFadeStyle = {
    background:
      "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 8%, rgba(255,255,255,0.82) 24%, rgba(255,255,255,0.52) 48%, rgba(255,255,255,0.18) 76%, rgba(255,255,255,0) 100%)",
  } as CSSProperties;

  const rightBlurFadeStyle = {
    background:
      "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 8%, rgba(255,255,255,0.82) 24%, rgba(255,255,255,0.52) 48%, rgba(255,255,255,0.18) 76%, rgba(255,255,255,0) 100%)",
  } as CSSProperties;

  return (
    <div className="marquee-container relative w-full overflow-hidden bg-white">
      <div
        className={`marquee-track gap-4 sm:gap-6 ${reverse ? "reverse" : ""}`}
        style={trackStyle}
      >
        {duplicatedItems.map((item, index) => (
          <TestimonialCard key={`${item.name}-${index}`} testimonial={item} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 -left-2 z-10 w-16 sm:-left-4 sm:w-28"
        style={leftBlurFadeStyle}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 -right-2 z-10 w-16 sm:-right-4 sm:w-28"
        style={rightBlurFadeStyle}
        aria-hidden="true"
      />
    </div>
  );
}

export default function Testimonials() {
  const { firstRow, secondRow } = chunkTestimonials(testimonials);

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-extrabold text-brand-dark sm:text-5xl">
            What our users are saying
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#121a38] sm:text-base">
            Real stories from households across Bengaluru.
          </p>
        </ScrollReveal>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-6 w-full max-w-[1600px] bg-white px-2 sm:mt-10 sm:px-0"
      >
        <div className="space-y-4 bg-white sm:space-y-6">
          <MarqueeRow items={firstRow} duration="55s" />
          <div className="hidden sm:block">
            <MarqueeRow items={secondRow} reverse duration="110s" />
          </div>
          <div className="mx-auto w-full max-w-[1500px] px-2 sm:px-4">
            <Script
              id="elfsight-platform-script"
              src="https://elfsightcdn.com/platform.js"
              strategy="afterInteractive"
            />
            <div className="origin-top transform scale-[1.08] sm:scale-[1.3]">
              <div
                className="elfsight-app-d1323706-7bd0-4e00-8e5a-15c444c737a1"
                data-elfsight-app-lazy
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
