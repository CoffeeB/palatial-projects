// components/PortfolioForm.js
import { useState } from "react";
import { useSnackbar } from "notistack";
import MediaUpload from "./MediaUpload";
import { addPortfolioToDb } from "@/utils/dbUtils"; // Function to add to MongoDB

const PortfolioForm = ({ setIsAddingSection, addSection }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleCancel = () => {
    // Reset the form values and close the add section form
    setNewSectionTitle("");
    setNewYear("");
    setNewLocation("");
    setUploadedImages([]);
    setIsAddingSection(false); // Close the form
  };

  const handleAddPortfolio = async () => {
    if (newSectionTitle === "" || newYear === "" || newLocation === "") {
      enqueueSnackbar("Please fill all fields", { variant: "warning" });
      return;
    }

    const portfolioData = {
      title: newSectionTitle,
      year: newYear,
      location: newLocation,
      images: uploadedImages, // Array of image URLs
    };

    setUploading(true);
    try {
      // Assuming addPortfolioToDb sends the data to MongoDB
      const response = await addPortfolioToDb(portfolioData);
      if (response.success) {
        enqueueSnackbar("Portfolio added successfully!", {
          variant: "success",
        });
        addSection(response.data); // Add portfolio section to the list in parent
        handleCancel(); // Reset the form after successful submission
      } else {
        enqueueSnackbar("Error adding portfolio", { variant: "error" });
      }
    } catch (error) {
      console.log("Error uploading portfolio", error);
      enqueueSnackbar("Error uploading portfolio", { variant: "error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>Add New Portfolio Section</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="new-section-title" className="form-label">
            Section Title
          </label>
          <input
            id="new-section-title"
            type="text"
            className="form-control"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter section title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="new-year" className="form-label">
            Year
          </label>
          <input
            id="new-year"
            type="text"
            className="form-control"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            placeholder="Enter year"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="new-location" className="form-label">
            Location
          </label>
          <input
            id="new-location"
            type="text"
            className="form-control"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <MediaUpload setImages={setUploadedImages} />

        <div className="mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={handleAddPortfolio}
            disabled={uploading}
          >
            <span className="text-black">
              {uploading ? "Adding..." : "Add Portfolio"}
            </span>
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;
