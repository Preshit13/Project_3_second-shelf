import { MongoClient } from "mongodb";

let db;

export async function connectDB() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  db = client.db();
  console.log("Connected to MongoDB");
}

export function getDB() {
  if (!db) throw new Error("Database not connected");
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "second_shelf";

let client;
let db;

export async function connectToMongo() {
  if (!uri) {
    throw new Error("Missing MONGO_URI in environment variables");
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`Connected to MongoDB database: ${dbName}`);
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToMongo() first.");
  }

  return db;
}
