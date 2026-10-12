import { Link } from "react-router-dom";
import { destinations } from "../data/destinations";

function Destinations() {
  return (
    <main>
      {/* HERO */}
     <section className="destinations-hero">
  <div className="destinations-hero-image">
    <img
      src="/images/destinations/destinations-hero.jpg"
      alt="South Indian heritage architecture and landscape"
    />
  </div>

  <div className="destinations-hero-overlay"></div>

  <div className="container destinations-hero-content">

    <p className="section-label">
      DESTINATIONS
    </p>

    <h1>
      Places hold stories.
      <br />
      Go beyond the map.
    </h1>

    <p className="destinations-hero-description">
      Explore the temples, streets, crafts, landscapes
      and living traditions that shape South India.
    </p>

  </div>

  <span className="destinations-hero-number">
    01
  </span>
</section>

      {/* STATES */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">EXPLORE BY REGION</span>

            <h2>
              Five regions.
              <br />
              Countless stories.
            </h2>
          </div>

          <div className="destination-grid">
            {destinations.map((destination) => (
              <article
                className="destination-region-card"
                key={destination.id}
              >
                <Link
                  to={`/destinations/${destination.slug}`}
                  className="destination-region-image"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                  />
                </Link>

                <div className="destination-region-content">
                  <span className="section-label">
                    {destination.places.length} PLACES
                  </span>

                  <h3>{destination.name}</h3>

                  <p className="destination-tagline">
                    {destination.tagline}
                  </p>

                  <p>{destination.description}</p>

                  <Link
                    to={`/destinations/${destination.slug}`}
                    className="text-link"
                  >
                    Explore {destination.name}
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section destination-cta">
        <div className="container">
          <span className="section-label">
            BUILD YOUR JOURNEY
          </span>

          <h2>
            Don't just visit.
            <br />
            Follow a story.
          </h2>

          <p>
            Tell us what interests you, and we'll help shape a
            culture-focused trail around it.
          </p>

          <Link
            to="/plan-your-trail"
            className="button"
          >
            Plan Your Trail
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Destinations;