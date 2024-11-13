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
      return data;
    } else {
      console.error("Error uploading file to Cloudinary:", data);
      // throw new Error("Error uploading file to Cloudinary");
    }
  } catch (error) {
    console.error("Error:", error);
    // throw error;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    // Fetch the signature and timestamp from your backend
    const response = await fetch("/api/generateDeleteSignature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error generating signature:", errorData);
      return false;
    }

    const data = await response.json();
    const { signature, timestamp } = data;

    // Send the delete request to Cloudinary
    const deleteResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: JSON.stringify({
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, // Your Cloudinary API Key
          timestamp: timestamp,
          signature: signature,
          public_id: publicId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deleteData = await deleteResponse.json();

    if (deleteData.result === "ok") {
      console.log("File deleted successfully");
      return true;
    } else {
      console.error("Error deleting file:", deleteData);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
