import Image from "next/image";
import { useState } from "react";

export default function PortfolioManager() {
  const [sections, setSections] = useState([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false); // Toggle between viewing sections and adding a new section
  const [sortOrder, setSortOrder] = useState("newest"); // Controls sorting by "newest" or "year"
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to handle adding a new section
  const addSection = () => {
    if (newSectionTitle.trim() === "" || newYear.trim() === "" || newLocation.trim() === "") return;

    const newSection = {
      id: Date.now().toString(),
      title: newSectionTitle,
      year: newYear,
      location: newLocation,
      images: [],
      newImage: "", // Initialize each section with its own image input field
      isEditing: false, // Track if the section is being edited
    };

    setSections([...sections, newSection]);
    setNewSectionTitle("");
    setNewYear("");
    setNewLocation("");
    setIsAddingSection(false); // Switch back to viewing sections
  };

  // Function to handle adding an image to a section
  const addImage = (sectionId) => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
    const section = sections[sectionIndex];

    if (section.newImage.trim() === "") return;

    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...section,
      images: [...section.images, section.newImage],
      newImage: "", // Clear the input after adding the image
    };

    setSections(updatedSections);
  };

  // Function to handle removing an image from a section
  const removeImage = (sectionId, imageUrl) => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
    const section = sections[sectionIndex];

    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...section,
      images: section.images.filter((img) => img !== imageUrl), // Filter out the image to be removed
    };

    setSections(updatedSections);
  };

  // Function to handle deleting a section
  const deleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  // Function to handle editing a section
  const editSection = (sectionId, field, value) => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value, // Dynamically update the field
    };
    setSections(updatedSections);
  };

  // Toggle edit mode for a section
  const toggleEditMode = (sectionId) => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      isEditing: !updatedSections[sectionIndex].isEditing, // Toggle editing mode
    };
    setSections(updatedSections);
  };

  // Function to sort sections based on selected criteria
  const sortedSections = sections
    .filter((section) => {
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

  return (
    <>
      <section className="row m-0 px-3 pt-10">
        <div className="mx-auto mt-10 position-relative">
          <h1 className="h2 mb-4">Manage Portfolio</h1>


          {!isAddingSection ? (
            // Show the list of portfolio sections and manage them
            <>
              {/* Sorting Control */}
              <div className="mb-4">
                <button
                  className="btn btn-info me-2"
                  onClick={() => setSortOrder("newest")}
                >
                  <span className="text-black">Sort by Newest</span>
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => setSortOrder("year")}
                >
                  <span className="text-black">Sort by Year</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title, year, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary mb-4 d-flex align-items-center position-absolute top-0 end-0"
                onClick={() => setIsAddingSection(true)} // Switch to the Add Section form
              >
                <span className="text-black d-none d-lg-block">Add Section</span>
                <i className="bx bx-plus text-black" />
              </button>

              {sortedSections.length === 0 ? (
                <p>No sections available. Click &nbsp;&lsquo; Add Section &rsquo;&nbsp; to create one.</p>
              ) : (
                sortedSections.map((section) => (
                  <div key={section.id} className="card mb-4">
                    <div className="card-header border-0 pb-0 d-flex justify-content-between align-items-center">
                      <div>
                        {section.isEditing ? (
                          <div className="d-flex align-items-center">
                            <label htmlFor="title" className="fw-bold">Title</label>&nbsp;
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              value={section.title}
                              onChange={(e) => editSection(section.id, "title", e.target.value)}
                            />
                          </div>
                        ) : (
                          <h5>{section.title}</h5>
                        )}
                      </div>
                      <div>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => toggleEditMode(section.id)}
                        >
                          {section.isEditing ? (
                            <span className="text-black d-none d-lg-block">Save</span>
                          ) : (
                            <span className="text-black d-none d-lg-block">Edit</span>
                          ) }
                          {section.isEditing ? (
                            <i className="text-black d-lg-none bx bx-check"></i>
                          ) : (
                            <i className="text-black d-lg-none bx bxs-pencil"></i>
                          )}
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => deleteSection(section.id)}
                        >
                          <span className="text-white d-lg-block d-none">Delete Section</span>
                          <i className="text-white bx bx-trash d-lg-none"/>
                        </button>
                      </div>
                    </div>
                    <div className="card-body pt-1">
                      <div className="d-flex gap-3 mb-2">
                        {section.isEditing ? (
                          <div className="flex-column">
                            <div className="d-flex align-items-center">
                              <label htmlFor="year" className="fw-bold">Year</label>&nbsp;
                              <input
                                type="text"
                                name="year"
                                className="form-control"
                                value={section.year}
                                onChange={(e) => editSection(section.id, "year", e.target.value)}
                              />
                            </div>
                            <div className="d-flex align-items-center">
                            <label htmlFor="location" className="fw-bold">Location</label>&nbsp;
                              <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={section.location}
                                onChange={(e) => editSection(section.id, "location", e.target.value)}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex-column">
                            <p className="mb-1">
                              <span className="fw-bold">Year:</span> {section.year}</p>
                            <p className="mb-1"><span className="fw-bold">Location:</span> {section.location}</p>
                          </div>
                        )}
                      </div>

                      {/* Add Image Form */}
                      <div className="mb-3">
                        <label
                          htmlFor={`new-image-${section.id}`}
                          className="form-label"
                        >
                          Add Image URL
                        </label>
                        <div className="d-flex gap-3">
                          <input
                            id={`new-image-${section.id}`}
                            type="text"
                            className="form-control"
                            value={section.newImage} // Each section has its own newImage state
                            onChange={(e) => {
                              const updatedSections = [...sections];
                              updatedSections.find((sec) => sec.id === section.id).newImage = e.target.value;
                              setSections(updatedSections);
                            }}
                            placeholder="Enter image URL"
                          />
                          <button
                            className="btn btn-success"
                            onClick={() => addImage(section.id)}
                          >
                            <span className="text-black d-lg-block d-none">Add Image</span>
                            <i className="text-black bx bxs-image-add d-lg-none" />
                          </button>
                        </div>
                      </div>

                      {/* Display Section Images */}
                      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {section.images.map((image, index) => (
                          <div key={index} className="col">
                            <div className="position-relative">
                              <Image
                                width={1080}
                                height={1080}
                                src={`/${image}`}
                                alt={`Portfolio item ${index + 1}`}
                                className="img-fluid rounded-3"
                                style={{ height: "200px", objectFit: "cover" }}
                              />
                              <button
                                className="position-absolute bg-transparent border-0 top-0 end-0"
                                onClick={() => removeImage(section.id, image)} // Remove image functionality
                              >
                                <i className="bx bxs-trash text-white fs-5 btn btn-danger rounded-circle"/>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          ) : (
            // Show form to add a new section
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Add New Section</h5>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-end gap-3">
                  <div className="flex-grow-1">
                    <label htmlFor="new-section" className="form-label">
                      Section Title
                    </label>
                    <input
                      id="new-section"
                      type="text"
                      className="form-control"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      placeholder="Enter section title"
                    />
                  </div>
                </div>

                <div className="d-flex align-items-end gap-3 mt-3">
                  <div className="flex-grow-1">
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
                </div>

                <div className="d-flex align-items-end gap-3 mt-3">
                  <div className="flex-grow-1">
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
                </div>

                <button className="btn btn-primary mt-3" onClick={addSection}>
                  <span className="text-black">Add Section</span>
                </button>

                <button
                  className="btn btn-secondary mt-3 ms-2"
                  onClick={() => setIsAddingSection(false)} // Switch back to viewing sections
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
