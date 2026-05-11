import Image from "next/image";

type StoreBadgesProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  stacked?: boolean;
};

export default function StoreBadges({
  className = "",
  size = "md",
  stacked = false,
}: StoreBadgesProps) {
  const imageHeightClass =
    size === "sm"
      ? "h-9 sm:h-11"
      : size === "lg"
        ? "h-11 sm:h-16"
        : "h-9 sm:h-14";
  const imageWidth = size === "sm" ? 144 : size === "lg" ? 196 : 164;
  const imageHeight = size === "sm" ? 40 : size === "lg" ? 60 : 48;

  const googleBadgeUrl =
    "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";
  const appStoreBadgeUrl =
    "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";
  const googlePlayLink =
    "https://play.google.com/store/apps/details?id=com.cleanfanatics&pcampaignid=web_share";
  const appStoreLink =
    "https://apps.apple.com/in/app/clean-fanatics/id6761458747";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`flex ${stacked ? "flex-col" : "flex-nowrap"} items-center justify-center gap-2 sm:gap-3 ${className}`}
      >
        <a
          href={googlePlayLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Google Play Store"
          className="inline-flex transition-transform duration-200 hover:scale-[1.02]"
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
          href={appStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Apple App Store"
          className="inline-flex transition-transform duration-200 hover:scale-[1.02]"
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
    </div>
  );
}
