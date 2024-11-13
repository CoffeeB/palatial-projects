import Image from "next/image";

export default function ServiceCard({ title, imgSrc, index, description }) {
  return (
    <div className="card mb-7 border-0 border-bottom rounded-0">
      <div
        className="card-header accordion-header accordion-button hover-overlay border-0 collapsed"
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
        <h5 className="mb-0 text-capitalize">{title}</h5>
      </div>
      {/* Image displayed above the collapsible content */}
      <div className=" position-absolute translate-middle-y end-0 z-2">
        <Image
          src={imgSrc}
          alt={title}
          width={1080}
          height={1080}
          className={`img-fluid image-${index}`}
          style={{
            borderRadius: "0.25rem",
            objectFit: "cover",
            opacity: 0,
            transition: "opacity 0.3s",
            width: "150px",
            height: "150px",
          }}
        />
      </div>
      <div
        id={`collapse${index}`}
        className="collapse"
        aria-labelledby={`heading${index}`}
        data-bs-parent="#servicesAccordion"
      >
        <div className="card-body pt-0">
          <div className="mt-3">{description}</div>
        </div>
      </div>
    </div>
  );
}
