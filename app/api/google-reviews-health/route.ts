import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function fingerprint(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim() ?? "";
  const placeId = process.env.GOOGLE_PLACE_ID?.trim().replace(/^places\//, "") ?? "";

  if (!apiKey || !placeId) {
    return NextResponse.json({ configured: false }, { headers: { "Cache-Control": "no-store" } });
  }

  const fields = ["displayName", "rating", "userRatingCount", "googleMapsUri", "reviews"].join(",");
  const query = new URLSearchParams({ $fields: fields, languageCode: "ro", regionCode: "RO" });
  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?${query}`, {
    cache: "no-store",
    headers: { "X-Goog-Api-Key": apiKey }
  });

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // The status and content type below are enough to diagnose a non-JSON response.
  }

  const record = isRecord(payload) ? payload : {};
  const reviews = Array.isArray(record.reviews) ? record.reviews : [];
  const firstReview = isRecord(reviews[0]) ? reviews[0] : {};

  return NextResponse.json({
    configured: true,
    keyFingerprint: fingerprint(apiKey),
    placeFingerprint: fingerprint(placeId),
    googleStatus: response.status,
    contentType: response.headers.get("content-type"),
    payloadKeys: Object.keys(record),
    rawReviewCount: reviews.length,
    firstReviewKeys: Object.keys(firstReview),
    firstTextType: typeof firstReview.text,
    firstOriginalTextType: typeof firstReview.originalText,
    hasAuthorAttribution: isRecord(firstReview.authorAttribution)
  }, { headers: { "Cache-Control": "no-store" } });
}
