import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

const cards = [
  {
    id: 1,
    title: "Uncompromised Quality",
    description:
      "We use only the finest materials and adhere to the highest standards of construction.",
    image:
      "https://framerusercontent.com/images/VwCVb7NQEqfErcG08Ipfh4FLbc.png",
  },
  {
    id: 2,
    title: "Transperency",
    description:
      "We keep you informed at every stage of the project from concept to implementation",
    image:
      "https://framerusercontent.com/images/onJIAIX0FQzwzrEP8w940R4X2lA.png",
  },
  {
    id: 3,
    title: "Innovative Designs",
    description:
      "We push the boundaries of design to create spaces that are functional and breathtaking.",
    image:
      "https://framerusercontent.com/images/KuHMDgpueeV2kCd8iNJfpWN4fqA.png",
  },
  {
    id: 4,
    title: "Timely Delivery",
    description:
      "We respect your time and ensure that all projects are completed as scheduled.",
    image: "https://framerusercontent.com/images/KpiHDC1ftjU8IgSFWNpeNIjcM.png",
  },
];

const ChooseUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the section is in view
  });

  return (
    <>
      <section
        className="p-lg-10 py-md-8 py-5 row m-0"
        style={{ backgroundImage: "url(/assets/img/choose_us_bg.png)" }}
      >
        <div
          ref={ref}
          className={`d-flex flex-md-row flex-column align-items-center px-2 ${
            inView ? "animate-fadeInUp" : ""
          }`}
        >
          <div className="row m-0 flex-md-row flex-column align-items-center">
            <p
              ref={ref}
              className={`bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto ${
                inView ? "animate-fadeInUp" : ""
              }`}
            >
              <i className="bx bxs-circle fs-sm" />
              &nbsp; Why Choose Us?
            </p>
            <p className="text-uppercase text-md-start text-center fs-6">
              Building Trust, One Project at a Time
            </p>
            <p className="col-lg-4 pe-lg-9 fs-6 text-md-start text-center">
              Choosing Projects means partnering with a team committed to
              delivering excellence.
            </p>
          </div>
          <a
            className="btn btn-info text-black rounded col-auto ms-3 fw-bold my-2 d-flex align-items-center"
            href="./#contact-us"
          >
            <span className="text-black">Get in touch right away</span>
            <i className="bx bx-chevron-right text-black" />
          </a>
        </div>
        <div className="row m-0">
          {cards.map((card) => (
            <div
              ref={ref}
              key={card.id}
              className={`col-lg-3 col-md-6 p-3 ${
                inView ? "animate-fadeInUp" : ""
              }`}
            >
              <div className="card border-0 rounded-0 bg-black bg-opacity-25 h-100">
                <div className="card-header border-0">
                  <Image
                    width={1080}
                    height={1080}
                    src={card.image}
                    alt={`Image for ${card.title}`}
                    className="card-img rounded-0"
                    style={{ height: "auto" }}
                  />
                </div>
                <div className="card-body pt-0">
                  <div className="row bg-black bg-opacity-25 m-0 px-3 pb-2">
                    <p className="d-flex p-0 fs-6 fw-bold">{card.title}</p>
                    <span className="p-0 col-lg-10">{card.description}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ChooseUs;
