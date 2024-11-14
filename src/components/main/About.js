import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.3, // Trigger when 50% of the section is in view
  });

  return (
    <div
      id="about-us"
      className="d-flex bg-light bg-opacity-10 p-lg-10 px-md-3 p-1 position-relative"
    >
      <Image
        width={500}
        height={500}
        src={"/assets/img/about_pattern.svg"}
        alt="pattern"
        className={`position-absolute ms-n10 me-10 top-0 z-0 h-100 start-0  ${
          inView ? "animate-fadeInUp" : "opacity-0"
        }`}
      />

      <div className="px-lg-10 row m-0">
        <p
          ref={ref}
          className={`fs-4 px-lg-10 py-10 mb-0 text-center position-relative ${
            inView ? "animate-fadeInUp" : "opacity-0"
          }`}
        >
          <span className="row m-0">
            <span className="lh-lg">
              At Palatial Projects, we blend creativity with functionality to
              transform visions into stunning architectural realities. With a
              commitment to excellence and a passion for design, our team of
              expert architects and designers crafts spaces that inspire and
              endure.
            </span>
          </span>
        </p>
      </div>
      <Image
        width={500}
        height={500}
        src={"/assets/img/about_pattern.svg"}
        alt="pattern"
        className={`position-absolute me-n10 ms-10 top-0 z-0 h-100 end-0  ${
          inView ? "animate-fadeInUp" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default About;
