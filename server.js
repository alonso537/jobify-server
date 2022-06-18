import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
dotenv.config();

//routes
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";

app.use(express.json());

app.get("/", (req, res) => {
  //   throw new Error("Error");
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port} and connected to MongoDB`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
