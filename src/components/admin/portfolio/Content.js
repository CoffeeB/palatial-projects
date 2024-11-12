// components/PortfolioManagerContent.js
import React from "react";
import PortfoliosList from "./List";
import PortfolioForm from "./Form";

const PortfolioManagerContent = ({
  sections,
  isAddingSection,
  sortOrder,
  searchQuery,
  setSortOrder,
  setIsAddingSection,
  addSection,
  deleteSection,
  handleImageDelete,
  setSearchQuery,
  isEditing,
  setIsEditing,
  setSections,
}) => {
  return (
    <div className="my-5">
      <h1 className="h2 mb-4">Manage Portfolio</h1>

      <div className="mb-4">
        {/* Search Bar */}
        <input
          type="text"
          className="form-control"
          placeholder="Search portfolio sections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
        />
      </div>

      {!isAddingSection ? (
        <div>
          <div className="mb-4 d-flex justify-content-between">
            <div className="">
              <button
                className="btn btn-info me-2"
                onClick={() => setSortOrder("latest")}
              >
                <span className="text-black">Sort by Latest</span>
              </button>
              <button
                className="btn btn-info me-2"
                onClick={() => {
                  setSortOrder((prevOrder) =>
                    prevOrder === "year_asc" ? "year_desc" : "year_asc"
                  );
                }}
              >
                <span className="text-black">Sort by Year</span>
              </button>
            </div>
            <button
              className="btn btn-primary mb-4 d-flex align-items-center"
              onClick={() => setIsAddingSection(true)}
            >
              <span className="text-black me-lg-1 d-none d-lg-block">
                Add New Section
              </span>
              <i className="text-black bx bx-plus" />
            </button>
          </div>
          <PortfoliosList
            sections={sections}
            deleteSection={deleteSection}
            handleImageDelete={handleImageDelete}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            setSections={setSections}
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

export default PortfolioManagerContent;
