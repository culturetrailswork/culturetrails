import { Link } from "react-router-dom";

function DestinationCard({ destination }) {

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="destination-card"
    >

      <img
        src={destination.image}
        alt={destination.name}
      />

      <div className="destination-overlay">

        <p>DESTINATION</p>

        <h3>
          {destination.name}
        </h3>

        <span>
          Explore →
        </span>

      </div>

    </Link>
  );
}

export default DestinationCard;