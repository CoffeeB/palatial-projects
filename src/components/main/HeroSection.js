import React from "react";

const HeroSection = () => {
  return (
    <div className="d-flex vh-100 hero-bg-image">
      <div className="my-auto px-lg-8 h-100 w-100 bg-black bg-opacity-75 d-flex">
        <div className="row flex-column m-auto">
          <h1 className="fw-medium display-3 col-lg-6 col-md-9 pt-10 pe-lg-7 mt-5">
            Excellence in Every Detail, From Concept to Completion
          </h1>
          <p className="col-lg-4 col-md-7 py-2">
            Experience unmatched architectural elegance and cutting-edge
            construction expertise with Palatial Properties, where your vision
            meets precision.
          </p>
          <a
            className="btn btn-info text-black rounded col-lg-2 col-md-3 col-6 ms-3 fw-bold my-2"
            href="./#contact-us"
          >
            Book free consultation
            <i className="bx bx-chevron-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
