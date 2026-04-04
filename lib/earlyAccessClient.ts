type EarlyAccessResponse = {
  ok: boolean;
  message: string;
};

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
  const endpoint =
    process.env.NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT || "/early-access-proxy.php";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "early_access_request",
      name,
      phone,
      timestamp: getIstTimestamp(new Date()),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return {
      ok: false,
      message: text?.slice(0, 200) || "Submission failed. Please try again.",
    };
  }

  return { ok: true, message: "Request submitted successfully." };
}
