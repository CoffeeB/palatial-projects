export const addPortfolioToDb = async (portfolioData) => {
  try {
    const response = await fetch("/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolioData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Portfolio added successfully:", data);
      // Do something with the response data, e.g., add to the UI
      return data;
    } else {
      console.error("Error adding portfolio:", data.message);
    }
  } catch (error) {
    console.error("Error in addPortfolioToDb:", error);

    // Return a more detailed error message
    return {
      success: false,
      message: error.message || "Error submitting portfolio",
    };
  }
};

export const updatePortfolioSection = async (sectionId, updatedData) => {
  try {
    const response = await fetch(`/api/portfolio`, {
      method: "PUT", // Use PUT to update data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateId: sectionId, // Send the sectionId for which the update is required
        ...updatedData, // Spread the updated data (title, year, location, images, etc.)
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Portfolio section updated successfully:", data);
      return data; // Return updated data to handle on the UI or elsewhere
    } else {
      console.error("Error updating portfolio section:", data.message);
      return {
        success: false,
        message: data.message || "Failed to update portfolio section.",
      };
    }
  } catch (error) {
    console.error("Error in updateSection:", error);
    return {
      success: false,
      message: error.message || "Error updating portfolio section",
    };
  }
};

export const deleteService = async (id) => {
  try {
    const response = await fetch(`/api/services?id=${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      return result.message; // Success message
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    throw new Error("Failed to delete service");
  }
};

export const updateService = async (updateId, title, description) => {
  try {
    const response = await fetch("/api/services", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updateId, title, description }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: result.message }; // Ensure a consistent response
    } else {
      return { success: false, message: result.message }; // Handle unsuccessful response
    }
  } catch (error) {
    console.error("Error updating service:", error);
    return { success: false, message: "Failed to update service" }; // Return a failure message
  }
};

export const addService = async (newService) => {
  try {
    const response = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: result.message }; // Ensure a consistent response
    } else {
      return { success: false, message: result.message }; // Handle unsuccessful response
    }
  } catch (error) {
    console.error("Error adding service:", error);
    throw new Error("Failed to add service");
  }
};
