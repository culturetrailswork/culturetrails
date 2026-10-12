import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-grid">

        <div>

          <Link to="/" className="footer-logo">
            CULTURE
            <span>TRAILS</span>
          </Link>

          <p>
            Travel beyond the places.
            <br />
            Discover the stories.
          </p>

        </div>


        <div>

          <h4>Explore</h4>

          <Link to="/destinations">
            Destinations
          </Link>

          <Link to="/trails">
            Trails
          </Link>

          <Link to="/stories">
            Stories
          </Link>

          <Link to="/about">
            About
          </Link>

        </div>


        <div>

          <h4>Plan</h4>

          <Link to="/plan-your-trail">
            Plan Your Trail
          </Link>

          <Link to="/trails/custom">
            Custom Trails
          </Link>

        </div>


        <div>

          <h4>Connect</h4>

          <a href="https://www.instagram.com/culturetrails_official?stkn=MWFoZjI5encydW16Yw==">
            Instagram
          </a>

          <a href="mailto:culturetrails.work@gmail.com">
            Email
          </a>

        </div>

      </div>


      <div className="container footer-bottom">

        <p>
          © 2026 Culture Trails
        </p>

        <p>
          Travel. Discover. Understand.
        </p>

      </div>

    </footer>
  );
}

export default Footer;