import Image from "next/image";
import React, { useState } from "react";

const cards = [
  {
    id: 1,
    title: "4 UNITS OF 5 BEDROOM DUPLEX",
    year: "2023",
    location: "Arigidi, Bodija, Ibadan, Nigeria",
    images: [
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
    ],
  },
  {
    id: 2,
    title: "Luxury Apartments",
    year: "2022",
    location: "Lekki, Lagos, Nigeria",
    images: [
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
    ],
  },
  {
    id: 3,
    title: "Commercial Complex",
    year: "2021",
    location: "Victoria Island, Lagos, Nigeria",
    images: [
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
    ],
  },
  {
    id: 4,
    title: "Residential Estate",
    year: "2020",
    location: "Ikoyi, Lagos, Nigeria",
    images: [
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
      "/assets/img/Hero_Section_Image.jpg",
    ],
  },
];

const Portfolio = () => {
  return (
    <section className="p-lg-10 py-md-8 py-5 bg-black">
      <div className="row m-0 justify-content-center">
        <p className="bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto">
          <i className="bx bxs-circle fs-sm" />
          &nbsp; Portfolio
        </p>
        <p className="text-uppercase text-center fs-6">
          Our work speaks for itself
        </p>
      </div>

      <div className="py-6">
        <div className="row m-0">
          {cards.map((card) => (
            <div key={card.id} className="col-12 px-3">
              <section className="card rounded-0 border-0">
                <div className="card-body py-0">
                  {/* Title and Metadata */}
                  <div className="mb-3">
                    <p className="fs-5 mb-0 fw-bold">{card.title}</p>
                  </div>
                  {/* Carousel */}
                  <div
                    id={`carousel-${card.id}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {card.images.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <Image
                            width={500}
                            height={500}
                            src={image}
                            alt={`Image for ${card.title}`}
                            className="d-block w-100"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Carousel Controls */}
                    <div
                      className="carousel-control-prev d-md-none"
                      data-bs-target={`#carousel-${card.id}`}
                      data-bs-slide="prev"
                    >
                      <i
                        className="bx bx-chevron-left bg-black bg-opacity-75 p-3 text-white rounded-circle"
                        type="button"
                        aria-label="Previous"
                      />
                    </div>
                    <div
                      className="carousel-control-next d-md-none"
                      data-bs-target={`#carousel-${card.id}`}
                      data-bs-slide="next"
                    >
                      <i
                        className="bx bx-chevron-right bg-black bg-opacity-75 p-3 text-white rounded-circle"
                        type="button"
                        aria-label="Next"
                      />
                    </div>
                  </div>

                  {/* Footer with navigation chevrons */}
                  <div className="card-footer pt-2 px-0 border-0">
                    <div className="row align-items-center m-0 px-0 pb-2">
                      <span className="p-0 pe-2 border-0 border-end col-auto">
                        Year - {card.year}
                      </span>
                      <span className="py-0 px-2 col-lg-8 text-truncate">
                        Location - {card.location}
                      </span>
                      <div className="d-flex align-items-center ms-auto col-auto p-0">
                        <button
                          type="button"
                          className="px-2 bg-transparent border-0 border-end"
                          data-bs-target={`#carousel-${card.id}`}
                          data-bs-slide="prev"
                        >
                          <i className="bx bxs-chevron-left rounded-circle btn-outline-primary btn bg-white text-black" />
                        </button>
                        <button
                          type="button"
                          className="px-2 bg-transparent border-0"
                          data-bs-target={`#carousel-${card.id}`}
                          data-bs-slide="next"
                        >
                          <i className="bx bxs-chevron-right rounded-circle btn-outline-primary btn bg-white text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
