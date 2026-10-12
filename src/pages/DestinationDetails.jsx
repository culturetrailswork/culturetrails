import { Link, useParams } from "react-router-dom";
import { destinations } from "../data/destinations";

function DestinationDetails() {
  const { stateSlug, placeSlug } = useParams();

  const state = destinations.find(
    (destination) => destination.slug === stateSlug
  );

  if (!state) {
    return (
      <main className="destination-not-found">
        <section className="section">
          <div className="container">
            <span className="section-label">DESTINATIONS</span>

            <h1>Destination not found</h1>

            <Link
              to="/destinations"
              className="text-link"
            >
              Back to destinations →
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* --------------------------------
     STATE PAGE
  -------------------------------- */

  if (!placeSlug) {
    return (
      <main className="destination-state-page">

        {/* HERO */}

        <section className="destination-state-hero">

          <div className="destination-state-hero-image">
            <img
              src={state.image}
              alt={state.name}
            />
          </div>

          <div className="destination-state-hero-overlay" />

          <div className="container destination-state-hero-content">

            <span className="section-label">
              DESTINATION
            </span>

            <h1>{state.name}</h1>

            <p>{state.tagline}</p>

          </div>

        </section>


        {/* INTRO */}

        <section className="section destination-intro">

          <div className="container destination-intro-grid">

            <div>

              <span className="section-label">
                {state.places.length} PLACES
              </span>

              <h2>
                Places where
                <br />
                culture lives.
              </h2>

            </div>

            <div>

              <p className="destination-large-copy">
                {state.description}
              </p>

              <p className="destination-small-copy">
                Explore the places, people, materials,
                architecture, food and traditions that shape
                this region.
              </p>

            </div>

          </div>

        </section>


        {/* PLACES */}

        <section className="section destination-places-section">

          <div className="container">

            <div className="section-heading">

              <span className="section-label">
                EXPLORE
              </span>

              <h2>
                Slow down.
                <br />
                Look closer.
              </h2>

            </div>


            <div className="destination-place-grid">

              {state.places.map((place, index) => (

                <article
                  className={`destination-place-card ${
                    index === 0
                      ? "destination-place-card-featured"
                      : ""
                  }`}
                  key={place.slug}
                >

                  <Link
                    to={`/destinations/${state.slug}/${place.slug}`}
                    className="destination-place-image"
                  >

                    <img
  src={place.heroImage || state.image}
  alt={place.name}
/>

                    <div className="destination-place-image-overlay" />

                    <span className="destination-place-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="destination-place-arrow">
                      →
                    </span>

                  </Link>


                  <div className="destination-place-content">

                    <span className="section-label">
                      {place.duration}
                    </span>

                    <h3>
                      {place.name}
                    </h3>

                    <p>
                      {place.hook}
                    </p>

                    <Link
                      to={`/destinations/${state.slug}/${place.slug}`}
                      className="text-link"
                    >
                      Explore place
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
              Tell us what interests you, and we'll help
              shape a culture-focused trail around it.
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


  /* --------------------------------
     PLACE PAGE
  -------------------------------- */

  const place = state.places.find(
    (item) => item.slug === placeSlug
  );


  if (!place) {
    return (
      <main className="destination-not-found">

        <section className="section">

          <div className="container">

            <span className="section-label">
              {state.name}
            </span>

            <h1>Place not found</h1>

            <Link
              to={`/destinations/${state.slug}`}
              className="text-link"
            >
              Back to {state.name} →
            </Link>

          </div>

        </section>

      </main>
    );
  }


  return (
    <main className="destination-detail-page">

      {/* --------------------------------
          HERO
      -------------------------------- */}

      <section className="destination-detail-hero">

        <div className="destination-detail-hero-image">

          <img
  src={place.heroImage || state.image}
  alt={place.name}
/>

        </div>

        <div className="destination-detail-hero-overlay" />


        <div className="container destination-detail-hero-content">

          <Link
            to={`/destinations/${state.slug}`}
            className="destination-back-link"
          >
            ← {state.name}
          </Link>

          <span className="section-label">
            CULTURAL DESTINATION
          </span>

          <h1>
            {place.name}
          </h1>

          <p>
            {place.hook}
          </p>

        </div>

      </section>


      {/* --------------------------------
          QUICK INFORMATION
      -------------------------------- */}

      <section className="destination-info-strip">

        <div className="container destination-info-grid">

          <div className="destination-info-item">

            <span className="section-label">
              STATE
            </span>

            <strong>
              {state.name}
            </strong>

          </div>


          <div className="destination-info-item">

            <span className="section-label">
              DISTRICT
            </span>

            <strong>
              {place.district}
            </strong>

          </div>


          <div className="destination-info-item">

            <span className="section-label">
              NEAREST CITY
            </span>

            <strong>
              {place.nearestCity}
            </strong>

          </div>


          <div className="destination-info-item">

            <span className="section-label">
              SUGGESTED STAY
            </span>

            <strong>
              {place.duration}
            </strong>

          </div>

        </div>

      </section>


      {/* --------------------------------
          WHY THIS PLACE MATTERS
      -------------------------------- */}

      <section className="section destination-story-section">

        <div className="container destination-two-column">

          <div>

            <span className="section-label">
              WHY THIS PLACE MATTERS
            </span>

            <h2>
              More than
              <br />
              a destination.
            </h2>

          </div>


          <div className="destination-points">

            {place.whyItMatters.map(
              (item, index) => (

                <div
                  className="destination-point"
                  key={item}
                >

                  <span className="destination-point-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {item}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* --------------------------------
    IMAGE GALLERY
-------------------------------- */}

{place.gallery?.length > 0 && (

  <section className="destination-gallery-section">

    <div className="container">

      <div className="destination-gallery-heading">

        <div>

          <span className="section-label">
            A GLIMPSE
          </span>

          <h2>
            See the place
            <br />
            before you arrive.
          </h2>

        </div>

        <p>
          Architecture, streets, craft and everyday
          details that make the destination distinct.
        </p>

      </div>


      <div className="destination-gallery">

        {place.gallery.map(
          (item, index) => (

            <div
              className={`destination-gallery-image destination-gallery-image-${index + 1}`}
              key={item.image}
            >

              <img
                src={item.image}
                alt={
                  item.caption ||
                  `${place.name} ${index + 1}`
                }
                loading="lazy"
              />

            </div>

          )
        )}

      </div>

    </div>

  </section>

)}


      {/* --------------------------------
          PLACES TO EXPLORE
      -------------------------------- */}

      <section className="section section-alt">

        <div className="container">

          <span className="section-label">
            PLACES TO EXPLORE
          </span>

          <h2>
            Look closer.
            <br />
            There's more here.
          </h2>


          <div className="explore-list">

            {place.placesToExplore.map(
              (item, index) => (

                <div
                  className="explore-list-item"
                  key={item}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {item}
                  </p>

                  <span className="explore-arrow">
                    ↗
                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* --------------------------------
          CULTURE STORIES
      -------------------------------- */}

      <section className="section destination-story-ideas">

        <div className="container">

          <div className="section-heading">

            <span className="section-label">
              CULTURE STORIES
            </span>

            <h2>
              Stories worth
              <br />
              telling.
            </h2>

          </div>


          <div className="story-idea-grid">

            {place.storyIdeas.map(
              (story, index) => (

                <article
                  className="story-idea-card"
                  key={story}
                >

                  <span className="story-idea-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="section-label">
                    STORY IDEA
                  </span>

                  <h3>
                    {story}
                  </h3>

                  <p>
                    A possible starting point for a
                    reel, carousel, interview,
                    photography story or article.
                  </p>

                </article>

              )
            )}

          </div>

        </div>

      </section>


      {/* --------------------------------
          FOOD & CRAFT
      -------------------------------- */}

      <section className="section section-alt">

        <div className="container destination-food-grid">

          <div>

            <span className="section-label">
              FOOD & CRAFT
            </span>

            <h2>
              Culture is also
              <br />
              what you taste
              <br />
              and make.
            </h2>

          </div>


          <div>

            <p className="large-copy">
              {place.foodAndCraft}
            </p>

          </div>

        </div>

      </section>


    

      

      {/* --------------------------------
          FINAL CTA
      -------------------------------- */}

      <section className="section destination-cta">

        <div className="container">

          <span className="section-label">
            PLAN YOUR TRAIL
          </span>

          <h2>
            Experience {place.name}
            <br />
            beyond the checklist.
          </h2>

          <p>
            Tell us what you want to discover and we'll
            help shape your journey around culture,
            people, places and stories.
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

export default DestinationDetails;