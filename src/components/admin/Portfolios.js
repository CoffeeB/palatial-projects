// pages/PortfolioManager.js
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import PortfolioManagerContent from "./portfolio/Content";

const PortfolioManager = () => {
  const [sections, setSections] = useState([]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [stopFetch, setStopFetch] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (sections.length > 0 || stopFetch) return;
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setSections(result.data);
          setStopFetch(true);
        } else {
          console.error("Data is not an array:", result);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        enqueueSnackbar("Error fetching portfolio data.", { variant: "error" });
      }
    };

    fetchPortfolioData();
  }, [sections]);

  const sortedSections = sections
    .filter((section) => {
      return (
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return b.id - a.id; // Sort by creation date (latest first)
      } else if (sortOrder === "year_asc") {
        return a.year - b.year; // Sort by year in ascending order
      } else if (sortOrder === "year_desc") {
        return b.year - a.year; // Sort by year in descending order
      }
      return 0;
    });

  // Add a new portfolio section
  const addSection = (newSection) => {
    console.log("ap--r ", newSection);
    setSections([...sections, newSection?.data]);
    setIsAddingSection(false);
    enqueueSnackbar("New portfolio section added!", { variant: "success" });
  };

  // Delete a section
  const deleteSection = async (sectionId) => {
    enqueueSnackbar("Are you sure you want to delete this portfolio section?", {
      variant: "warning",
      action: (key) => (
        <>
          <button
            onClick={async () => {
              try {
                // Proceed with deletion if user clicks confirm
                const response = await fetch(`/api/portfolio?id=${sectionId}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                const data = await response.json();
                if (data.success) {
                  // Update state if delete is successful
                  setSections(
                    sections.filter((section) => section._id !== sectionId)
                  );
                  enqueueSnackbar("Portfolio section deleted successfully!", {
                    variant: "success",
                  });
                } else {
                  console.error(
                    "Failed to delete portfolio section:",
                    data.message
                  );
                  enqueueSnackbar("Failed to delete portfolio section.", {
                    variant: "error",
                  });
                }
              } catch (error) {
                console.error("Error deleting portfolio section:", error);
                enqueueSnackbar("Error deleting portfolio section.", {
                  variant: "error",
                });
              } finally {
                // Close the snackbar after action is taken
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

  // Delete an image from a portfolio section
  const handleImageDelete = async (sectionId, imageUrl) => {
    enqueueSnackbar("Are you sure you want to remove this image?", {
      variant: "warning",
      action: (key) => (
        <>
          <button
            onClick={async () => {
              try {
                // Proceed with image removal if user clicks confirm
                const response = await fetch(`/api/portfolio`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ sectionId, imageUrl }),
                });

                const data = await response.json();
                if (data.success) {
                  // Update state if image removal is successful
                  const updatedSections = sections.map((section) =>
                    section._id === sectionId
                      ? {
                          ...section,
                          images: section.images.filter(
                            (image) => image !== imageUrl
                          ),
                        }
                      : section
                  );
                  setSections(updatedSections);
                  enqueueSnackbar(
                    "Image removed from portfolio successfully!",
                    {
                      variant: "success",
                    }
                  );
                } else {
                  console.error("Failed to remove image:", data.message);
                  enqueueSnackbar("Failed to remove image.", {
                    variant: "error",
                  });
                }
              } catch (error) {
                console.error("Error removing image:", error);
                enqueueSnackbar("Error removing image.", { variant: "error" });
              } finally {
                // Close the snackbar after action is taken
                closeSnackbar(key); // Close the snackbar after confirmation
              }
            }}
            className="btn btn-danger rounded-1 p-0"
          >
            Yes
          </button>
          &nbsp;
          <button
            onClick={() => closeSnackbar(key)} // Close snackbar on Cancel
            className="btn btn-outline-danger border border-danger rounded-1 p-0"
          >
            Cancel
          </button>
        </>
      ),
    });
  };

  return (
    <PortfolioManagerContent
      sections={sortedSections}
      isAddingSection={isAddingSection}
      sortOrder={sortOrder}
      searchQuery={searchQuery}
      setSortOrder={setSortOrder}
      setIsAddingSection={setIsAddingSection}
      addSection={addSection}
      deleteSection={deleteSection}
      handleImageDelete={handleImageDelete}
      setSearchQuery={setSearchQuery}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      setSections={setSections}
    />
  );
};

export default PortfolioManager;
