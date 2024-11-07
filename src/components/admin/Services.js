import { useState, useEffect } from 'react';

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      setServices([
      ]);
    } catch (err) {
      setError('Failed to fetch services. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setError('');
    setIsAdding(true)
    setIsLoading(true);

    if (!newService.title || !newService.description) {
      setError('Please fill in all fields and ensure price is greater than 0.');
      setIsAdding(false)
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      const addedService = { ...newService, id: Date.now().toString() };
      setServices([...services, addedService]);
      setNewService({ title: '', description: '', price: 0 });
    } catch (err) {
        setError('Failed to add service. Please try again.');
    } finally {
        setIsAdding(false)
      setIsLoading(false);
    }
  };

  const handleRemoveService = async (id) => {
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      setServices(services.filter(service => service.id !== id));
    } catch (err) {
      setError('Failed to remove service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row m-0 px-3 py-10">
      <h1 className="h2 font-bold mb-6">Manage Services</h1>

      {/* Add New Service Form */}
      <div className="card mb-5">
        <div className="card-header border-0">
          <h5 className="card-title">Add New Service</h5>
          <p className="card-text">Fill in the details to add a new service</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddService} className="mb-4">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Service Title</label>
              <input
                id="title"
                type="text"
                className="form-control"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                placeholder="e.g., Web Design"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Describe the service..."
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                <span className="text-black">

              {isAdding ? 'Adding...' : 'Add Service'}
                </span>
            </button>
          </form>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Services List */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 m-0 g-4">
        {services.map((service) => (
          <div key={service.id} className="col">
            <div className="card">
              <div className="card-header pb-0 border-0 pt-6 position-relative">
                <h5 className="card-title">{service.title}</h5>
                <button
                  className="btn btn-danger position-absolute end-0 top-0 translate-middle-y rounded-circle"
                  onClick={() => handleRemoveService(service.id)}
                  disabled={isLoading}
                >
                  <i className="bx bx-trash fs-5"></i>
                </button>
              </div>
              <div className="card-body">
                <p>{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Services Available */}
      {services.length === 0 && !isLoading && (
        <div className="card border-0">
          <div className="card-body text-center">
            <p className="text-muted">No services available. Add a new service to get started.</p>
          </div>
        </div>
      )}
    </div>
  );
}
