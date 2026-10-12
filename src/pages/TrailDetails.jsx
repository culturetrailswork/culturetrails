import { Link, useParams } from "react-router-dom";

import { trails } from "../data/trails";
import {
  itineraryFramework,
  itineraryVerificationNote,
} from "../data/itinerary";

function TrailDetails() {
  const { slug } = useParams();

  const trail = trails.find(
    (item) => item.slug === slug
  );

  if (!trail) {
    return (
      <main>

        <section className="section">

          <div className="container">

            <p className="section-label">
              TRAIL
            </p>

            <h1>
              Trail not found
            </h1>

            <Link
              to="/trails"
              className="text-link"
            >
              Back to trails →
            </Link>

          </div>

        </section>

      </main>
    );
  }


  return (
    <main>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="trail-detail-hero"
        style={{
          backgroundImage: `url(${trail.image})`,
        }}
      >

        <div className="trail-detail-overlay" />

        <div className="container trail-detail-content">

          <p className="section-label">
            {trail.destination}
          </p>

          <h1>
            {trail.title}
          </h1>

          <div className="trail-detail-meta">

            <span>
              {trail.duration}
            </span>

            <span>
              CULTURE-FOCUSED JOURNEY
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      <section className="section">

        <div className="container trail-overview">

          <div>

            <p className="section-label">
              THE JOURNEY
            </p>

            <h2>
              A trail built
              <br />
              around connection.
            </h2>

          </div>


          <div>

            <p className="trail-overview-intro">
              This journey brings together the cultural
              themes that define the trail.
            </p>

            <p>
              The route, timings, access and individual
              experiences should be confirmed before the
              journey is published or undertaken.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          HIGHLIGHTS
      ===================================================== */}

      <section className="section trail-highlights-section">

        <div className="container">

          <p className="section-label">
            WHAT TO LOOK FOR
          </p>

          <h2>
            The details that
            <br />
            shape the trail.
          </h2>


          <div className="trail-highlight-grid">

            {trail.highlights.map(
              (highlight, index) => (

                <div
                  className="trail-highlight"
                  key={highlight}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>
                    {highlight}
                  </h3>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          ITINERARY
      ===================================================== */}

     {/* =====================================================
    ITINERARY
===================================================== */}

<section className="section trail-itinerary-section">

  <div className="container">

    <div className="section-heading">

      <p className="section-label">
        ITINERARY FRAMEWORK
      </p>

      <h2>
        Let the day
        <br />
        unfold naturally.
      </h2>

      <p>
        The framework below provides a structure for
        culture-focused days. Exact timings and access
        details must be verified for each journey.
      </p>

    </div>


    <div className="trail-itinerary-timeline">

      {itineraryFramework.map((item, index) => (

        <article
          className={`trail-itinerary-step ${
            index % 2 === 0
              ? "timeline-left"
              : "timeline-right"
          }`}
          key={item.id}
        >

          <div className="trail-itinerary-marker">

            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

          </div>


          <div className="trail-itinerary-content">

            <span className="itinerary-time">
              {item.time}
            </span>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.description}
            </p>

          </div>

        </article>

      ))}

    </div>


    

  </div>

</section>


      {/* =====================================================
          HIGHLIGHT DETAILS
      ===================================================== */}

      <section className="section">

        <div className="container">

          <p className="section-label">
            TRAIL HIGHLIGHTS
          </p>

          <div className="trail-highlight-list">

            {trail.highlights.map(
              (highlight, index) => (

                <div
                  key={highlight}
                  className="trail-highlight-row"
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {highlight}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="container">

          <p className="section-label">
            CONTINUE THE JOURNEY
          </p>

          <h2>
            Want to shape
            <br />
            this trail differently?
          </h2>

          <p>
            Tell us your interests, pace and travel
            preferences and we'll understand what kind
            of cultural journey you're looking for.
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

export default TrailDetails;