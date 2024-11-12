// components/ServiceCard.js
import { useSnackbar } from "notistack";

export default function ServiceCard({
  service,
  setIsEditing,
  isLoading,
  index,
}) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div className="card">
      <div className="card-header pb-0 border-0 pt-6 position-relative">
        <h5 className="card-title">{service.title}</h5>

        {/* Edit and Delete buttons */}
        <button
          className="btn btn-warning position-absolute end-0 top-0 translate-middle-y rounded-circle ms-2"
          onClick={() => setIsEditing(service._id)}
          disabled={isLoading}
        >
          <i className="bx bx-edit fs-5" />
        </button>
      </div>
      <div className="card-body">
        <p>{service.description}</p>
      </div>
    </div>
  );
}
