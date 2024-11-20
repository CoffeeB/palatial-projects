import Image from "next/image";
import { useSnackbar } from "notistack";
import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Portfolio = () => {
  const [cards, setCards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Active index state
  const carouselRefs = useRef([]); // Keep track of each carousel's ref

  // Function to scroll carousel and update active index
  const scrollCarousel = (direction, index) => {
    if (carouselRefs.current[index]) {
      const cardWidth = carouselRefs.current[index].children[0].offsetWidth; // Get the width of a single card
      const scrollAmount = cardWidth; // Move by one card width
      const newScrollLeft =
        carouselRefs.current[index].scrollLeft + direction * scrollAmount;

      carouselRefs.current[index].scrollLeft = newScrollLeft;

      // Calculate new active index based on scroll position
      const newIndex = Math.round(newScrollLeft / cardWidth); // Round to the nearest card index
      setActiveIndex(newIndex);
    }
  };

  const scrollToCard = (index, cardIndex) => {
    if (carouselRefs.current[cardIndex]) {
      const cardWidth = carouselRefs.current[cardIndex].children[0].offsetWidth;
      carouselRefs.current[cardIndex].scrollLeft = cardWidth * index;
      setActiveIndex(index); // Update active index when jumping to specific card
    }
  };

  const [stopFetch, setStopFetch] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.3, // Trigger when 50% of the section is in view
  });

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
          enqueueSnackbar(result?.message || "Failed to fetch portfolio", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Failed to fetch portfolio. Please try again.", {
          variant: "error",
        });
        console.error("Failed to fetch portfolio:- ", error);
      }
    };

    fetchPortfolioData();
  }, [cards, stopFetch]);

  return (
    <section id="portfolio" className={`p-lg-10 py-md-8 py-5 bg-black`}>
      <div
        ref={ref}
        className={`row m-0 justify-content-center ${
          inView ? "animate-fadeInUp" : ""
        }`}
      >
        <p className="bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto">
          <i className="bx bxs-circle fs-sm" />
          &nbsp; Portfolio
        </p>
        <p className="text-uppercase text-center fs-6">
          Our work speaks for itself
        </p>
      </div>

      <div ref={ref} className={`py-6 ${inView ? "animate-fadeInUp" : ""}`}>
        <div className="row m-0">
          {cards?.length === 0 ? (
            <p className="mb-0 text-center text-white-50 fs-4">
              Nothing to show here yet
            </p>
          ) : (
            cards.map((card, index) => (
              <div key={card._id} className="col-12 px-3">
                <section className="card rounded-0 border-0">
                  <div className="card-body py-0">
                    {/* Title and Metadata */}
                    <div className="mb-3">
                      <p className="fs-5 mb-0 fw-bold text-uppercase">
                        {card.title}
                      </p>
                    </div>
                    {/* Carousel */}
                    <div id={`carousel-${index}-${card.id}`}>
                      <div
                        className="carousel-container m-0 overflow-hidden row flex-nowrap align-items-center h-100"
                        ref={(el) => (carouselRefs.current[index] = el)}
                        style={{ scrollBehavior: "smooth" }}
                      >
                        {card.images.map((image, imageIndex) => (
                          <div
                            className="col-md-auto col-12 p-0 h-100"
                            key={imageIndex}
                          >
                            <div
                              ref={ref}
                              className={`p-0  ${
                                inView ? "animate-fadeInUp" : ""
                              }`}
                            >
                              <div className="card border-0 rounded-0 h-100 p-0">
                                <div className="card-body p-0">
                                  <Image
                                    src={image.secure_url}
                                    alt={`Image of ${card.title}`}
                                    width={500}
                                    height={500}
                                    className="col-auto p-0"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Carousel Controls */}
                      {card.images.length > 1 && (
                        <>
                          {/* Prev Button */}
                          <div
                            className="carousel-control-prev d-md-none"
                            type="button"
                            onClick={() => scrollCarousel(-1, index)}
                          >
                            <i
                              className="bx bx-chevron-left bg-black bg-opacity-75 p-3 text-white rounded-circle"
                              aria-label="Previous"
                            />
                          </div>
                          {/* Next Button */}
                          <div
                            className="carousel-control-next d-md-none"
                            type="button"
                            onClick={() => scrollCarousel(1, index)}
                          >
                            <i
                              className="bx bx-chevron-right bg-black bg-opacity-75 p-3 text-white rounded-circle"
                              aria-label="Next"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Footer with navigation chevrons */}
                    <div className="card-footer pt-2 px-0 border-0">
                      <div className="row align-items-center m-0 px-0 pb-2">
                        <span className="p-0 pe-2 border-0 border-end col-auto">
                          Year - {card.year}
                        </span>
                        <span className="py-0 px-2 col-lg-8 text-truncate text-uppercase">
                          Location - {card.location}
                        </span>
                        {card.images.length > 1 && (
                          <div className="d-none d-md-flex align-items-center ms-auto col-auto p-0">
                            <button
                              type="button"
                              className="px-2 bg-transparent border-0 border-end"
                              onClick={() => scrollCarousel(-1, index)}
                            >
                              <i className="bx bxs-chevron-left rounded-circle btn-outline-primary btn bg-white text-black" />
                            </button>
                            <button
                              type="button"
                              className="px-2 bg-transparent border-0"
                              onClick={() => scrollCarousel(1, index)}
                            >
                              <i className="bx bxs-chevron-right rounded-circle btn-outline-primary btn bg-white text-black" />
                            </button>
                          </div>
                        )}
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
