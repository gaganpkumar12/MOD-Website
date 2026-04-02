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
  const imageHeightClass = size === "sm" ? "h-10 sm:h-11" : "h-11 sm:h-14";
  const imageWidth = size === "sm" ? 152 : 180;
  const imageHeight = size === "sm" ? 44 : 56;

  const googleBadgeUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
  const appStoreBadgeUrl =
    "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";

  return (
    <div
      className={`flex ${stacked ? "flex-col" : "flex-wrap"} items-center justify-center gap-3 ${className}`}
    >
      <a
        href="#"
        className="inline-flex cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      >
        <Image
          src={googleBadgeUrl}
          alt="Get it on Google Play"
          width={imageWidth}
          height={imageHeight}
          unoptimized
          className={`${imageHeightClass} w-auto drop-shadow-2xl`}
        />
      </a>

      <a
        href="#"
        className="inline-flex cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      >
        <Image
          src={appStoreBadgeUrl}
          alt="Download on the App Store"
          width={imageWidth}
          height={imageHeight}
          unoptimized
          className={`${imageHeightClass} w-auto drop-shadow-2xl`}
        />
      </a>
    </div>
  );
}
