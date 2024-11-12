// components/services/AddService.js
import { useState } from "react";

export default function AddService({ isLoading, onAddService, isEditing }) {
  const [newService, setNewService] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddService(newService);
    setNewService({ title: "", description: "" });
  };

  const isDisabled = isEditing === undefined || isEditing;
  const shouldHideButton = isEditing === undefined || isEditing;

  return (
    <div className="card mb-5">
      <div className="card-header border-0">
        <h5 className="card-title">Add New Service</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Service Title
            </label>
            <input
              id="title"
              type="text"
              className="form-control"
              disabled={isLoading || isDisabled}
              value={newService.title}
              onChange={(e) =>
                setNewService({ ...newService, title: e.target.value })
              }
              placeholder="e.g., Web Design"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              value={newService.description}
              disabled={isLoading || isDisabled}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              placeholder="Describe the service..."
            />
          </div>
          {!isDisabled && (
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading || isDisabled}
            >
              <span className="text-black">
                {isLoading ? "Adding..." : "Add Service"}
              </span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
