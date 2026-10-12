import { Link, useSearchParams } from "react-router-dom";

import { stories } from "../data/stories";

function Stories() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const filteredStories = category
    ? stories.filter(
        (story) =>
          story.category?.toLowerCase() === category.toLowerCase()
      )
    : stories;

  return (
    <main>

      {/* =====================================================
          HERO
      ===================================================== */}

    <section className="stories-hero">
  <div className="stories-hero-image">
    <img
      src="/images/stories/stories-hero.jpg"
      alt="South Indian heritage architecture"
    />
  </div>

  <div className="stories-hero-overlay"></div>

  <div className="container stories-hero-content">
    <p className="section-label">
      STORIES
    </p>

    <h1>
      Look closer.
      <br />
      There is always
      <br />
      another story.
    </h1>

    <p className="stories-hero-description">
      Stories about the people, places, crafts,
      architecture and traditions that shape
      South India.
    </p>
  </div>

  <span className="stories-hero-number">
    01
  </span>
</section>
      {/* =====================================================
          STORIES
      ===================================================== */}

      <section className="section stories-main-section">

        <div className="container">

          {/* CATEGORY STATUS */}

          {category && (
            <div className="stories-filter-heading">

              <p className="section-label">
                STORIES IN
              </p>

              <h2>
                {category}
              </h2>

              <Link
                to="/stories"
                className="text-link"
              >
                View all stories →
              </Link>

            </div>
          )}


          <div className="story-grid">

            {filteredStories.length > 0 ? (

              filteredStories.map((story, index) => (

                <Link
                  key={story.id}
                  to={`/stories/${story.slug}`}
                  className={`story-card story-card-${index + 1}`}
                >

                  <div className="story-image">

                    <img
                      src={story.image}
                      alt={story.title}
                    />

                  </div>


                  <div className="story-content">

                    <p className="story-category">
                      {story.category}
                    </p>

                    <h3>
                      {story.title}
                    </h3>

                    <p>
                      {story.excerpt}
                    </p>

                    <span className="text-link">
                      Read story →
                    </span>

                  </div>

                </Link>

              ))

            ) : (

              <div className="stories-empty">

                <p className="section-label">
                  NO STORIES YET
                </p>

                <h2>
                  We're still gathering
                  <br />
                  this story.
                </h2>

                <p>
                  More stories from South India
                  are coming soon.
                </p>

                <Link
                  to="/stories"
                  className="btn btn-secondary"
                >
                  View all stories →
                </Link>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          EDITORIAL APPROACH
      ===================================================== */}

      <section className="section stories-editorial-section">

        <div className="container">

          <div className="stories-editorial-grid">

            <div>

              <p className="section-label">
                HOW WE LOOK
              </p>

              <h2>
                Every place
                <br />
                has another layer.
              </h2>

            </div>


            <div>

              <p>
                A temple can be architecture, history,
                sculpture and living tradition at the same
                time.
              </p>

              <p>
                A craft can reveal materials, techniques,
                livelihoods and generations of knowledge.
              </p>

              <p>
                Our stories begin with curiosity and make
                space for context, people and place.
              </p>

            </div>

          </div>

        </div>

      </section>


      


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="container">

          <p className="section-label">
            KEEP EXPLORING
          </p>

          <h2>
            Read a story.
            <br />
            Then follow it there.
          </h2>

          <Link
            to="/destinations"
            className="btn btn-primary"
          >
            Explore Destinations →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Stories;