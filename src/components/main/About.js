import React from "react";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the section is in view
  });

  return (
    <div
      className="d-flex bg-secondary bg-opacity-10 p-lg-10 px-md-3 p-1"
      style={{ backgroundImage: "url(/assets/img/about_bg.png)" }}
    >
      <div className="px-lg-10 row m-0">
        <p
          ref={ref}
          className={`fs-4 px-lg-10 py-10 mb-0 text-center position-relative ${
            inView ? "animate-fadeInUp" : ""
          }`}
        >
          <i className="fs-4 fw-bold text-primary bx bxs-quote-left" /> At
          Palatial Projects, we blend creativity with functionality to transform
          visions into stunning architectural realities. With a commitment to
          excellence and a passion for design, our team of expert architects and
          designers crafts spaces that inspire and endure.{" "}
          <i className="fs-4 fw-bold text-primary bx bxs-quote-right" />
        </p>
      </div>
    </div>
  );
};

export default About;
