import React from 'react';

const HeroSection = () => {
  return (
    <div className="d-flex vh-100 hero-bg-image">
      <div className="my-auto px-8 h-100 bg-black bg-opacity-75">
        <div className="row flex-column m-0 mt-10">
            <h1 className="fw-medium display-3 col-6 pt-10 mt-5">
            Excellence in Every Detail, From Concept to Completion
            </h1>
            <p className="col-4 py-2">
            Experience unmatched architectural elegance and cutting-edge construction expertise with Palatial Properties, where your vision meets precision.
            </p>
            <a
            className="btn btn-info text-black rounded col-2 fw-bold my-2"
            href="./#contact-us"
            >
            Book free consultation
            <i className="bx bx-chevron-right"/>
            </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
