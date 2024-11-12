import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="footer p-md-10 p-2 bg-black text-white">
      {/* Top Content */}
      <div className="row m-0 mb-2">
        <div className="position-relative col-lg-4 pe-9">
          <Image
            decoding="async"
            src="https://framerusercontent.com/images/ZdKIt0n5znnTHaYeT2a0mUudo.png"
            alt="Palatial Projects Logo"
            className="img-fluid rounded col-auto"
            width={1080}
            height={1080}
            style={{ maxWidth: "200px" }}
          />
          <p className="text-white-50 ps-0 pt-3 pe-7">
            Building lasting legacies with precision, innovation, and
            trust—Palatial Projects, where your dream space becomes reality!
          </p>
        </div>
        {/* Newsletter Section */}
        <div className="row col-lg-8 m-0">
          <div className="px-0">
            <p className="fw-bold fs-6">Subscribe to our newsletter</p>
            <form method="POST" className="d-flex justify-content-center gap-2">
              <input
                type="email"
                name="email"
                disabled
                placeholder="name@gmail.com"
                className="form-control"
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "4px",
                  background: "rgb(235, 235, 235)",
                }}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              <button
                type="submit"
                disabled
                className="btn btn-primary px-3 col-auto text-dark fw-bold"
              >
                <span className="text-black">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="row m-0 justify-content-center px-0 my-2">
        <h1 className="fw-medium text-white-50 ls-xs footer-text">
          PALATIAL PROJECTS
        </h1>
      </div>

      {/* Address Section */}
      <div className="row m-0 justify-content-between mt-2">
        <p className="fw-bold text-white col-auto">
          <span className="fw-normal text-white-50">RC No: </span>
          7804659
        </p>
        <p className="border-0 p-2 border-end col-auto d-lg-block d-none" />
        <p className="fw-bold text-white col-auto">
          <span className="fw-normal text-white-50">Office Address: </span>
          1st floor Tekts / Favos Building, No 1 Oluyole Way, New Bodija,
          Ibadan, Oyo State
        </p>
      </div>
    </div>
  );
};

export default Footer;
