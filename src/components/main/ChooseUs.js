import Image from "next/image";
import React from "react";

const cards = [
  {
    id: 1,
    title: "Uncompromised Quality",
    description:
      "We use only the finest materials and adhere to the highest standards of construction.",
    image: "/assets/img/Hero_Section_Image.jpg",
  },
  {
    id: 2,
    title: "Transperency",
    description:
      "We keep you informed at every stage of the project from concept to implementation",
    image: "/assets/img/Hero_Section_Image.jpg",
  },
  {
    id: 3,
    title: "Innovative Designs",
    description:
      "We push the boundaries of design to create spaces that are functional and breathtaking.",
    image: "/assets/img/Hero_Section_Image.jpg",
  },
  {
    id: 4,
    title: "Timely Delivery",
    description:
      "We respect your time and ensure that all projects are completed as scheduled.",
    image: "/assets/img/Hero_Section_Image.jpg",
  },
];

const ChooseUs = () => {
  return (
    <>
      <section className="p-lg-10 py-10">
        <div className="d-flex align-items-center">
          <div className="row m-0">
            <p className="bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto">
              <i className="bx bxs-circle fs-sm" />
              &nbsp; Why Choose Us?
            </p>
            <p className="text-uppercase fs-6">
              Building Trust, One Project at a Time
            </p>
            <p className="col-lg-4 pe-lg-9 fs-6">
              Choosing Projects means partnering with a team committed to
              delivering excellence.
            </p>
          </div>
          <a
            className="btn btn-info text-black rounded col-lg-2 col-md-3 col-6 ms-3 fw-bold my-2"
            href="./#contact-us"
          >
            Get in touch right away
            <i className="bx bx-chevron-right" />
          </a>
        </div>
        <div className="row m-0">
          {cards.map((card) => (
            <div key={card.id} className="col-lg-3 col-6 p-3 h-100">
              <div className="card rounded-0 h-100">
                <div className="card-header border-0">
                  <Image
                    width={500}
                    height={500}
                    src={card.image}
                    alt={`Image for ${card.title}`}
                    className="card-img rounded-0"
                    style={{ height: "200px" }}
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
