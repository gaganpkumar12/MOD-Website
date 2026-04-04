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
  const imageHeightClass = size === "sm" ? "h-9 sm:h-11" : "h-9 sm:h-14";
  const imageWidth = size === "sm" ? 144 : 164;
  const imageHeight = size === "sm" ? 40 : 48;

  const googleBadgeUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
  const appStoreBadgeUrl =
    "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-lg font-semibold text-gray-600">Coming Soon</p>
      <div
        className={`flex ${stacked ? "flex-col" : "flex-nowrap"} items-center justify-center gap-2 sm:gap-3 ${className}`}
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
            className={`${imageHeightClass} w-auto drop-shadow-2xl grayscale opacity-60`}
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
            className={`${imageHeightClass} w-auto drop-shadow-2xl grayscale opacity-60`}
          />
        </a>
      </div>
    </div>
  );
}
