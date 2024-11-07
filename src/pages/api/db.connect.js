// lib/db.connect.js

import { MongoClient } from "mongodb";

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to avoid opening multiple connections
  let globalWithMongoClient = global;
  if (!globalWithMongoClient._mongoClientPromise) {
    globalWithMongoClient._mongoClientPromise = MongoClient.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
  clientPromise = globalWithMongoClient._mongoClientPromise;
} else {
  // In production, it's safe to create the client and promise directly
  clientPromise = MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function connectToDatabase() {
  if (!client) {
    client = await clientPromise;
  }
  return client.db(); // returns the MongoDB database instance
}

export default connectToDatabase;
