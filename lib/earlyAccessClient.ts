type EarlyAccessResponse = {
  ok: boolean;
  message: string;
};

function detectDeviceType(): string {
  if (typeof navigator === "undefined") {
    return "Unknown";
  }

  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.platform || "").toLowerCase();
  const touchPoints = navigator.maxTouchPoints || 0;

  // iPadOS can report a desktop-like UA, so combine touch + platform hints.
  if (/ipad|tablet/.test(ua) || (platform.includes("mac") && touchPoints > 1)) {
    return "Tablet";
  }

  if (/android/.test(ua)) {
    return ua.includes("mobile") ? "Android" : "Tablet";
  }

  if (/iphone|ipod/.test(ua)) {
    return "iOS";
  }

  if (/mobile/.test(ua)) {
    return "Unknown";
  }

  return "PC";
}

function getIstTimestamp(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second} IST`;
}

export async function submitEarlyAccessRequest(
  name: string,
  phone: string,
): Promise<EarlyAccessResponse> {
  const detectedDevice = detectDeviceType();

  const endpoints =
    process.env.NODE_ENV === "development"
      ? ["/api/early-access", "http://localhost:3000/api/early-access"]
      : [
          "/early-access-proxy.php",
          "https://househelp.cleanfanatics.in/early-access-proxy.php",
        ];
  const payload = {
    action: "early_access_request",
    name,
    phone,
    Device: detectedDevice,
    device: detectedDevice,
    timestamp: getIstTimestamp(new Date()),
  };

  let response: Response | undefined;
  let lastErrorMessage = "";

  for (const endpoint of endpoints) {
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Retry with the absolute domain endpoint only if the relative path is unavailable.
      if (response.ok || !/^\//.test(endpoint)) {
        break;
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        continue;
      }
    } catch (error) {
      lastErrorMessage =
        error instanceof Error ? error.message : "Unknown network error";
    }
  }

  if (!response) {
    return {
      ok: false,
      message: `Network error while submitting. ${lastErrorMessage || "Please try again."}`,
    };
  }

  if (response.ok) {
    return { ok: true, message: "Request submitted successfully." };
  }

  let message = "Submission failed. Please try again.";
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = (await response.json()) as { message?: string };
    if (body?.message) {
      message = body.message;
    }
  } else {
    const text = await response.text();
    if (text) {
      const looksLikeHtml = /^\s*</.test(text);
      message = looksLikeHtml
        ? "Submission failed. Server endpoint is unavailable."
        : text.slice(0, 200);
    }
  }

  return { ok: false, message };
}
