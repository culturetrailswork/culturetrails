import { useState } from "react";

const interests = [
  "Culture",
  "History",
  "Architecture",
  "Sculptures",
  "Food",
  "Craft",
  "People",
];

function EnquiryForm() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    destination: "",
    date: "",
    travellers: "",
    message: "",
  });

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // Handle interest selection
  // --------------------------------------------------

  const toggleInterest = (interest) => {
    setSelectedInterests((previous) =>
      previous.includes(interest)
        ? previous.filter((item) => item !== interest)
        : [...previous, interest]
    );
  };

  // --------------------------------------------------
  // Submit enquiry
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enquiries`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            destination: formData.destination,
            travelDate: formData.date,
            travellers: formData.travellers,
            interests: selectedInterests,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send your enquiry."
        );
      }

      // ----------------------------------------------
      // Email successfully sent
      // ----------------------------------------------

      setSubmitted(true);
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setError(
        error.message ||
          "Something went wrong while sending your enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Reset form
  // --------------------------------------------------

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      destination: "",
      date: "",
      travellers: "",
      message: "",
    });

    setSelectedInterests([]);

    setSubmitted(false);

    setError("");
  };

  // --------------------------------------------------
  // Success screen
  // --------------------------------------------------

  if (submitted) {
    return (
      <div className="enquiry-success">

        <div className="success-mark">
          ✓
        </div>

        <p className="section-label">
          ENQUIRY RECEIVED
        </p>

        <h2>
          Your trail starts
          <br />
          with a conversation.
        </h2>

        <p>
          Thank you for sharing what you have in mind.
          We'll take a look at your interests and
          the journey you're imagining.
        </p>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Plan another trail
        </button>

      </div>
    );
  }

  // --------------------------------------------------
  // Form
  // --------------------------------------------------

  return (
    <form
      className="enquiry-form"
      onSubmit={handleSubmit}
    >

      {/* =================================================
          CONTACT DETAILS
      ================================================= */}

      <div className="enquiry-row">

        {/* NAME */}

        <div className="form-field">

          <label htmlFor="name">
            <span>01</span>
            What's your name?
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

        </div>


        {/* EMAIL */}

        <div className="form-field">

          <label htmlFor="email">
            <span>02</span>
            Where can we reach you?
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

        </div>

      </div>


      {/* =================================================
          MOBILE
      ================================================= */}

      <div className="form-field">

        <label htmlFor="mobile">
          <span>03</span>
          What's your mobile number?
        </label>

        <input
          id="mobile"
          name="mobile"
          type="tel"
          placeholder="Your mobile number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

      </div>


      {/* =================================================
          DESTINATION + DATE
      ================================================= */}

      <div className="enquiry-row">

        {/* DESTINATION */}

        <div className="form-field">

          <label htmlFor="destination">
            <span>04</span>
            Where are you heading?
          </label>

          <select
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          >

            <option value="">
              Select a destination
            </option>

            <option value="Tamil Nadu">
              Tamil Nadu
            </option>

            <option value="Kerala">
              Kerala
            </option>

            <option value="Karnataka">
              Karnataka
            </option>

            <option value="Telangana">
              Telangana
            </option>

            <option value="Andhra Pradesh">
              Andhra Pradesh
            </option>

          </select>

        </div>


        {/* DATE */}

        <div className="form-field">

          <label htmlFor="date">
            <span>05</span>
            When do you want to go?
          </label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            required
          />

        </div>

      </div>


      {/* =================================================
          TRAVELLERS
      ================================================= */}

      <div className="form-field">

        <label htmlFor="travellers">
          <span>06</span>
          Who's coming along?
        </label>

        <input
          id="travellers"
          name="travellers"
          type="number"
          min="1"
          max="50"
          placeholder="Number of travellers"
          value={formData.travellers}
          onChange={handleChange}
          required
        />

      </div>


      {/* =================================================
          INTERESTS
      ================================================= */}

      <div className="form-field interests-field">

        <div className="form-field-label">
          <span>07</span>
          What are you curious about?
        </div>

        <div className="interest-options">

          {interests.map((interest) => {

            const isSelected =
              selectedInterests.includes(interest);

            return (

              <button
                key={interest}
                type="button"
                className={`interest-pill ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() =>
                  toggleInterest(interest)
                }
                aria-pressed={isSelected}
              >

                {interest}

                {isSelected && (
                  <span className="interest-check">
                    ✓
                  </span>
                )}

              </button>

            );
          })}

        </div>

      </div>


      {/* =================================================
          MESSAGE
      ================================================= */}

      <div className="form-field">

        <label htmlFor="message">
          <span>08</span>
          Tell us a little more
        </label>

        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Tell us about the kind of experience you're looking for..."
          value={formData.message}
          onChange={handleChange}
        />

      </div>


      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (

        <div
          className="form-error"
          role="alert"
        >
          {error}
        </div>

      )}


      {/* =================================================
          SUBMIT
      ================================================= */}

      <div className="form-submit">

        <p>
          No fixed itinerary yet?
          <br />
          That's perfectly fine.
        </p>

        <button
          type="submit"
          className="btn btn-primary form-submit-button"
          disabled={loading}
        >

          {loading ? (
            <>
              Sending...
            </>
          ) : (
            <>
              Start Your Trail
              <span>→</span>
            </>
          )}

        </button>

      </div>

    </form>
  );
}

export default EnquiryForm;