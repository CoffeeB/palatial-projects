import connectToDatabase from "@/lib/db.connect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // Access the HTTP method from the request
  const { method } = req; // This should correctly define the `method` variable

  switch (method) {
    case "GET":
      // Fetch portfolios
      try {
        const portfolios = await db.collection("portfolios").find({}).toArray();
        res.status(200).json({ success: true, data: portfolios });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Failed to fetch portfolios" });
      }
      break;

    case "POST":
      // Insert a new portfolio
      try {
        const { title, year, location, images } = req.body;
        if (!title || !year || !location || !images || images.length === 0) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required." });
        }

        const result = await db.collection("portfolios").insertOne({
          title,
          year,
          location,
          images,
          createdAt: new Date(),
        });

        res.status(201).json({
          success: true,
          data: { ...req.body, id: result.insertedId },
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;

    case "DELETE":
      // Handle DELETE request to delete portfolio by sectionId
      const { id } = req.query; // Extract sectionId from query string
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "No section ID provided." });
      }
      try {
        const result = await db
          .collection("portfolios")
          .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Portfolio not found" });
        }

        res
          .status(200)
          .json({
            success: true,
            message: "Portfolio section deleted successfully",
          });
      } catch (error) {
        res
          .status(500)
          .json({
            success: false,
            message: "Failed to delete portfolio section",
          });
      }
      break;

    case "PATCH":
      // Handle PATCH request to remove an image from portfolio section
      const { sectionId, imageUrl } = req.body;
      if (!sectionId || !imageUrl) {
        return res
          .status(400)
          .json({
            success: false,
            message: "sectionId and imageUrl are required",
          });
      }
      try {
        const result = await db
          .collection("portfolios")
          .updateOne(
            { _id: new ObjectId(sectionId) },
            { $pull: { images: imageUrl } }
          );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Portfolio section not found" });
        }

        res
          .status(200)
          .json({
            success: true,
            message: "Image removed from portfolio section",
          });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Failed to remove image" });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
      break;
  }
}
