import React, { useEffect, useRef, useState } from "react";

const About = () => {
  return (
    <div className="d-flex bg-secondary bg-opacity-10 p-lg-10 px-md-3 p-1">
      <div className="px-lg-10 row m-0">
        <p className="fs-4 px-lg-10 py-10 mb-0 text-center position-relative">
          <span
            className="position-absolute top-0 start-0 translate-middle fs-1 text-info"
            style={{ transform: "translate(0, -50%)" }}
          >
            &ldquo;
          </span>
          At Palatial Projects, we blend creativity with functionality to
          transform visions into stunning architectural realities. With a
          commitment to excellence and a passion for design, our team of expert
          architects and designers crafts spaces that inspire and endure.
          <span
            className="position-absolute top-0 end-0 translate-middle fs-1 text-info"
            style={{ transform: "translate(0, 50%)" }}
          >
            &rdquo;
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
