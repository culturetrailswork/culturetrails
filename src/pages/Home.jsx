import { Link } from "react-router-dom";

import SectionHeading from "../components/SectionHeading";
import DestinationCard from "../components/DestinationCard";
import TrailCard from "../components/TrailCard";
import StoryCard from "../components/StoryCard";

import { destinations } from "../data/destinations";
import { trails } from "../data/trails";
import { stories } from "../data/stories";

function Home() {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-image">
          <img
            src="/images/1.png"
            alt="South Indian temple architecture"
          />
        </div>

        <div className="hero-overlay" />

        <div className="container hero-content">

          <p className="section-label">
            CULTURE • STORIES • JOURNEYS
          </p>

          <h1>
            Travel beyond
            <br />
            the places.
          </h1>

          <p className="hero-description">
            Discover the culture, people, architecture,
            food and stories that make South India
            unforgettable.
          </p>

          <div className="hero-actions">

            <Link
              to="/destinations"
              className="btn btn-primary"
            >
              Explore Places →
            </Link>

            <Link
              to="/plan-your-trail"
              className="btn btn-outline hero-outline"
            >
              Plan Your Trail
            </Link>

          </div>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="section intro-section">

        <div className="container intro-grid">

          <div>
            <p className="section-label">
              ABOUT CULTURE TRAILS
            </p>

            <h2>
              There is more to a place
              than what you see.
            </h2>
          </div>

          <div className="intro-text">

            <p>
              Culture Trails takes you beyond
              conventional sightseeing.
            </p>

            <p>
              We create journeys around the stories,
              traditions, architecture, food, crafts
              and people that give a place its identity.
            </p>

            <Link
              to="/about"
              className="text-link"
            >
              Discover our approach →
            </Link>

          </div>

        </div>

      </section>


      {/* ================= DESTINATIONS ================= */}

      <section className="section destinations-section">

        <div className="container">

          <SectionHeading
            label="EXPLORE"
            title="Destinations with stories to tell."
            description="Explore South India through its landscapes, architecture, traditions and everyday culture."
          />

          <div className="destination-grid">

            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}

          </div>

        </div>

      </section>


      {/* ================= TRAILS ================= */}

      <section className="section trails-section">

        <div className="container">

          <SectionHeading
            label="CURATED JOURNEYS"
            title="Follow a trail, not a checklist."
            description="Thoughtfully designed cultural journeys that help you experience a place beyond the usual tourist route."
          />

          <div className="trail-grid">
            

            {trails.slice(0, 3).map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
              />
            ))}

          </div>

          <div className="section-link">
            <Link
              to="/trails"
              className="text-link"
            >
              Explore all trails →
            </Link>
          </div>

        </div>

      </section>


      {/* ================= STORIES ================= */}

      <section className="section stories-section">

        <div className="container">

          <SectionHeading
            label="STORIES"
            title="Look closer. There is always another story."
            description="Stories about the people, places, crafts, architecture and traditions that shape South India."
          />

          <div className="story-grid">

            {stories.slice(0, 3).map((story) => (
              <StoryCard
                key={story.id}
                story={story}
              />
            ))}

          </div>

          <div className="section-link">
            <Link
              to="/stories"
              className="text-link"
            >
              Read all stories →
            </Link>
          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <div className="container">

          <p className="section-label">
            YOUR JOURNEY STARTS HERE
          </p>

          <h2>
            Ready to discover
            <br />
            a different side of South India?
          </h2>

          <Link
            to="/plan-your-trail"
            className="btn btn-primary"
          >
            Plan Your Trail →
          </Link>

        </div>

      </section>

    </>
  );
}

export default Home;