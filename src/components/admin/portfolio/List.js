import { useState, useEffect } from "react";
import EditableSection from "./EditableSection";
import { useSnackbar } from "notistack";
import Image from "next/image";

// Main List Component
const PortfoliosList = ({
  sections,
  deleteImage,
  handleImageDelete,
  deleteSection,
  setSections,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isEditing, setIsEditing] = useState(null); // Tracks the section being edited

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
                deleteImage={deleteImage}
                handleImageDelete={handleImageDelete}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                deleteSection={deleteSection}
                sections={sections}
                setSections={setSections}
              />
            ) : (
              <div className="card shadow shadow-light">
                <div className="card-header border-1 border-light pb-3">
                  <div className="row m-0 align-items-center justify-content-between">
                    <h5 className="px-0 col-md-8 col-6 mb-0 text-capitalize fw-light">
                      {section.title}
                    </h5>
                    <div className="row m-0 align-items-center col-auto">
                      <button
                        className="btn btn-danger mx-1 col-auto text-nowrap d-flex align-items-center"
                        onClick={() => deleteSection(section._id)}
                      >
                        <i className="bx bxs-trash me-lg-1" />
                        <span className="d-none d-lg-block">Remove</span>
                      </button>
                      <button
                        className="btn col-auto mx-1 px-4 btn-outline-warning border-1 border-warning d-flex align-items-center"
                        onClick={() => setIsEditing(section._id)} // Set section to edit
                      >
                        <i className=" bx bxs-edit m-0 me-lg-1" />
                        <span className=" d-none d-lg-block">Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="fs-5 text-warning">
                    <i className="bx bxs-calendar-check"></i>
                    &nbsp;
                    {section?.year}
                  </p>
                  <p className="fs-5 text-capitalize text-info">
                    <i className="bx bxs-location-plus"></i>
                    &nbsp;
                    {section.location}
                  </p>
                  {/* Displaying existing images */}
                  <div className="row m-0 flex-nowrap overflow-x-auto">
                    {section.images.map((image, index) => (
                      <div
                        key={index}
                        className="col-lg-2 col-md-4 position-relative my-2"
                      >
                        <Image
                          width={500}
                          height={500}
                          src={image}
                          alt={`Section image ${index}`}
                          className="img-fluid rounded-3"
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
