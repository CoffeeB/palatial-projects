import React from "react";
import ServiceCard from "./services/ServiceCards";

const Services = () => {
  const services = [
    {
      title: "Architectural Consultation",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
    },
    {
      title: "Construction Management",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
    },
    {
      title: "Real Estate Expert",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
    },
    {
      title: "Renovation and Remodeling",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
    },
  ];

  return (
    <>
      <section className="p-lg-10 py-10">
        <div className="row m-0 justify-content-center">
          <p className="bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto">
            <i className="bx bxs-circle fs-sm" />
            &nbsp; Our Services
          </p>
          <p className="text-uppercase text-center fs-6">
            Comprehensive Solutions for Every Building Need
          </p>
        </div>
        <div className="p-lg-10 py-10">
          <div className="accordion" id="servicesAccordion">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                imgSrc={service.imgSrc}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
