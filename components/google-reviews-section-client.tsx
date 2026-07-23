import { MessageCircleHeart, Star } from "lucide-react";
import Image from "next/image";
import type { GoogleBusinessReview, GoogleBusinessReviews } from "@/lib/google-business-reviews";
import { siteConfig } from "@/lib/site-config";
import { TrackedAnchor } from "@/components/tracked-anchor";

function formatRating(value: number) {
  return new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}

function reviewLabel(count: number) {
  return `${count} ${count === 1 ? "recenzie" : "recenzii"}`;
}

type ReviewMarqueeItem =
  | { kind: "review"; review: GoogleBusinessReview }
  | { kind: "rating" };

function ReviewItem({ review, hidden = false }: { review: GoogleBusinessReview; hidden?: boolean }) {
  return (
    <article className="google-review-card" aria-hidden={hidden || undefined}>
      <span className="google-stars google-review-stars" role="img" aria-label={`${review.rating} din 5 stele`}>
        {Array.from({ length: 5 }, (_, starIndex) => <Star key={starIndex} fill={starIndex < review.rating ? "currentColor" : "none"} />)}
      </span>
      <blockquote>{review.text}</blockquote>
      <footer>
        <span className="google-review-author">
          {review.avatarUrl ? (
            <Image src={review.avatarUrl} alt="" width={36} height={36} />
          ) : (
            <span className="google-review-avatar-fallback" aria-hidden="true">{review.author.slice(0, 1).toUpperCase()}</span>
          )}
          <span>
            <strong>{review.author}</strong>
            {review.publishedLabel && <small>{review.publishedLabel}</small>}
          </span>
        </span>
      </footer>
    </article>
  );
}

function RatingItem({ rating, reviewCount, hidden = false }: { rating: number; reviewCount: number; hidden?: boolean }) {
  return (
    <article className="google-review-card google-rating-tile" aria-hidden={hidden || undefined}>
      <Image src="/images/google-maps-attribution.svg" alt="Google Maps" width={98} height={18} />
      <strong>{formatRating(rating)}<small>/5</small></strong>
      <span className="google-stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => <Star key={index} fill="currentColor" />)}
      </span>
      <p>{reviewLabel(reviewCount)} pe Google</p>
    </article>
  );
}

type GoogleReviewsSectionClientProps = {
  initialData: GoogleBusinessReviews | null;
  variant?: "default" | "split" | "compact";
};

export function GoogleReviewsSectionClient({ initialData, variant = "default" }: GoogleReviewsSectionClientProps) {
  const data = initialData;

  if (!data) {
    const fallbackClassName = variant === "split"
      ? "google-reviews-section google-reviews-section-split"
      : variant === "compact"
        ? "google-reviews-section google-reviews-section-compact"
        : "google-reviews-section";
    return (
      <section className={fallbackClassName} aria-labelledby="google-reviews-title">
        <div className="section-container google-review-live-fallback">
          <div className="google-review-fallback-copy">
            <p className="eyebrow"><MessageCircleHeart aria-hidden="true" /> Recenzii Google</p>
            <h2 id="google-reviews-title">Ce spun clienții</h2>
            <p>Recenziile verificate sunt disponibile direct în profilul nostru Google Business.</p>
          </div>
          <TrackedAnchor eventName="review_click" eventParameters={{ placement: variant }} href={siteConfig.googleBusiness.url} target="_blank" rel="noopener noreferrer" title="Vezi recenziile Capital European pe Google">
            Vezi toate recenziile pe Google
          </TrackedAnchor>
        </div>
      </section>
    );
  }

  if (variant === "compact") {
    const review = data.reviews[0];
    return (
      <section className="google-reviews-section google-reviews-section-compact" aria-label="Evaluări Capital European pe Google">
        <div className="section-container google-reviews-compact-layout">
          <div className="google-reviews-compact-rating">
            <Image src="/images/google-maps-attribution.svg" alt="Google Maps" width={98} height={18} />
            <strong>{formatRating(data.rating)} din 5</strong>
            <span>{reviewLabel(data.reviewCount)}</span>
          </div>
          {review && (
            <blockquote>
              <p>{review.text}</p>
              <cite>{review.author}</cite>
            </blockquote>
          )}
          <TrackedAnchor eventName="review_click" eventParameters={{ placement: "compact" }} href={data.mapsUrl} target="_blank" rel="noopener noreferrer">Vezi recenziile pe Google</TrackedAnchor>
        </div>
      </section>
    );
  }

  if (data.reviews.length === 0) {
    return (
      <section className={`google-reviews-section${variant === "split" ? " google-reviews-section-split" : ""}`} aria-labelledby="google-reviews-title">
        <div className="section-container google-reviews-layout">
          <header className="google-reviews-intro">
            <p className="eyebrow"><MessageCircleHeart aria-hidden="true" /> Recenzii Google</p>
            <h2 id="google-reviews-title">Ce spun clienții</h2>
          </header>
          <div className="google-reviews-rating-only">
            <RatingItem rating={data.rating} reviewCount={data.reviewCount} />
          </div>
          <TrackedAnchor eventName="review_click" eventParameters={{ placement: variant }} className="google-reviews-all-link" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">Citește recenzia pe Google</TrackedAnchor>
        </div>
      </section>
    );
  }

  const baseItems: ReviewMarqueeItem[] = [
    ...data.reviews.map((review) => ({ kind: "review" as const, review })),
    { kind: "rating" }
  ];
  const marqueeItems = Array.from({ length: Math.max(4, baseItems.length) }, (_, index) => ({
    item: baseItems[index % baseItems.length],
    repeated: index >= baseItems.length
  }));

  return (
    <section className={`google-reviews-section${variant === "split" ? " google-reviews-section-split" : ""}`} aria-labelledby="google-reviews-title">
      <div className="section-container google-reviews-layout">
        <header className="google-reviews-intro">
          <p className="eyebrow"><MessageCircleHeart aria-hidden="true" /> Recenzii Google</p>
          <h2 id="google-reviews-title">Ce spun clienții</h2>
        </header>

        <div className="google-reviews-marquee" role="group" aria-label={`Evaluare Google: ${formatRating(data.rating)} din 5, din ${reviewLabel(data.reviewCount)}`}>
          <div className="google-reviews-track">
            {[false, true].map((duplicate) => (
              <div className="google-reviews-group" aria-hidden={duplicate || undefined} key={duplicate ? "duplicate" : "source"}>
                {marqueeItems.map(({ item, repeated }, index) => item.kind === "review" ? (
                  <ReviewItem
                    review={item.review}
                    hidden={duplicate || repeated}
                    key={`${duplicate ? "duplicate" : "source"}-review-${index}`}
                  />
                ) : (
                  <RatingItem
                    rating={data.rating}
                    reviewCount={data.reviewCount}
                    hidden={duplicate || repeated}
                    key={`${duplicate ? "duplicate" : "source"}-rating-${index}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <TrackedAnchor eventName="review_click" eventParameters={{ placement: variant }} className="google-reviews-all-link" href={data.mapsUrl} target="_blank" rel="noopener noreferrer" title="Vezi toate recenziile Capital European pe Google">Vezi toate recenziile pe Google</TrackedAnchor>
      </div>
    </section>
  );
}
