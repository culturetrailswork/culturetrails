import { Link } from "react-router-dom";

function TrailCard({ trail, index = 0 }) {
  const title = trail.title || trail.name || "Cultural Trail";

  const description =
    trail.excerpt ||
    trail.description ||
    trail.summary ||
    "Discover a different side of South India through a curated cultural journey.";

  const category =
    trail.category ||
    trail.type ||
    "CULTURAL JOURNEY";

  const location =
    trail.location ||
    trail.region ||
    trail.state ||
    "";

  const image =
    trail.image ||
    trail.coverImage ||
    "/images/1.png";

  return (
    <Link
      to={`/trails/${trail.slug}`}
      className={`trail-card trail-card-${index + 1}`}
    >

      <div className="trail-image">

        <img
          src={image}
          alt={title}
        />

        <div className="trail-image-overlay" />

        <span className="trail-card-index">
          0{index + 1}
        </span>

        <span className="trail-card-open">
          Explore trail ↗
        </span>

      </div>


      <div className="trail-content">

        <div className="trail-meta">

          <span>
            {category}
          </span>

          {location && (
            <span>
              {location}
            </span>
          )}

        </div>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

        <span className="trail-card-link">
          Follow this trail
          <span>→</span>
        </span>

      </div>

    </Link>
  );
}

export default TrailCard;