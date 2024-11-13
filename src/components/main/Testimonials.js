import Image from "next/image";
import React, { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO, Example Corp.",
    avatar: "/assets/img/Hero_Section_Image.jpg", // Avatar image URL
    testimony:
      "Choosing Projects was the best decision we made. Their attention to detail and commitment to excellence is unparalleled.",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager, Tech Innovations",
    avatar: "/assets/img/Hero_Section_Image.jpg",
    testimony:
      "We were thrilled with the results. Their team guided us throughout the process, and the outcome exceeded our expectations.",
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "Founder, Green Builders",
    avatar: "/assets/img/Hero_Section_Image.jpg",
    testimony:
      "The team at Projects understood our vision and delivered a solution that was both functional and aesthetically pleasing.",
  },
  {
    id: 4,
    name: "Emily White",
    position: "Architect, Urban Designs",
    avatar: "/assets/img/Hero_Section_Image.jpg",
    testimony:
      "Their professionalism and quality of work made this collaboration seamless. Highly recommended for any construction project.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active testimonial index
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300; // The amount to scroll on each button click
      carouselRef.current.scrollLeft += direction * scrollAmount;
    }
  };

  const scrollToCard = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.scrollLeft = cardWidth * index;
      setActiveIndex(index); // Update active index when jumping to specific card
    }
  };

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.3, // Trigger when 50% of the section is in view
  });

  return (
    <>
      <section
        ref={ref}
        className={`p-lg-10 py-md-8 py-5  ${
          inView ? "animate-fadeInUp" : "opacity-0"
        }`}
      >
        <div className="d-flex flex-md-row flex-column align-items-center px-2">
          <div className="row m-0 flex-md-row flex-column align-items-center">
            <p className="bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto">
              <i className="bx bxs-circle fs-sm" />
              &nbsp; Testimonials
            </p>
            <p className="text-uppercase text-md-start text-center fs-5">
              Hear from SOME OF Our Satisfied Clients
            </p>
            <p className="col-lg-6 pe-lg-9 fs-6 text-md-start text-center">
              Discover how Palatial Properties has transformed dreams into
              reality for clients just like you.
            </p>
          </div>
          <a
            className="btn btn-info text-black rounded col-lg-2 col-auto ms-3 fw-bold my-2 d-flex align-items-center justify-content-center"
            href="./#contact-us"
          >
            <span className="text-black px-2 cursor-pointer">
              Book free consultation
            </span>
            <i className="bx bx-chevron-right text-black" />
          </a>
        </div>

        <div className="row m-0">
          <div className="position-relative w-100">
            {/* Carousel Section */}
            <div
              className="carousel-container overflow-hidden row flex-nowrap align-items-center h-100"
              ref={carouselRef}
              style={{ scrollBehavior: "smooth" }}
            >
              {testimonials.map((testimonial, index) => (
                <div className="col-md-6 p-1 h-100" key={testimonial.id}>
                  <div
                    ref={ref}
                    className={`bg-white bg-opacity-10 p-5  ${
                      inView ? "animate-fadeInUp" : "opacity-0"
                    }`}
                  >
                    <div className="card bg-black rounded-0 shadow-sm h-100 p-5 ">
                      <div className="card-header p-0 border-0">
                        <div className="row align-items-center m-0">
                          <Image
                            src={testimonial.avatar}
                            alt={`Avatar of ${testimonial.name}`}
                            width={1080}
                            height={1080}
                            className="rounded-circle avatar avatar-xl col-auto p-0"
                          />
                          <div className="col-10">
                            <p className="fs-5 fw-bold mt-3 mb-0">
                              {testimonial.name}
                            </p>
                            <p className="fs-6 text-muted">
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card-body bg-white bg-opacity-25">
                        <p className="text-white mt-2 py-5">
                          &rdquo; {testimonial.testimony} &ldquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <button
              className="carousel-control-prev justify-content-start position-absolute top-50 start-0 translate-middle-y"
              type="button"
              onClick={() => scrollCarousel(-1)}
            >
              <i
                className="bx bx-chevron-left text-white bg-black rounded-circle fs-1 fw-normal"
                aria-hidden="true"
              />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next justify-content-end position-absolute top-50 end-0 translate-middle-y"
              type="button"
              onClick={() => scrollCarousel(1)}
            >
              <i
                className="bx bx-chevron-right text-white bg-black rounded-circle fs-1 fw-normal"
                aria-hidden="true"
              />
              <span className="visually-hidden">Next</span>
            </button>

            {/* Indicators (Dots) */}
            <div className="d-flex justify-content-center position-absolute bottom-0 start-50 translate-middle">
              <div className="d-flex justify-content-center mt-4 bg-black bg-opacity-50 p-3 rounded-5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator mx-2 bg-primary ${
                      activeIndex === index ? "bg-opacity-100" : "bg-opacity-50"
                    }`}
                    onClick={() => {
                      scrollToCard(index);
                      setActiveIndex(index); // Update active index on indicator click
                    }}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      border: "none",
                      transition: "opacity 0.3s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
