import Image from "next/image";

type StoreBadgesProps = {
  className?: string;
  size?: "sm" | "md";
  stacked?: boolean;
};

export default function StoreBadges({
  className = "",
  size = "md",
  stacked = false,
}: StoreBadgesProps) {
  const badgeSizeClass =
    size === "sm" ? "h-11 min-w-[160px] px-4" : "h-14 min-w-[202px] px-5";
  const iconClass = size === "sm" ? 22 : 28;
  const topTextClass = size === "sm" ? "text-[8px]" : "text-[9px]";
  const mainTextClass = size === "sm" ? "text-[1.6rem]" : "text-[1.95rem]";

  return (
    <div
      className={`flex ${stacked ? "flex-col" : "flex-wrap"} items-center gap-3 ${className}`}
    >
      <a
        href="#"
        className={`inline-flex ${badgeSizeClass} items-center gap-3 rounded-[12px] bg-black text-white shadow-lg shadow-black/25`}
      >
        <Image
          src="/google-play_3128279.png"
          alt="Google Play logo"
          width={iconClass}
          height={iconClass}
          className="h-auto w-auto shrink-0 object-contain"
        />
        <span className="flex flex-col leading-none">
          <span
            className={`${topTextClass} font-semibold uppercase tracking-[0.08em] text-white/90`}
          >
            Get it on
          </span>
          <span className={`${mainTextClass} font-semibold`}>Google Play</span>
        </span>
      </a>

      <a
        href="#"
        className={`inline-flex ${badgeSizeClass} items-center gap-3 rounded-[12px] bg-black text-white shadow-lg shadow-black/25`}
      >
        <Image
          src="/appstore_16566128.png"
          alt="App Store logo"
          width={iconClass}
          height={iconClass}
          className="h-auto w-auto shrink-0 object-contain"
        />
        <span className="flex flex-col leading-none">
          <span
            className={`${topTextClass} font-semibold tracking-[0.05em] text-white/90`}
          >
            Download on the
          </span>
          <span className={`${mainTextClass} font-semibold`}>App Store</span>
        </span>
      </a>
    </div>
  );
}
