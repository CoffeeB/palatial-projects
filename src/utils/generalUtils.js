const uploadToCloudinary = async (file) => {
  try {
    const resourceType = "auto";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("resource_type", resourceType);
    formData.append("upload_preset", "palatial-projects"); // Replace with your Cloudinary upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dnqhxlaxs/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Error uploading file to Cloudinary:", data);
      // throw new Error("Error uploading file to Cloudinary");
    }
  } catch (error) {
    console.error("Error:", error);
    // throw error;
  }
};
export { uploadToCloudinary };
