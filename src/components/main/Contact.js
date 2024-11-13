import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useSnackbar } from "notistack";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the section is in view
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // Handle form data input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    // Log to check if environment variables are loaded correctly
    const serviceID = "service_ktd8qqa";
    const templateID = "template_teyvaij";
    const userID = "IuJz05RXFUnvSG0__";

    if (!serviceID || !templateID || !userID) {
      console.error("Missing EmailJS credentials. Please check .env file.");
      enqueueSnackbar(
        "Missing EmailJS credentials. Please check the .env file.",
        {
          variant: "error",
        }
      );
      return;
    }

    try {
      // Send email via EmailJS API
      const response = await emailjs.send(
        serviceID,
        templateID,
        {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          message: formData.message,
        },
        userID
      );

      if (response.status === 200) {
        enqueueSnackbar("Your message has been sent successfully!", {
          variant: "success",
        });
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        enqueueSnackbar(
          response.text || "Sorry, there was an error sending your message.",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      enqueueSnackbar("Failed to send message. Please try again later.", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact-us"
      className={`p-lg-10 py-md-8 py-5 ${inView ? "animate-fadeInUp" : ""}`}
    >
      <div className="bg-dark bg-opacity-25 p-5">
        <div className="row m-0 justify-content-center bg-black pt-10">
          <p className="text-uppercase m-0 text-center fw-bold text-white fs-4">
            CONTACT US
          </p>
          <div className="d-flex flex-column align-items-center">
            <p className="text-white-50 text-center col-6 d-lg-block d-none px-4 mb-0 fs-6">
              We&apos;re here to help you take the first step toward your dream
              property.
            </p>
            <p className="text-white-50 text-center col-lg-5 col-md-7 px-4 mb-0 fs-6">
              Contact us today for a free consultation and let&apos;s discuss
              how we can turn your vision into reality.
            </p>
          </div>
        </div>
        <div className="p-lg-10 py-10 bg-black pb-10">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-7 mx-auto px-3">
              <div className="col-12">
                <label htmlFor="fullName" className="form-label text-white-50">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
                  disabled={isSubmitting}
                >
                  <span className="text-black fw-bold fs-5">
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </span>
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className="col-12 text-center mt-3">
                  <p
                    className={`${
                      statusMessage.includes("success")
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {statusMessage}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
