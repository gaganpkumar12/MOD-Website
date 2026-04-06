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
  const endpoint = "/api/early-access";
  const payload = {
    action: "early_access_request",
    name,
    phone,
    timestamp: getIstTimestamp(new Date()),
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

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
      message = text.slice(0, 200);
    }
  }

  return { ok: false, message };
}
