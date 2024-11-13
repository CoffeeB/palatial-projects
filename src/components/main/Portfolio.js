import Image from "next/image";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Portfolio = () => {
  const [cards, setCards] = useState([]);

  const [stopFetch, setStopFetch] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Fetch portfolio data from the API
  useEffect(() => {
    if (cards.length > 0 || stopFetch) return;
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        if (result?.success) {
          setCards(result?.data);
          setStopFetch(true);
        } else {
          enqueueSnackbar(result?.message || "Failed to fetch services", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Failed to fetch services. Please try again.", {
          variant: "error",
        });
        console.error("Failed to fetch services:- ", error);
      }
    };

    fetchPortfolioData();
  }, [cards, stopFetch]);

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the section is in view
  });

  return (
    <section
      className={`p-lg-10 py-md-8 py-5 bg-black ${
        inView ? "animate-fadeInUp" : ""
      }`}
    >
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
          {cards?.length === 0 ? (
            <>
              <p className="mb-0 text-center text-white-50 fs-4">
                Nothing to show here yet
              </p>
            </>
          ) : (
            cards.map((card) => (
              <div key={card._id} className="col-12 px-3">
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
