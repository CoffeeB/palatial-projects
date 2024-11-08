import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

const connectToDatabase = async () => {
  // Log to check if the URI is being loaded properly
  console.log("MongoDB URI:", process.env.MONGODB_URI);

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    useUnifiedTopology: true, // removed deprecated option useNewUrlParser
  });

  try {
    // Just connect without checking if the client is already connected
    await client.connect();

    const db = client.db(); // MongoDB URI already includes the db name
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectToDatabase;
