import connectToDatabase from "@/lib/db.connect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case "GET":
      // Fetch all services
      try {
        const services = await db.collection("services").find({}).toArray();
        return res.status(200).json({ success: true, data: services });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch services",
          error: error.message, // Include error details
        });
      }

    case "POST":
      // Insert a new service
      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title || !description) {
          return res.status(400).json({
            success: false,
            message: "Title and description are required.",
          });
        }

        // Insert the new service into the database
        const result = await db.collection("services").insertOne({
          title,
          description,
          createdAt: new Date(),
        });

        // Check if insertion was successful
        if (result.insertedId) {
          return res.status(201).json({
            success: true,
            message: "Service added successfully",
            data: {
              ...req.body,
              _id: result.insertedId.toString(), // Ensure the ID is a string
            },
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Failed to add the service.",
          });
        }
      } catch (error) {
        console.error("Error inserting service:", error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error. Please try again later.",
          error: error.message, // Include error details
        });
      }

    case "DELETE":
      // Handle DELETE request to delete services by ID
      const { id } = req.query;
      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing ID",
        });
      }
      try {
        const result = await db
          .collection("services")
          .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Service not found",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Service deleted successfully",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to delete service",
          error: error.message, // Include error details
        });
      }

    case "PATCH":
      // Handle PATCH request to remove an image from a service
      const { serviceId, imageUrl } = req.body;
      if (!serviceId || !ObjectId.isValid(serviceId) || !imageUrl) {
        return res.status(400).json({
          success: false,
          message: "Invalid data: serviceId and imageUrl are required",
        });
      }
      try {
        const result = await db
          .collection("services")
          .updateOne(
            { _id: new ObjectId(serviceId) },
            { $pull: { images: imageUrl } }
          );

        if (result.modifiedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Service not found or image not removed",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Image removed from service",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to remove image",
          error: error.message, // Include error details
        });
      }

    case "PUT":
      // Handle PUT request to update a service
      const { updateId, title, description } = req.body;
      if (!updateId || !ObjectId.isValid(updateId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing service ID",
        });
      }
      if (!title && !description) {
        return res.status(400).json({
          success: false,
          message: "At least one field (title, description) must be provided to update",
        });
      }

      try {
        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;

        const result = await db
          .collection("services")
          .updateOne({ _id: new ObjectId(updateId) }, { $set: updateFields });

        if (result.modifiedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Service not found or no changes made",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Service updated successfully",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to update service",
          error: error.message, // Include error details
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
  }
}
