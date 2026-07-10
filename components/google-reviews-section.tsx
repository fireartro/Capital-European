import { ExternalLink, MessageCircleHeart, Star } from "lucide-react";
import Image from "next/image";
import { getGoogleBusinessReviews } from "@/lib/google-business-reviews";

function formatRating(value: number) {
  return new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
}

function reviewLabel(count: number) {
  return `${count} ${count === 1 ? "recenzie" : "recenzii"}`;
}

export async function GoogleReviewsSection() {
  const data = await getGoogleBusinessReviews();
  if (!data) return null;

  return (
    <section className="google-reviews-section" aria-labelledby="google-reviews-title">
      <div className="section-container google-reviews-layout">
        <header className="google-reviews-intro">
          <p className="eyebrow"><MessageCircleHeart aria-hidden="true" /> Recenzii Google</p>
          <h2 id="google-reviews-title">Feedback public, actualizat direct din profilul Google</h2>
          <p>Afișăm automat ratingul și recenziile disponibile public pentru {data.name}. Nu folosim testimoniale rescrise sau rezultate inventate.</p>
          <p className="google-reviews-disclosure">Google ordonează recenziile după relevanță și aplică <a href="https://support.google.com/contributionpolicy/answer/7422880" target="_blank" rel="noopener noreferrer">propria politică pentru conținutul publicat de utilizatori</a>.</p>
          <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" title="Vezi profilul Capital European pe Google">
            Vezi toate recenziile pe Google <ExternalLink aria-hidden="true" />
          </a>
        </header>

        <div className="google-reviews-content">
          <article className="google-rating-card" aria-label={`Evaluare Google: ${formatRating(data.rating)} din 5, din ${reviewLabel(data.reviewCount)}`}>
            <a className="google-maps-attribution" href={data.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Deschide profilul Capital European în Google Maps">
              <Image src="/images/google-maps-attribution.svg" alt="Google Maps" width={98} height={18} />
            </a>
            <strong>{formatRating(data.rating)}<small>/5</small></strong>
            <span className="google-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} fill="currentColor" />)}
            </span>
            <p>pe baza a {reviewLabel(data.reviewCount)}</p>
          </article>

          {data.reviews.length > 0 ? (
            <div className="google-review-grid">
              {data.reviews.map((review, index) => (
                <article className="google-review-card" key={`${review.author}-${index}`}>
                  <span className="google-stars google-review-stars" aria-label={`${review.rating} din 5 stele`}>
                    {Array.from({ length: 5 }, (_, starIndex) => <Star key={starIndex} fill={starIndex < review.rating ? "currentColor" : "none"} />)}
                  </span>
                  <blockquote>{review.text}</blockquote>
                  <footer>
                    <a className="google-review-author" href={review.authorUrl} target="_blank" rel="noopener noreferrer" title={`Vezi profilul Google al autorului ${review.author}`}>
                      <Image src={review.avatarUrl} alt="" width={40} height={40} />
                      <span>
                        <strong>{review.author}</strong>
                        {review.publishedLabel && <small>{review.publishedLabel}</small>}
                      </span>
                    </a>
                    <a className="google-review-source" href={review.reviewUrl} target="_blank" rel="noopener noreferrer" title="Vezi recenzia originală în Google Maps">Vezi recenzia în Google Maps <ExternalLink aria-hidden="true" /></a>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className="google-review-empty">
              <p>Vezi feedbackul public direct în profilul Google.</p>
              <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" title="Deschide recenziile Capital European pe Google">Deschide profilul Google <ExternalLink aria-hidden="true" /></a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
