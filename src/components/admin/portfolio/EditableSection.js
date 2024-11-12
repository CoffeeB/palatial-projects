import { useState } from "react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { uploadToCloudinary } from "@/utils/generalUtils";
import { updatePortfolioSection } from "@/utils/dbUtils";

const EditableSection = ({
  section,
  handleImageDelete,
  isEditing,
  setIsEditing,
  deleteSection,
  sections,
  setSections,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [newImages, setNewImages] = useState([]); // New images to be added
  const [updatedSection, setUpdatedSection] = useState({
    title: section.title,
    year: section.year,
    location: section.location,
  });

  const handleEditChange = (field, value) => {
    setUpdatedSection({
      ...updatedSection,
      [field]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImageUrls = [];

      // Upload each image to Cloudinary and get the URL
      for (const file of files) {
        try {
          const url = await uploadToCloudinary(file);
          newImageUrls.push(url);
        } catch (error) {
          enqueueSnackbar("Error uploading image", { variant: "error" });
        }
      }

      setNewImages((prevImages) => [...prevImages, ...newImageUrls]);
    }
  };

  const handleImageDeleteLocal = (image) => {
    setNewImages(newImages.filter((img) => img !== image));
  };

  const handleSave = async () => {
    enqueueSnackbar("Saving this will permarnently update this section", {
      variant: "info",
    });
    enqueueSnackbar("Are you sure you want to save these changes?", {
      variant: "warning",
      action: (key) => (
        <>
          <button
            onClick={async () => {
              try {
                const updatedData = {
                  ...updatedSection,
                  images: [...newImages, ...section.images], // Prepend new images to the existing ones
                };

                // Call the API to update the portfolio section
                const data = await updatePortfolioSection(
                  section._id,
                  updatedData
                );

                if (data.success) {
                  // Update sections state with the new updated section data
                  const updatedSections = sections.map((s) =>
                    s._id === section._id ? { ...s, ...updatedData } : s
                  );
                  setSections(updatedSections); // Update state with the modified section data

                  setIsEditing(false); // Stop editing after saving
                  enqueueSnackbar("Section updated successfully!", {
                    variant: "success",
                  });
                } else {
                  throw new Error("Failed to update the section");
                }
              } catch (error) {
                enqueueSnackbar("Error updating section", { variant: "error" });
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
            onClick={() => closeSnackbar(key)} // Close the snackbar if user cancels
            className="btn btn-outline-danger border border-danger rounded-1 p-0"
          >
            Cancel
          </button>
        </>
      ),
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-header border-0 pb-0">
        <div className="row m-0 align-items-center justify-content-between">
          <div className="row m-0 align-items-center justify-content-between px-0">
            {isEditing ? (
              <div className="mb-2 col-lg-8 col-6 px-0">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedSection.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                />
              </div>
            ) : (
              <h5 className="px-0 col-lg-8 col-6 mb-0">section.title</h5>
            )}
            <div className="row m-0 align-items-center col-auto">
              <button
                className="btn btn-danger p-2 mx-1 col-auto d-flex align-items-center justify-content-center"
                onClick={() => deleteSection(section._id)}
              >
                <span className="d-none d-lg-block">Delete Section</span>
                <i className="bx bxs-trash d-lg-none" />
              </button>
              <button
                className="btn btn-outline-success border border-success d-flex align-items-center justify-content-center p-2 col-1"
                onClick={() => {
                  if (isEditing) {
                    handleSave(); // Save changes
                  } else {
                    setIsEditing(true); // Start editing
                  }
                }}
              >
                <span className="d-none d-lg-block">
                  {isEditing ? "Save" : "Edit"}
                </span>
                <i className="bx bx-check d-lg-none" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body pt-2">
        <div className="mb-2">
          <label>Year</label>
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              value={updatedSection.year}
              onChange={(e) => handleEditChange("year", e.target.value)}
            />
          ) : (
            <p>{section.year}</p>
          )}
        </div>

        <div className="mb-2">
          <label>Location</label>
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              value={updatedSection.location}
              onChange={(e) => handleEditChange("location", e.target.value)}
            />
          ) : (
            <p>{section.location}</p>
          )}
        </div>

        <div className="mb-2">
          <label>Images</label>
          <div className="mt-3">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="form-control mb-2"
            />
            <div className="row m-0">
              {newImages.map((image, index) => (
                <div
                  key={`new-image-${index}`}
                  className="col-auto p-2 position-relative"
                >
                  <Image
                    src={image}
                    alt={`New Image ${index}`}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => handleImageDeleteLocal(image)}
                  >
                    <i className="bx bxs-trash fs-5" />
                  </button>
                </div>
              ))}

              {section.images.map((image, index) => (
                <div
                  key={`existing-image-${index}`}
                  className="col-auto p-2 position-relative"
                >
                  <Image
                    src={image}
                    alt={`Existing Image ${index}`}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={() => handleImageDelete(section._id, image)}
                  >
                    <i className="bx bxs-trash fs-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-2">
          {isEditing ? (
            <button
              className="btn col-auto mx-1 px-4 btn-outline-danger border-1 border-danger d-flex align-items-center"
              onClick={() => setIsEditing()} // Set section to edit
            >
              <i className=" bx bx-x m-0" />
              <span className=" d-none d-lg-block">Cancel</span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableSection;
