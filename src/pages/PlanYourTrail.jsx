import EnquiryForm from "../components/EnquiryForm";

function PlanYourTrail() {
  return (
    <div className="plan-page">

      {/* =====================================================
          HERO / INTRO
      ===================================================== */}
      <section className="plan-hero">
        <div className="container plan-hero-grid">

          <div className="plan-intro">
            <p className="section-label">
              PLAN YOUR TRAIL
            </p>

            <h1>
              Tell us how you
              <br />
              want to <em>travel.</em>
            </h1>

            <p className="plan-intro-text">
              Every journey begins with a little curiosity.
              Tell us what interests you, where you want to go,
              and how you would like to experience it.
            </p>

            <div className="plan-note">
              <span className="plan-note-line" />

              <p>
                We create journeys around places,
                people, stories, food, craft and culture —
                not just sightseeing.
              </p>
            </div>
          </div>


          {/* IMAGE */}
          <div className="plan-visual">
            <img
              src="/images/1.png"
              alt="South Indian cultural landscape"
            />

            <div className="plan-visual-caption">
              <span>01</span>
              <p>Begin with curiosity</p>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          ENQUIRY AREA
      ===================================================== */}
      <section className="plan-form-section">
        <div className="container">

          <div className="plan-form-heading">
            <div>
              <p className="section-label">
                YOUR JOURNEY
              </p>

              <h2>
                Let's shape your trail.
              </h2>
            </div>

            <p>
              A few details are all we need to understand
              the kind of experience you're looking for.
            </p>
          </div>


          <div className="plan-form-layout">

            {/* LEFT — WHAT HAPPENS NEXT */}
            <aside className="plan-process">

              <div className="process-intro">
                <span className="process-small">
                  WHAT HAPPENS NEXT
                </span>

                <p>
                  Your answers help us understand the
                  journey you have in mind.
                </p>
              </div>


              <div className="process-step">
                <span>01</span>

                <div>
                  <h3>
                    Tell us what interests you
                  </h3>

                  <p>
                    Share your destination, dates and
                    the things you would love to explore.
                  </p>
                </div>
              </div>


              <div className="process-step">
                <span>02</span>

                <div>
                  <h3>
                    We shape the experience
                  </h3>

                  <p>
                    We use your interests to understand
                    what kind of trail would suit you.
                  </p>
                </div>
              </div>


              <div className="process-step">
                <span>03</span>

                <div>
                  <h3>
                    You start your trail
                  </h3>

                  <p>
                    Once the details are discussed,
                    your journey begins.
                  </p>
                </div>
              </div>


              <div className="process-quote">
                <span>“</span>

                <p>
                  Travel slowly. Look closely.
                  Let a place tell you its story.
                </p>
              </div>

            </aside>


            {/* RIGHT — FORM */}
            <div className="plan-form-wrapper">
              <EnquiryForm />
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="plan-bottom">
        <div className="container">

          <p className="section-label">
            SOUTH INDIA AWAITS
          </p>

          <h2>
            Somewhere between
            <br />
            <em>here</em> and there is a story.
          </h2>

        </div>
      </section>

    </div>
  );
}

export default PlanYourTrail;