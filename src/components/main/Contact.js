import React from "react";

const Contact = () => {
  return (
    <>
      <section className="p-lg-10 py-md-8 py-5">
        <div className="bg-dark bg-opacity-25 p-5">
          <div className="row m-0 justify-content-center bg-black pt-10">
            <p className="text-uppercase m-0 text-center fw-bold text-white fs-4">
              CONTACT US
            </p>
            <div className="d-flex flex-column align-items-center">
              <p className="text-white-50 text-center col-6 d-lg-block d-none px-4 mb-0 fs-6">
                We're here to help you take the first step toward your dream
                property.
              </p>
              <p className="text-white-50 text-center col-lg-5 col-md-7 px-4 mb-0 fs-6">
                {" "}
                Contact us today for a free consultation and let’s discuss how
                we can turn your vision into reality.
              </p>
            </div>
          </div>
          <div className="p-lg-10 py-10 bg-black pb-10">
            <form className="row g-3">
              <div className="col-md-7 mx-auto px-3">
                <div className="col-12">
                  <label
                    htmlFor="fullName"
                    className="form-label text-white-50"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="Full Name"
                    required
                    placeholder="John Doe"
                    className="form-control"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label text-white-50">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="Email Address"
                    required
                    placeholder="Example@gmail.com"
                    className="form-control"
                  />
                </div>

                <div className="col-12">
                  <label
                    htmlFor="phoneNumber"
                    className="form-label text-white-50"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="Phone Number"
                    required
                    placeholder="+234"
                    className="form-control"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="message" className="form-label text-white-50">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="Message"
                    required
                    placeholder="Input your message here"
                    className="form-control"
                    rows="4"
                  ></textarea>
                </div>

                <div className="col-12 text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 text-black rounded"
                  >
                    <span className="text-black fw-bold fs-5">Submit</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
