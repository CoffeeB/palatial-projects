import React from "react";
import ServiceCard from "./services/ServiceCards";

const Services = () => {
  const services = [
    {
      title: "Architectural Consultation",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
      description:
        "Our architects bring your vision to life with custom designs that reflect both aesthetic beauty and functional practicality. We collaborate closely with clients to create tailored solutions, whether it's a modern luxury home, a commercial property, or a large-scale development. Every detail is carefully considered to ensure that your space not only looks stunning but also serves your unique needs, balancing innovation with practicality.",
    },
    {
      title: "Construction Management",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
      description:
        "Palatial Projects provides a seamless blend of construction expertise and project management, ensuring that your building project is executed to the highest standard. From breaking ground to the finishing details, we oversee every stage of construction with meticulous attention to quality and safety. Our team manages all logistics, coordinating contractors, materials, and timelines, to deliver a final product that meets both your expectations and industry standards. We ensure that the process runs smoothly and that the result is a structure of unmatched quality and durability, ready to stand the test of time.",
    },
    {
      title: "Real Estate Expert",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
      description:
        "Our experienced real estate experts offer invaluable guidance and insight throughout the life of your project. We work hand-in-hand with developers, investors, and property owners to ensure that your real estate goals are met effectively and efficiently. From site selection and feasibility analysis to market trends and regulatory requirements, we provide strategic advice that helps optimize both the design and financial outcomes of your project. With Palatial Properties, you gain not just a partner in construction, but an expert in maximizing your property’s value and potential.",
    },
    {
      title: "Renovation and Remodeling",
      imgSrc:
        "https://framerusercontent.com/images/3p5k6l6de9SBz4BZeDFzRoCx4.jpg",
      description:
        "Whether you’re looking to revitalize a tired space or completely transform a property, our renovation and remodeling services provide innovative solutions tailored to your needs. From refreshing interiors to adding extensions or upgrading structural elements, we ensure the new space is both beautiful and functional. We carefully manage every step of the renovation process to create a result that blends seamlessly with the existing structure while adding value and modern appeal.",
    },
  ];

  return (
    <>
      <section className="p-lg-10 py-md-8 py-5 bg-black">
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
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
