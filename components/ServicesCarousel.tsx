"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface ServiceItem {
  name: string;
  image: string;
}

const services: ServiceItem[] = [
  { name: "Window Cleaning", image: "/Window Cleaning CFH.png" },
  { name: "Bathroom Cleaning", image: "/Bathroom Cleaning CFH.png" },
  { name: "Kitchen Cleaning", image: "/Kitchen Cleaning CFH.png" },
  { name: "Dusting", image: "/Dusting CFH.png" },
  { name: "Dishwashing", image: "/Utensils CFH.png" },
  { name: "Floor mopping", image: "/Mopping CFH.png" },
  { name: "Laundry", image: "/Laundry CFH.png" },
  { name: "Sweeping", image: "/Sweeping CFH.png" },
];

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="w-[240px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-[0_14px_35px_rgba(15,27,45,0.14)] sm:w-[360px]">
      <div className="relative h-[210px] sm:h-[430px]">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-[74px] items-center justify-center bg-white px-4">
        <p className="text-center text-2xl font-black capitalize text-slate-900">
          {service.name}
        </p>
      </div>
    </article>
  );
}

export default function ServicesCarousel() {
  const loopedServices = useMemo(() => [...services, ...services], []);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            <Sparkles className="h-4 w-4" />
            Our Services
          </p>
          <h2 className="mt-4 font-display text-4xl font-black text-slate-900 sm:text-6xl">
            Book trusted cleaning help
          </h2>
          <p className="mt-3 text-lg font-semibold text-slate-500">
            From deep cleans to daily upkeep, CleanFanatics&apos;s got you covered
          </p>
        </div>
      </div>

      <div className="carousel-wrapper relative left-1/2 w-screen -translate-x-1/2">
        <div className="carousel-track">
          {loopedServices.map((service, index) => (
            <ServiceCard key={`${service.name}-${index}`} service={service} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-wrapper {
          position: relative;
          overflow: visible;
          width: 100%;
        }

        .carousel-track {
          display: flex;
          align-items: stretch;
          gap: 24px;
          width: max-content;
          padding: 0 8px;
          animation: slideLeft 24s linear infinite;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes slideLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
