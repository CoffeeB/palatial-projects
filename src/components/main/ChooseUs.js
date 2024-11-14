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
    threshold: 0.3, // Trigger when 50% of the section is in view
  });

  return (
    <>
      <section
        ref={ref}
        className="p-lg-10 pb-lg-0 pt-md-8 py-5 pb-0 row m-0 ChooseUs-bg"
      >
        <div
          className={`d-flex flex-md-row flex-column align-items-center px-2 ${
            inView ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <div className="row m-0 flex-md-row flex-column align-items-center">
            <p
              ref={ref}
              className={`bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto ${
                inView ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <i className="bx bxs-circle fs-sm" />
              &nbsp; Why Choose Us?
            </p>
            <h1 className="text-uppercase text-md-start text-center fs-4 fw-medium mb-3">
              Building Trust, One Project at a Time
            </h1>
            <p className="col-lg-4 pe-lg-5 fs-6 text-md-start text-center">
              Choosing Projects means partnering with a team committed to
              delivering excellence.
            </p>
          </div>
          <a
            className="btn btn-info text-black rounded col-auto ms-3 fw-bold my-2 d-flex align-items-center"
            href="./#contact-us"
          >
            <span className="text-black px-2 cursor-pointer">
              Get in touch right away
            </span>
            <i className="bx bx-chevron-right text-black" />
          </a>
        </div>
        <div className="row m-0 pb-10">
          {cards.map((card) => (
            <div
              ref={ref}
              key={card.id}
              className={`col-lg-3 col-md-6 py-1 px-1 ${
                inView ? "animate-fadeInUp" : "opacity-0"
              }`}
            >
              <div className="card border-0 rounded-0 bg-black bg-opacity-25 h-100">
                <div className="card-header border-0 p-3">
                  <Image
                    width={1080}
                    height={1080}
                    src={card.image}
                    alt={`Image for ${card.title}`}
                    className="card-img rounded-0"
                    style={{ height: "auto" }}
                  />
                </div>
                <div className="card-body pt-0 p-3">
                  <div className="row bg-black bg-opacity-25 m-0 px-3 py-3">
                    <p className="d-flex p-0 fs-7 fw-medium">
                      <Image
                        width={500}
                        height={500}
                        src="/assets/img/choose_us_icon.svg"
                        alt={`Icon for ${card.title}`}
                        className="avatar avatar-xs rounded"
                      />
                      <span className="px-2">{card.title}</span>
                    </p>
                    <span className="p-0 fs-sm">{card.description}</span>
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
