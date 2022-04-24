import mongoose from "mongoose";

async function dbConnect() {
  const mongoDB = process.env.MONGODB_URI as string;
  const db = await mongoose.connect(mongoDB);
  return db;
}

export default dbConnect;
