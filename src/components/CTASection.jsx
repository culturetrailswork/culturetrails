import { Link } from "react-router-dom";

function CTASection() {
  return (
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
  );
}

export default CTASection;