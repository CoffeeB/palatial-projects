export default function ServiceCard({ title, imgSrc, index, description }) {
  return (
    <div className="card mb-3 border-0 border-bottom rounded-0">
      <div
        className="card-header hover-overlay border-0"
        id={`heading${index}`}
        data-bs-toggle="collapse"
        data-bs-target={`#collapse${index}`}
        aria-expanded="false"
        aria-controls={`collapse${index}`}
        style={{ cursor: "pointer" }}
        onMouseEnter={(e) => {
          const img = e.currentTarget.parentNode.querySelector(
            `.image-${index}`
          );
          if (img) img.style.opacity = 1;
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.parentNode.querySelector(
            `.image-${index}`
          );
          if (img) img.style.opacity = 0;
        }}
      >
        <h5 className="mb-0">{title}</h5>
      </div>
      {/* Image displayed above the collapsible content */}
      <div>
        <img
          src={imgSrc}
          alt={title}
          className={`img-fluid position-absolute avatar avatar-xl translate-middle image-${index}`}
          style={{
            top: 0,
            left: 0,
            borderRadius: "0.25rem",
            objectFit: "cover",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        />
      </div>
      <div
        id={`collapse${index}`}
        className="collapse"
        aria-labelledby={`heading${index}`}
        data-bs-parent="#servicesAccordion"
      >
        <div className="card-body">
          <div className="mt-3">{description}</div>
        </div>
      </div>
    </div>
  );
}
