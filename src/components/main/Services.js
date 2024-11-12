import React, { useEffect, useState } from "react";
import ServiceCard from "./services/ServiceCards";
import { useSnackbar } from "notistack";

const Services = () => {
  const [services, setServices] = useState([]);
  const [stopFetch, setStopFetch] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Fetch services from the API
  useEffect(() => {
    if (services.length > 0 || stopFetch) return;
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        if (result?.success) {
          console.log(result?.data);
          setStopFetch(true);
        } else {
          enqueueSnackbar(result?.message || "Failed to fetch services", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Failed to fetch services. Please try again.", {
          variant: "error",
        });
        console.error("Failed to fetch services:- ", error);
      }
    };

    fetchServices();
  }, [services]);

  return (
    <>
      <section className="p-lg-10 py-md-8 py-5 bg-black">
        <div className="row m-0 justify-content-center">
          <p className="bg-primary rounded-5 p-2 bg-opacity-25 d-flex align-items-center col-auto">
            <i className="bx bxs-circle fs-sm" />
            &nbsp; Our Services
          </p>
          <p className="text-uppercase text-center fs-6">
            Comprehensive Solutions for Every Building Need
          </p>
        </div>
        <div className="p-lg-10 py-10">
          <div className="accordion" id="servicesAccordion">
            {services.length === 0 ? (
              <>
                <p className="mb-0 text-center text-white-50 fs-4">
                  Nothing to show here yet
                </p>
              </>
            ) : (
              services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  imgSrc={service.imgSrc}
                  index={index}
                  description={service.description}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
