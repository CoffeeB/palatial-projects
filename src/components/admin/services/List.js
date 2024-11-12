// components/services/List.js
import EditService from "./EditService";
import ServiceCard from "./Service";

export default function ServicesList({
  services,
  setIsEditing,
  isEditing,
  isLoading,
  onEditService,
  onRemoveService,
}) {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 m-0 g-4">
      {services.map((service) => (
        <div key={service._id} className="col">
          {isEditing === service._id ? (
            <EditService
              service={service}
              onSave={onEditService}
              setIsEditing={setIsEditing}
              onEditService={onEditService}
              onRemoveService={onRemoveService}
            />
          ) : (
            <ServiceCard
              service={service}
              setIsEditing={setIsEditing}
              isLoading={isLoading}
            />
          )}
        </div>
      ))}
    </div>
  );
}
