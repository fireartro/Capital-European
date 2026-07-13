import { GoogleReviewsSectionClient } from "@/components/google-reviews-section-client";
import { getGoogleBusinessReviews } from "@/lib/google-business-reviews";

export async function GoogleReviewsSection({
  variant = "default"
}: {
  variant?: "default" | "split" | "compact";
}) {
  const initialData = await getGoogleBusinessReviews();

  return <GoogleReviewsSectionClient initialData={initialData} variant={variant} />;
}
