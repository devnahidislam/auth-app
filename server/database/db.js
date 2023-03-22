import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async (req, res) => {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  try {
    mongoose.set("strictQuery", true);
    // await mongoose.connect(getUri);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection SUCCESS");
  } catch (error) {
    console.error("MongoDB Connection FAILED");
    process.exit(1);
  }
};
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected...");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection Failed...");
});

export default connectDB;
