import React from "react";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.3, // Trigger when 50% of the section is in view
  });

  return (
    <div
      id="top"
      ref={ref}
      className={`d-flex vh-100 hero-bg-image ${
        inView ? "animate-fadeInUp" : "opacity-0"
      }`}
    >
      <div className="my-auto px-lg-8 h-100 w-100 bg-black bg-opacity-75 d-flex">
        <div className="row flex-column m-auto">
          <h1
            ref={ref}
            className={`fw-medium display-3 col-lg-6 col-md-9 pt-10 pe-lg-7 mt-5 ${
              inView ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            Excellence in Every Detail, From Concept to Completion
          </h1>
          <p
            ref={ref}
            className={`col-lg-4 col-md-7 py-2 ${
              inView ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            Experience unmatched architectural elegance and cutting-edge
            construction expertise with Palatial Properties, where your vision
            meets precision.
          </p>
          <div className="row m-0 p-0">
            <a
              ref={ref}
              className={`btn btn-info rounded col-auto ms-3 fw-bold my-2 d-flex align-items-center justify-content-center ${
                inView ? "animate-fadeInUp" : "opacity-0"
              }`}
              href="#contact-us"
            >
              <span className="text-black fw-bold px-2 cursor-pointer">
                Book free consultation
              </span>
              <i className="bx bx-chevron-right text-black" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
