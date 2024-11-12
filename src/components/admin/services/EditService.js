import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

export default function EditService({
  service,
  isLoading,
  setIsEditing,
  onEditService,
  onRemoveService,
}) {
  const { enqueueSnackbar } = useSnackbar();

  // Local state for title and description, initially set to the service's current values
  const [editedService, setEditedService] = useState({
    _id: service._id,
    title: service.title,
    description: service.description,
  });

  useEffect(() => {
    // When the service prop changes (in case it's passed a different service for editing)
    setEditedService({
      _id: service._id,
      title: service.title,
      description: service.description,
    });
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!editedService.title || !editedService.description) {
      enqueueSnackbar("Title and Description are required", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("Saving this will permarnently update this service", {
      variant: "info",
    });
    onEditService(editedService);
  };

  const handleCancel = () => {
    setIsEditing(null); // Exit edit mode without saving
  };

  return (
    <div className="card">
      <div className="card-header pb-0 border-0 pt-6 position-relative">
        <h5 className="card-title">
          <input
            type="text"
            name="title"
            value={editedService.title}
            onChange={handleChange}
            className="form-control"
            disabled={isLoading}
          />
        </h5>
        <button
          className="btn btn-danger position-absolute end-0 top-0 translate-middle-y rounded-circle"
          onClick={() => onRemoveService(service._id)}
          disabled={isLoading}
        >
          <i className="bx bx-trash fs-5"></i>
        </button>
      </div>
      <div className="card-body">
        <textarea
          name="description"
          value={editedService.description}
          onChange={handleChange}
          className="form-control"
          rows="4"
          disabled={isLoading}
        />
      </div>
      <div className="row m-0 justify-content-between px-5 card-footer border-0">
        <button
          className="btn btn-outline-danger border border-danger col-4 d-flex justify-content-center align-items-center"
          onClick={handleCancel}
          disabled={isLoading}
        >
          <i className="bx bx-x m-0" />
          <span className="d-none d-lg-block">Cancel</span>
        </button>
        <button
          className="btn btn-success col-4 d-flex justify-content-center align-items-center"
          onClick={() => onEditService(editedService)}
          disabled={isLoading}
        >
          <i className="bx bx-save m-0" />
          <span className="d-none d-lg-block">Save</span>
        </button>
      </div>
    </div>
  );
}
