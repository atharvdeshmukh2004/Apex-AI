import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn(
      "MONGODB_URI is not set in environment. Skipping DB connection."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      // recommended options are handled by mongoose defaults in newer versions
    });
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message || error);
  }
};
