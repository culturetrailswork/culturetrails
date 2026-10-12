import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((previous) =>
      previous === section ? null : section
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSection(null);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link
          to="/"
          className="brand-logo"
          onClick={closeMenu}
        >
          <img
            src="/images/culture-trails-logo.jpeg"
            alt="Culture Trails"
          />
        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="desktop-nav">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>


          {/* DESTINATIONS */}

          <div className="nav-dropdown">

            <button className="nav-dropdown-trigger">
              Destinations
              <ChevronDown size={14} />
            </button>

            <div className="nav-dropdown-menu">

              <Link to="/destinations/tamil-nadu">
                Tamil Nadu
              </Link>

              <Link to="/destinations/kerala">
                Kerala
              </Link>

              <Link to="/destinations/karnataka">
                Karnataka
              </Link>

              <Link to="/destinations/telangana">
                Telangana
              </Link>

              <Link to="/destinations/andhra-pradesh">
                Andhra Pradesh
              </Link>

            </div>

          </div>


          {/* TRAILS */}

          <div className="nav-dropdown">

            <button className="nav-dropdown-trigger">
              Trails
              <ChevronDown size={14} />
            </button>

            <div className="nav-dropdown-menu">

              <Link to="/trails">
                All Trails
              </Link>

              <Link to="/plan-your-trail">
                Custom Trails
              </Link>

            </div>

          </div>

{/* STORIES */}

<Link to="/stories" className="nav-link">
  Stories
</Link>

        </nav>

        {/* =================================================
            DESKTOP CTA
        ================================================= */}

        <Link
          to="/plan-your-trail"
          className="nav-cta"
        >
          Plan Your Trail
        </Link>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className="mobile-menu"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={
            menuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>


      {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

      <div
        className={`mobile-nav ${
          menuOpen ? "mobile-nav-open" : ""
        }`}
      >

        <nav className="mobile-nav-inner">

          {/* HOME */}

          <Link
            to="/"
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            Home
          </Link>


          {/* ABOUT */}

          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={closeMenu}
          >
            About
          </Link>


          {/* DESTINATIONS */}

          <div className="mobile-nav-group">

            <button
              type="button"
              className="mobile-nav-parent"
              onClick={() =>
                toggleSection("destinations")
              }
              aria-expanded={
                openSection === "destinations"
              }
            >
              <span>Destinations</span>

              <ChevronDown
                size={17}
                className={
                  openSection === "destinations"
                    ? "mobile-chevron-open"
                    : ""
                }
              />
            </button>

            <div
              className={`mobile-submenu ${
                openSection === "destinations"
                  ? "mobile-submenu-open"
                  : ""
              }`}
            >
              <Link
                to="/destinations/tamil-nadu"
                onClick={closeMenu}
              >
                Tamil Nadu
              </Link>

              <Link
                to="/destinations/kerala"
                onClick={closeMenu}
              >
                Kerala
              </Link>

              <Link
                to="/destinations/karnataka"
                onClick={closeMenu}
              >
                Karnataka
              </Link>

              <Link
                to="/destinations/other-south-india"
                onClick={closeMenu}
              >
                Other Places
              </Link>
            </div>

          </div>


          {/* TRAILS */}

          <div className="mobile-nav-group">

            <button
              type="button"
              className="mobile-nav-parent"
              onClick={() =>
                toggleSection("trails")
              }
              aria-expanded={
                openSection === "trails"
              }
            >
              <span>Trails</span>

              <ChevronDown
                size={17}
                className={
                  openSection === "trails"
                    ? "mobile-chevron-open"
                    : ""
                }
              />
            </button>

            <div
              className={`mobile-submenu ${
                openSection === "trails"
                  ? "mobile-submenu-open"
                  : ""
              }`}
            >
              <Link
                to="/trails"
                onClick={closeMenu}
              >
                All Trails
              </Link>

              <Link
                to="/plan-your-trail"
                onClick={closeMenu}
              >
                Custom Trails
              </Link>
            </div>

          </div>


          {/* STORIES */}

          <Link
  to="/stories"
  className="mobile-nav-link"
  onClick={() => setMenuOpen(false)}
>
  Stories
</Link>


          {/* MOBILE CTA */}

          <Link
            to="/plan-your-trail"
            className="mobile-nav-cta"
            onClick={closeMenu}
          >
            Plan Your Trail
            <span>→</span>
          </Link>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;