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

  const textValue = isRecord(value.originalText)
    ? getText(value.originalText.text)
    : isRecord(value.text)
      ? getText(value.text.text)
      : "";

  if (!textValue) return null;

  const attribution = isRecord(value.authorAttribution) ? value.authorAttribution : {};
  const author = getText(attribution.displayName);
  const authorUrl = getHttpsUrl(attribution.uri, "");
  const avatarUrl = getGoogleAvatarUrl(attribution.photoUri);
  const reviewUrl = getHttpsUrl(value.googleMapsUri, "");
  const rating = Math.max(1, Math.min(5, getNumber(value.rating)));

  if (!author || !authorUrl || !avatarUrl || !reviewUrl) return null;

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
 * receives the API key, and the result is cached for one hour.
 */
export async function getGoogleBusinessReviews(): Promise<GoogleBusinessReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim().replace(/^places\//, "");

  if (!apiKey || !placeId) return null;

  try {
    const query = new URLSearchParams({ languageCode: "ro", regionCode: "RO" });
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?${query}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "displayName",
          "rating",
          "userRatingCount",
          "googleMapsUri",
          "reviews.rating",
          "reviews.relativePublishTimeDescription",
          "reviews.originalText",
          "reviews.text",
          "reviews.googleMapsUri",
          "reviews.authorAttribution.displayName",
          "reviews.authorAttribution.uri",
          "reviews.authorAttribution.photoUri"
        ].join(",")
      },
      next: { revalidate: 3600, tags: ["google-business-reviews"] }
    });

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
