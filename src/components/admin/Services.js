import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import AddService from "./services/AddService";
import ServicesList from "./services/List";
import { addService, updateService, deleteService } from "@/utils/dbUtils";

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [stopFetch, setStopFetch] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Fetch services from the API
  useEffect(() => {
    if (services.length > 0 || stopFetch) return;
    setIsLoading(true);
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
          setServices(result?.data);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [services]);

  // Add a new service
  const handleAddService = async (newService) => {
    setIsLoading(true);
    try {
      const addedService = await addService(newService);
      if (addedService?.success === "true") {
        setServices([...services, addedService.data]);
        enqueueSnackbar("Service added successfully!", { variant: "success" });
      } else {
        enqueueSnackbar(addedService?.message || "Failed to add service", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Failed to add service. Please try again.", {
        variant: "error",
      });
      console.error("adding", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove a service
  const handleRemoveService = async (id) => {
    setIsLoading(true);
    enqueueSnackbar("Are you sure you want to delete this service?", {
      variant: "warning",
      action: (key) => (
        <>
          <button
            onClick={async () => {
              try {
                const response = await deleteService(id);
                if (response?.success === "true") {
                  setServices(services.filter((service) => service._id !== id));
                  enqueueSnackbar("Service removed successfully!", {
                    variant: "success",
                  });
                } else {
                  enqueueSnackbar(
                    response?.data?.message || "Failed to removed service",
                    {
                      variant: "error",
                    }
                  );
                }
              } catch (err) {
                enqueueSnackbar("Failed to remove service. Please try again.", {
                  variant: "error",
                });
              } finally {
                setIsLoading(false);
                closeSnackbar(key);
              }
            }}
            className="btn btn-danger rounded-1 p-0"
          >
            Yes
          </button>
          &nbsp;
          <button
            onClick={() => closeSnackbar(key)}
            className="btn btn-outline-danger border border-danger rounded-1 p-0"
          >
            Cancel
          </button>
        </>
      ),
    });
  };

  // Edit a service
  const handleEditService = async (updatedService) => {
    setIsLoading(true);
    if (!updatedService.title || !updatedService.description) {
      enqueueSnackbar("Title and Description are required", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("Saving this will permarnently update this service", {
      variant: "info",
    });

    enqueueSnackbar("Are you sure you want to save these changes?", {
      variant: "warning",
      action: (key) => (
        <>
          <button
            onClick={async () => {
              try {
                const response = await updateService(
                  updatedService.id,
                  updatedService.title,
                  updatedService.description
                );
                if (response?.success) {
                  setServices(
                    services.map((service) =>
                      service._id === updatedService.id
                        ? updatedService
                        : service
                    )
                  );
                  enqueueSnackbar("Service updated successfully!", {
                    variant: "success",
                  });
                  setIsEditing(null);
                } else {
                  enqueueSnackbar(
                    response?.message || "Failed to update service",
                    {
                      variant: "error",
                    }
                  );
                }
              } catch (err) {
                enqueueSnackbar("Failed to update service. Please try again.", {
                  variant: "error",
                });
                console.error("errrr0", err);
              } finally {
                setIsLoading(false);
                closeSnackbar(key);
              }
            }}
            className="btn btn-danger rounded-1 p-0"
          >
            Yes
          </button>
          &nbsp;
          <button
            onClick={() => closeSnackbar(key)} // Close the snackbar if user cancels
            className="btn btn-outline-danger border border-danger rounded-1 p-0"
          >
            Cancel
          </button>
        </>
      ),
    });
  };

  useEffect(() => {
    console.log("is editing", isEditing);
  }, [isEditing]);

  return (
    <div className="row m-0 px-3 py-10">
      <h1 className="h2 font-bold mb-6">Manage Services</h1>

      {/* Add New Service Form */}
      <AddService
        isEditing={isEditing}
        isLoading={isLoading}
        onAddService={handleAddService}
      />

      {/* Services List */}
      <ServicesList
        services={services}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        isLoading={isLoading}
        onEditService={handleEditService}
        onRemoveService={handleRemoveService}
      />

      {/* No Services Available */}
      {services.length === 0 && !isLoading && (
        <div className="card border-0">
          <div className="card-body text-center">
            <p className="text-muted">
              No services available. Add a new service to get started.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
