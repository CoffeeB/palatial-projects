import { useState, useEffect } from "react";
import EditableSection from "./EditableSection";
import { useSnackbar } from "notistack";

// Main List Component
const PortfoliosList = ({
  sections,
  updateSection,
  deleteImage,
  handleImageDelete,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isEditing, setIsEditing] = useState(null); // Tracks the section being edited

  const handleUpdateSection = async (sectionId, updatedData) => {
    try {
      // Call API or update locally to persist changes to the backend
      await updateSection(sectionId, updatedData);
      enqueueSnackbar("Section updated successfully!", { variant: "success" });
      setIsEditing(null); // Exit edit mode after update
    } catch (error) {
      enqueueSnackbar("Error updating section", { variant: "error" });
    }
  };

  return (
    <div>
      {sections.length === 0 ? (
        <p>No sections available.</p>
      ) : (
        sections.map((section) => (
          <div key={section._id} className="mb-4">
            {/* Conditionally render EditableSection for each portfolio */}
            {isEditing === section._id ? (
              <EditableSection
                section={section}
                updateSection={handleUpdateSection}
                deleteImage={deleteImage}
                handleImageDelete={handleImageDelete}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
              />
            ) : (
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <div className="row m-0 align-items-center justify-content-between">
                    <h5 className="px-0 col-md-8 col-6 mb-0">
                      {section.title}
                    </h5>
                    <div className="row m-0 align-items-center col-auto">
                      <button
                        className="btn btn-danger p-2 mx-1 col-auto"
                        onClick={() => deleteSection(section._id)}
                      >
                        <span className="d-none d-lg-block">
                          Delete Section
                        </span>
                        <i className="bx bxs-trash d-lg-none" />
                      </button>
                      <button
                        className="btn btn-warning col-auto mx-1"
                        onClick={() => setIsEditing(section._id)} // Set section to edit
                      >
                        <span className="text-black d-none d-lg-block">
                          Edit
                        </span>
                        <i className="text-black bx bxs-pen d-lg-none" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p>{section.year}</p>
                  <p>{section.location}</p>
                  {/* Displaying existing images */}
                  <div className="row m-0">
                    {section.images.map((image, index) => (
                      <div key={index} className="col-3 position-relative">
                        <img
                          src={image}
                          alt={`Section image ${index}`}
                          className="img-fluid"
                          style={{ objectFit: "cover", height: "150px" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PortfoliosList;
