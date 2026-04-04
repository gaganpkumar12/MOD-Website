import { NextResponse } from "next/server";

type EarlyAccessPayload = {
  action?: string;
  name?: string;
  phone?: string;
  timestamp?: string;
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

export async function POST(request: Request) {
  try {
    const webhookUrl =
      "https://flow.zoho.in/60023911678/flow/webhook/incoming?zapikey=1001.8ff20ea9300432da58d1ac4cabbca35a.030f5250808caaf75e0d8ac700d03685&isdebug=false";

    if (!webhookUrl) {
      return NextResponse.json(
        { message: "Webhook is not configured on the server." },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as EarlyAccessPayload;

    if (!payload?.name || !payload?.phone) {
      return NextResponse.json(
        { message: "Name and phone are required." },
        { status: 400 },
      );
    }

    const normalizedPayload = {
      ...payload,
      timestamp: getIstTimestamp(new Date()),
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(normalizedPayload),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      const webhookText = await webhookResponse.text();
      return NextResponse.json(
        {
          message: "Webhook request failed.",
          status: webhookResponse.status,
          details: webhookText.slice(0, 300),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Request submitted successfully." });
  } catch (error) {
    console.error("Early access API error:", error);
    return NextResponse.json(
      { message: "Unexpected server error while submitting request." },
      { status: 500 },
    );
  }
}
