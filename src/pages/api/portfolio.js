import connectToDatabase from "@/lib/db.connect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case "GET":
      // Fetch all portfolio sections
      try {
        const portfolios = await db.collection("portfolios").find({}).toArray();
        return res.status(200).json({ success: true, data: portfolios });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch portfolios",
          error: error.message, // Include error details for debugging
        });
      }

    case "POST":
      // Insert a new portfolio section
      try {
        const { title, year, location, images } = req.body;
        if (!title || !year || !location || !images || images.length === 0) {
          return res.status(400).json({
            success: false,
            message: "All fields are required.",
          });
        }

        const result = await db.collection("portfolios").insertOne({
          title,
          year,
          location,
          images,
          createdAt: new Date(),
        });

        return res.status(201).json({
          success: true,
          data: { ...req.body, _id: result.insertedId.toString() }, // Include the new ID
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message, // Include error details for debugging
        });
      }

    case "DELETE":
      // Handle DELETE request to delete portfolio section by ID
      const { id } = req.query;
      if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing ID",
        });
      }
      try {
        const result = await db
          .collection("portfolios")
          .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Portfolio section not found",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Portfolio section deleted successfully",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to delete portfolio section",
          error: error.message, // Include error details for debugging
        });
      }

    case "PATCH":
      // Handle PATCH request to remove an image from a portfolio section
      const { sectionId, imageUrl } = req.body;
      if (!sectionId || !ObjectId.isValid(sectionId) || !imageUrl) {
        return res.status(400).json({
          success: false,
          message: "Invalid data: sectionId and imageUrl are required",
        });
      }
      try {
        const result = await db
          .collection("portfolios")
          .updateOne(
            { _id: new ObjectId(sectionId) },
            { $pull: { images: { secure_url: imageUrl } } }
          );

        if (result.modifiedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Portfolio section not found or image not removed",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Image removed from portfolio section",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to remove image",
          error: error.message, // Include error details for debugging
        });
      }

    case "PUT":
      // Handle PUT request to update a portfolio section
      const { updateId, title, year, location, images } = req.body;
      if (!updateId || !ObjectId.isValid(updateId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid or missing section ID",
        });
      }
      if (!title && !year && !location && !images) {
        return res.status(400).json({
          success: false,
          message:
            "At least one field (title, year, location, images) must be provided to update",
        });
      }

      try {
        const updateFields = {};
        if (title) updateFields.title = title;
        if (year) updateFields.year = year;
        if (location) updateFields.location = location;
        if (images) updateFields.images = images;

        const result = await db
          .collection("portfolios")
          .updateOne({ _id: new ObjectId(updateId) }, { $set: updateFields });

        if (result.modifiedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Portfolio section not found or no changes made",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Portfolio section updated successfully",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Failed to update portfolio section",
          error: error.message, // Include error details for debugging
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
  }
}
