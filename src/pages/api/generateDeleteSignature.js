import cloudinary from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET, // Use the server-side secret key
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    // Generate the timestamp for the signature (current time in seconds)
    const timestamp = Math.floor(Date.now() / 1000);

    // Construct the string to sign
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}`;

    // Generate the signature using the API secret (server-side)
    const signature = cloudinary.utils.api_sign_request(
      { public_id: publicId, timestamp: timestamp },
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET // Use the correct secret key
    );

    // Log the generated signature for debugging
    console.log("Generated Signature:", signature);

    // Send the signature and timestamp back to the client
    return res.status(200).json({
      signature,
      timestamp,
    });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
