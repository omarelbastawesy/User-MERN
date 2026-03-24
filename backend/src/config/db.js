import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTIONS);
    console.log("connected with DB is done.");
  } catch (error) {
    console.error("Error with the connected with DB", error);
  }
};

export default connectDB;
