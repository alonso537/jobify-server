import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.createConnection(url);
};

export default connectDB;
