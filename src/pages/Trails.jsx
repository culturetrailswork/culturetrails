import { Link } from "react-router-dom";

import { trails } from "../data/trails";
import { customTrailCategories } from "../data/customTrails";

function Trails() {
  return (
    <main>

      {/* =====================================================
          HERO
      ===================================================== */}

     <section className="trails-hero">

  <div className="trails-hero-image">
    <img
      src="/images/trails/trails-hero.jpg"
      alt="Cultural heritage landscape of South India"
    />
  </div>

  <div className="trails-hero-overlay"></div>

  <div className="container trails-hero-content">

    <p className="section-label">
      CURATED JOURNEYS
    </p>

    <h1>
      Follow a trail,
      <br />
      not a checklist.
    </h1>

    <p className="trails-hero-description">
      Thoughtfully designed cultural journeys through
      the places, people, traditions and stories of
      South India.
    </p>

  </div>

  <span className="trails-hero-number">
    01
  </span>

</section>


      {/* =====================================================
          CURATED TRAILS
      ===================================================== */}

      <section className="section trails-curated-section">

        <div className="container">

          <div className="section-heading">

            <p className="section-label">
              CURATED JOURNEYS
            </p>

            <h2>
              Journeys built
              <br />
              around a story.
            </h2>

            <p>
              Explore journeys that bring together connected
              places, traditions, architecture, food and craft.
            </p>

          </div>


          <div className="trail-grid">

            {trails.map((trail) => (

              <Link
                key={trail.id}
                to={`/trails/${trail.slug}`}
                className="trail-card"
              >

                <div className="trail-image">

                  <img
                    src={trail.image}
                    alt={trail.title}
                  />

                </div>


                <div className="trail-content">

                  <div className="trail-meta">

                    <span>
                      {trail.destination}
                    </span>

                    <span>
                      {trail.duration}
                    </span>

                  </div>


                  <h3>
                    {trail.title}
                  </h3>


                  <p>
                    A culture-focused journey through
                    {trail.destination}.
                  </p>


                  <span className="text-link">
                    Explore trail →
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CUSTOM TRAILS
      ===================================================== */}

      <section className="section custom-trails-section">

        <div className="container">

          <div className="section-heading">

            <p className="section-label">
              CUSTOM TRAILS
            </p>

            <h2>
              Your interests.
              <br />
              Your way of travelling.
            </h2>

            <p>
              Choose a direction and shape a journey around
              the things you want to understand, experience
              and explore.
            </p>

          </div>


          <div className="custom-trail-grid">

            {customTrailCategories.map((category, index) => (

              <article
                key={category.id}
                className={`custom-trail-card custom-trail-card-${(index % 4) + 1}`}
              >

                <span className="custom-trail-number">
                  {String(index + 1).padStart(2, "0")}
                </span>


                <span className="section-label">
                  {category.shortLabel}
                </span>


                <h3>
                  {category.title}
                </h3>


                <p>
                  {category.description}
                </p>


                <Link
                  to="/plan-your-trail"
                  className="text-link"
                >
                  Build this trail →
                </Link>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ITINERARY
      ===================================================== */}

      <section className="section itinerary-preview-section">

        <div className="container">

          <div className="section-heading">

            <p className="section-label">
              HOW A TRAIL UNFOLDS
            </p>

            <h2>
              Leave room
              <br />
              for discovery.
            </h2>

            <p>
              Our itinerary framework gives each day a rhythm
              while leaving space to observe, connect and
              experience a place.
            </p>

          </div>


          <div className="itinerary-preview">

            <div>
              <span>01</span>
              <strong>Morning</strong>
              <p>
                Begin with a heritage site, temple street,
                market or landscape.
              </p>
            </div>

            <div>
              <span>02</span>
              <strong>Late morning</strong>
              <p>
                Look closer at architecture, museums,
                inscriptions, sculpture or craft.
              </p>
            </div>

            <div>
              <span>03</span>
              <strong>Lunch</strong>
              <p>
                Experience locally relevant food and its
                cultural context.
              </p>
            </div>

            <div>
              <span>04</span>
              <strong>Afternoon</strong>
              <p>
                Follow a craft cluster, heritage street,
                village, archive or secondary monument.
              </p>
            </div>

            <div>
              <span>05</span>
              <strong>Evening</strong>
              <p>
                Leave space for street life, performance,
                rivers, coast or landscape.
              </p>
            </div>

            <div>
              <span>06</span>
              <strong>Reflection</strong>
              <p>
                Connect what you saw to people, materials,
                memory and place.
              </p>
            </div>

          </div>


          

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section trails-bottom-cta">

        <div className="container">

          <p className="section-label">
            BUILD YOUR JOURNEY
          </p>

          <h2>
            Have a place
            <br />
            in mind?
          </h2>

          <p>
            Tell us what interests you and we can shape
            a culture-focused trail around it.
          </p>

          <Link
            to="/plan-your-trail"
            className="btn btn-primary"
          >
            Plan Your Trail →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Trails;