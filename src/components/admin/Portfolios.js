// pages/PortfolioManager.js
import { useEffect, useState } from "react";
import PortfoliosList from "./portfolio/List";
import PortfolioForm from "./portfolio/Form";
import { useSnackbar } from "notistack";

const PortfolioManager = () => {
  const [sections, setSections] = useState([]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (sections.length > 0) return;
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();

        console.log("portfolios", sections);

        if (Array.isArray(result.data)) {
          setSections(result.data);
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
    ?.filter((section) => {
      return (
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.id - a.id; // Sort by creation date (newest first)
      } else if (sortOrder === "year") {
        return b.year - a.year; // Sort by year (most recent year first)
      }
      return 0;
    });

  // Add a new portfolio section
  const addSection = (title, year, location, images) => {
    const newSection = {
      id: Date.now().toString(),
      title,
      year,
      location,
      images,
    };

    setSections([...sections, newSection]);
    setIsAddingSection(false);
    enqueueSnackbar("New portfolio section added!", { variant: "success" });
  };

  // Delete a section
  const deleteSection = async (sectionId) => {
    try {
      const response = await fetch(`/api/portfolio?id=${sectionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setSections(sections.filter((section) => section._id !== sectionId));
        enqueueSnackbar("Portfolio section deleted successfully!", {
          variant: "success",
        });
      } else {
        console.error("Failed to delete portfolio section:", data.message);
        enqueueSnackbar("Failed to delete portfolio section.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting portfolio section:", error);
      enqueueSnackbar("Error deleting portfolio section.", {
        variant: "error",
      });
    }
  };

  // Delete an image from a portfolio section
  const handleImageDelete = async (sectionId, imageUrl) => {
    try {
      const response = await fetch(`/api/portfolio`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sectionId, imageUrl }),
      });
      const data = await response.json();
      if (data.success) {
        const updatedSections = sections.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                images: section.images.filter((image) => image !== imageUrl),
              }
            : section
        );
        setSections(updatedSections);
        enqueueSnackbar("Image removed from portfolio successfully!", {
          variant: "success",
        });
      } else {
        console.error("Failed to remove image:", data.message);
        enqueueSnackbar("Failed to remove image.", { variant: "error" });
      }
    } catch (error) {
      console.error("Error removing image:", error);
      enqueueSnackbar("Error removing image.", { variant: "error" });
    }
  };

  return (
    <div className="my-5">
      <h1 className="h2 mb-4">Manage Portfolio</h1>

      {!isAddingSection ? (
        <div>
          <div className="mb-4 d-flex justify-content-between">
            <div className="">
              <button
                className="btn btn-info me-2"
                onClick={() => setSortOrder("newest")}
              >
                <span className="text-black">Sort by Newest</span>
              </button>
              <button
                className="btn btn-info me-2"
                onClick={() => setSortOrder("year")}
              >
                <span className="text-black">Sort by Year</span>
              </button>
            </div>
            <button
              className="btn btn-primary mb-4 d-flex align-items-center"
              onClick={() => setIsAddingSection(true)}
            >
              <span className="text-black d-none d-lg-block">
                Add New Section
              </span>
              &nbsp;
              <i className="text-black bx bx-plus" />
            </button>
          </div>
          <PortfoliosList
            sections={sections}
            deleteSection={deleteSection}
            handleImageDelete={handleImageDelete}
            sortedSections={sortedSections}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        </div>
      ) : (
        <PortfolioForm
          addSection={addSection}
          setIsAddingSection={setIsAddingSection}
        />
      )}
    </div>
  );
};

export default PortfolioManager;
