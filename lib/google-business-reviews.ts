import { siteConfig } from "@/lib/site-config";

export type GoogleBusinessReview = {
  author: string;
  authorUrl: string;
  avatarUrl: string;
  rating: number;
  reviewUrl: string;
  text: string;
  publishedLabel: string;
};

export type GoogleBusinessReviews = {
  name: string;
  rating: number;
  reviewCount: number;
  mapsUrl: string;
  reviews: GoogleBusinessReview[];
};

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function getLocalizedText(value: unknown) {
  if (typeof value === "string") return value.trim();
  return isRecord(value) ? getText(value.text) : "";
}

function getHttpsUrl(value: unknown, fallback: string) {
  const candidate = getText(value);
  return /^https:\/\//i.test(candidate) ? candidate : fallback;
}

function getGoogleAvatarUrl(value: unknown) {
  const candidate = getText(value);
  if (!candidate) return "";

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" && url.hostname === "lh3.googleusercontent.com" ? url.toString() : "";
  } catch {
    return "";
  }
}

function parseReview(value: unknown): GoogleBusinessReview | null {
  if (!isRecord(value)) return null;

  const textValue = getLocalizedText(value.originalText) || getLocalizedText(value.text);

  if (!textValue) return null;

  const attribution = isRecord(value.authorAttribution) ? value.authorAttribution : {};
  const author = getText(attribution.displayName);
  const authorUrl = getHttpsUrl(attribution.uri, siteConfig.googleBusiness.url);
  const avatarUrl = getGoogleAvatarUrl(attribution.photoUri);
  const reviewUrl = getHttpsUrl(value.googleMapsUri, siteConfig.googleBusiness.url);
  const rating = Math.max(1, Math.min(5, getNumber(value.rating)));

  // Google can omit a contributor avatar or a per-review profile URL while
  // still returning a public review. Keep the review and link to the public
  // business profile rather than discarding verified API content.
  if (!author) return null;

  return {
    author,
    authorUrl,
    avatarUrl,
    rating,
    reviewUrl,
    text: textValue,
    publishedLabel: getText(value.relativePublishTimeDescription)
  };
}

/**
 * Loads public profile data through the official Places API. The browser never
 * receives the API key, and the result is revalidated every five minutes.
 */
export async function getGoogleBusinessReviews(
  options: { cache?: "default" | "no-store" } = {}
): Promise<GoogleBusinessReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim().replace(/^places\//, "");

  if (!apiKey || !placeId) return null;

  try {
    const fields = ["displayName", "rating", "userRatingCount", "googleMapsUri", "reviews"].join(",");
    const query = new URLSearchParams({ $fields: fields, languageCode: "ro", regionCode: "RO" });
    const requestOptions: RequestInit & { next?: { revalidate: number; tags: string[] } } = {
      headers: {
        "X-Goog-Api-Key": apiKey
      }
    };

    if (options.cache === "no-store") {
      requestOptions.cache = "no-store";
    } else {
      requestOptions.next = { revalidate: 300, tags: ["google-business-reviews"] };
    }

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?${query}`,
      requestOptions
    );

    if (!response.ok) return null;

    const payload: unknown = await response.json();
    if (!isRecord(payload)) return null;

    const rating = getNumber(payload.rating);
    const reviewCount = getNumber(payload.userRatingCount);
    if (!rating || !reviewCount) return null;

    const displayName = isRecord(payload.displayName) ? getText(payload.displayName.text) : "";
    const rawReviews = Array.isArray(payload.reviews) ? payload.reviews : [];

    return {
      name: displayName || siteConfig.name,
      rating,
      reviewCount,
      mapsUrl: getHttpsUrl(payload.googleMapsUri, siteConfig.googleBusiness.url),
      reviews: rawReviews.map(parseReview).filter((review): review is GoogleBusinessReview => Boolean(review)).slice(0, 3)
    };
  } catch {
    return null;
  }
}
