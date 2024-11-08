import { useState } from "react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { uploadToCloudinary } from "@/utils/generalUtils";

const EditableSection = ({
  section,
  updateSection,
  deleteImage,
  handleImageDelete,
  isEditing,
  setIsEditing,
}) => {
  const { enqueueSnackbar } = useSnackbar();

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
    try {
      const updatedData = {
        ...updatedSection,
        images: [...newImages, ...section.images], // Prepend new images to the existing ones
      };

      await updateSection(section._id, updatedData);
      setIsEditing(false); // Stop editing after saving
      enqueueSnackbar("Section updated successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error updating section", { variant: "error" });
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header border-0 pb-0">
        <div className="row m-0 align-items-center justify-content-between">
          <div className="row m-0 align-items-center justify-content-between">
            <h5 className="px-0 col-lg-8 col-6 mb-0">
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={updatedSection.title}
                  onChange={(e) => handleEditChange("title", e.target.value)}
                />
              ) : (
                section.title
              )}
            </h5>
            <div className="row m-0 align-items-center col-auto">
              <button
                className="btn btn-danger p-2 mx-1 col-auto"
                onClick={() => deleteSection(section._id)}
              >
                <span className="d-none d-lg-block">Delete Section</span>
                <i className="bx bxs-trash d-lg-none" />
              </button>
              <button
                className="btn btn-warning d-flex align-items-center justify-content-center p-2 col-2"
                onClick={() => {
                  if (isEditing) {
                    handleSave(); // Save changes
                  } else {
                    setIsEditing(true); // Start editing
                  }
                }}
              >
                {isEditing ? "Save" : "Edit"}
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
                  className="col-auto position-relative"
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
                  className="col-auto position-relative"
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
      </div>
    </div>
  );
};

export default EditableSection;
