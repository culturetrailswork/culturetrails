import { Link, useParams } from "react-router-dom";

import { stories } from "../data/stories";

function StoryDetails() {
  const { slug } = useParams();

  const story = stories.find(
    (item) => item.slug === slug
  );

  // =====================================================
  // STORY NOT FOUND
  // =====================================================

  if (!story) {
    return (
      <main>
        <section className="section">
          <div className="container">

            <p className="section-label">
              STORIES
            </p>

            <h1>
              Story not found
            </h1>

            <Link
              to="/stories"
              className="text-link"
            >
              Back to stories →
            </Link>

          </div>
        </section>
      </main>
    );
  }

  const content = story.content;

  return (
    <main className="story-detail-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="story-detail-hero">

        <div className="story-detail-hero-image">

          <img
            src={story.image}
            alt={story.title}
          />

        </div>

        <div className="story-detail-overlay" />

        <div className="container story-detail-content">

          <p className="section-label">
            {story.category}
          </p>

          <h1>
            {story.title}
          </h1>

          {story.readTime && (
            <p className="story-detail-read-time">
              {story.readTime}
            </p>
          )}

        </div>

        <span className="story-detail-hero-number">
          01
        </span>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="section story-detail-intro">

        <div className="container">

          <div className="story-detail-intro-grid">

            <div className="story-detail-intro-label">

              <p className="section-label">
                THE STORY
              </p>

            </div>


            <div className="story-detail-intro-content">

              <p className="story-lead">
                {story.excerpt}
              </p>


              {content?.intro?.map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STORY SECTIONS
      ===================================================== */}

      {content?.sections?.map(
        (section, index) => {

          const sectionNumber = String(
            index + 1
          ).padStart(2, "0");

          return (
            <section
              className={`section story-content-section ${
                index % 2 === 1
                  ? "story-content-section-alt"
                  : ""
              }`}
              key={index}
            >

              <div className="container">

                <div className="story-content-grid">

                  {/* LEFT / LABEL */}

                  <div className="story-content-meta">

                    <span className="story-section-number">
                      {sectionNumber}
                    </span>

                    <p className="section-label">
                      STORY
                    </p>

                  </div>


                  {/* RIGHT / CONTENT */}

                  <div className="story-content-main">

                    <h2>
                      {section.title}
                    </h2>


                    {section.paragraphs?.map(
                      (paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>
                          {paragraph}
                        </p>
                      )
                    )}


                    {/* SECTION IMAGE */}

                    {section.image && (
                      <figure className="story-content-image">

                        <img
                          src={section.image}
                          alt={section.title}
                        />

                      </figure>
                    )}

                  </div>

                </div>

              </div>

            </section>
          );
        }
      )}


      {/* =====================================================
          PULL QUOTE
      ===================================================== */}

      {content?.quote && (
        <section className="story-pullquote">

          <div className="container">

            <blockquote>
              “{content.quote}”
            </blockquote>

          </div>

        </section>
      )}


      {/* =====================================================
          CLOSING
      ===================================================== */}

      {content?.closing && (
        <section className="section story-closing">

          <div className="container">

            <div className="story-closing-grid">

              <div>

                <p className="section-label">
                  LOOK CLOSER
                </p>

                <h2>
                  There is always
                  <br />
                  another layer.
                </h2>

              </div>


              <div className="story-closing-content">

                {content.closing.map(
                  (paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )}

              </div>

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          FINAL QUOTE
      ===================================================== */}

      {content?.finalQuote && (
        <section className="story-final-quote">

          <div className="container">

            <p>
              {content.finalQuote}
            </p>

          </div>

        </section>
      )}


      {/* =====================================================
          RELATED STORIES
      ===================================================== */}

      <section className="section stories-related">

        <div className="container">

          <p className="section-label">
            KEEP READING
          </p>

          <h2>
            More stories
            <br />
            to explore.
          </h2>


          <div className="story-grid">

            {stories
              .filter(
                (item) => item.id !== story.id
              )
              .map((item) => (

                <Link
                  key={item.id}
                  to={`/stories/${item.slug}`}
                  className="story-card"
                >

                  <div className="story-image">

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                  </div>


                  <div className="story-content">

                    <p className="story-category">
                      {item.category}
                    </p>

                    <h3>
                      {item.title}
                    </h3>

                    <span className="text-link">
                      Read story →
                    </span>

                  </div>

                </Link>

              ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="container">

          <p className="section-label">
            EXPLORE THE PLACE
          </p>

          <h2>
            Stories are only
            <br />
            the beginning.
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

export default StoryDetails;