import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
  } catch (error) {
    console.error("Error connecting to database:", error);
    return null;
  }
};
export default connectToDatabase;
