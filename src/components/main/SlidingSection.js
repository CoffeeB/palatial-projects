import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SlidingSection = () => {
  const sliderRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState("10s");
  const colors = ["text-success", "text-danger", "text-warning", "text-info"];

  useEffect(() => {
    const slider = sliderRef.current;

    const handleMouseOver = () => {
      setAnimationDuration("30s"); // Slow down on hover
    };

    const handleMouseOut = () => {
      setAnimationDuration("10s"); // Restore speed
    };

    slider.addEventListener("mouseover", handleMouseOver);
    slider.addEventListener("mouseout", handleMouseOut);

    return () => {
      slider.removeEventListener("mouseover", handleMouseOver);
      slider.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="slider-container shadow-inner w-100 position-relative bg-secondary bg-opacity-10 overflow-hidden">
      <div
        ref={sliderRef}
        className="d-flex slider row m-0 flex-nowrap"
        style={{ animationDuration }}
      >
        {/* Duplicate the content to enable a smooth loop */}

        {Array.from({ length: 3 }).map((_, index) => (
          <>
            {/* First Slide */}
            <div
              className="slide px-0 fs-6 d-flex flex-row col-auto"
              key={`slide-${index}-1`}
            >
              <p className={`m-1 text-white fs-4 p-5`}>
                Architecture reimagined
              </p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
              <p className={`m-1 text-white fs-4 p-5`}>Palatial Projects</p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
            </div>

            {/* Second Slide */}
            <div
              className="slide px-0 fs-6 d-flex flex-row col-auto"
              key={`slide-${index}-2`}
            >
              <p className={`m-1 text-white fs-4 p-5`}>
                Architecture reimagined
              </p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
              <p className={`m-1 text-white fs-4 p-5`}>Palatial Projects</p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
            </div>

            {/* Third Slide */}
            <div
              className="slide px-0 fs-6 d-flex flex-row col-auto"
              key={`slide-${index}-3`}
            >
              <p className={`m-1 text-white fs-4 p-5`}>
                Architecture reimagined
              </p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
              <p className={`m-1 text-white fs-4 p-5`}>Palatial Projects</p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
            </div>

            {/* Fourth Slide */}
            <div
              className="slide px-0 fs-6 d-flex flex-row col-auto"
              key={`slide-${index}-4`}
            >
              <p className={`m-1 text-white fs-4 p-5`}>
                Architecture reimagined
              </p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
              <p className={`m-1 text-white fs-4 p-5`}>Palatial Projects</p>
              <Image
                width={50}
                height={50}
                src="/assets/img/right-arrow.svg"
                alt="Arrow"
                className="mx-1"
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SlidingSection;
