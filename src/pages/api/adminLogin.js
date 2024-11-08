import connectToDatabase from "@/lib/db.connect"; // Adjust according to your paths

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    try {
      // Connect to the database
      const { db } = await connectToDatabase();

      // Find user in the database
      const user = await db.collection("users").findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Directly compare plain-text passwords
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Login success
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.log("Error during login:", error); // Log the error for debugging
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // If not POST request
    return res.status(405).json({ error: "Method not allowed" });
  }
}
