function SectionHeading({ label, title, description }) {
  return (
    <div className="section-heading">

      {label && (
        <p className="section-label">
          {label}
        </p>
      )}

      <h2>{title}</h2>

      {description && (
        <p>{description}</p>
      )}

    </div>
  );
}

export default SectionHeading;