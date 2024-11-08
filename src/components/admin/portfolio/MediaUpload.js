// components/ImageUpload.js
import { useState } from "react";
import { useSnackbar } from "notistack";
import Image from "next/image";
import { uploadToCloudinary } from "@/utils/generalUtils"; // Assuming you have this utility for uploading to Cloudinary

const MediaUpload = ({ setImages }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedFiles.length > 20) {
      enqueueSnackbar("You can only upload a maximum of 20 images.", {
        variant: "warning",
      });
      return;
    }

    // Update the selected files and generate image previews
    const newFiles = [...selectedFiles, ...files];
    const newPreviews = [...imagePreviews];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    });

    setSelectedFiles(newFiles);
  };

  const handleImageSubmit = async () => {
    if (uploading) return;

    setUploading(true);
    enqueueSnackbar("Uploading images...", { variant: "info" });

    const uploadedUrls = [];

    // Iterate over selected files and upload them to Cloudinary
    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        const mediaUrl = await uploadToCloudinary(file);
        if (mediaUrl) {
          console.log("mediaUrl", mediaUrl);
          uploadedUrls.push(mediaUrl); // Store the Cloudinary URL
        }
      } catch (error) {
        enqueueSnackbar("Error uploading image to Cloudinary", {
          variant: "error",
        });
      }
      console.log("uploadedUrls", uploadedUrls);
    });

    await Promise.all(uploadPromises);

    // Update the images array with the Cloudinary URLs
    setImages(uploadedUrls);
    setSelectedFiles([]); // Reset selected files
    setImagePreviews([]); // Reset image previews
    setUploading(false);
    enqueueSnackbar("Images uploaded successfully.", { variant: "success" });
  };

  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Upload Image(s)</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          multiple
          onChange={handleImageUpload}
        />
      </div>

      <div className="d-flex flex-wrap mb-3">
        {imagePreviews.map((preview, index) => (
          <div
            key={index}
            className="position-relative m-3"
            style={{ width: "100px", height: "100px" }}
          >
            <Image
              src={preview}
              alt={`preview-${index}`}
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0"
              onClick={() => {
                setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
                setImagePreviews((prev) => prev.filter((_, i) => i !== index));
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn btn-success"
        onClick={handleImageSubmit}
        disabled={uploading || selectedFiles.length === 0}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default MediaUpload;
