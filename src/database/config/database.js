import "dotenv/config";
import mongoose from "mongoose";

const URL_CONNECTION = process.env.DB_URL;

async function connectToDatabase() {
  mongoose.connect(URL_CONNECTION);
  return mongoose.connection;
}

export default connectToDatabase;
