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
