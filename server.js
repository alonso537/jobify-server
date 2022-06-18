import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/connect.js";
dotenv.config();

//routes
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import "express-async-errors";

const app = express();

connectDB();

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import auth from "./middleware/authenticateuser.js";

app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  //   throw new Error("Error");
  res.json({ msg: "Hello World!" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", auth, jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port} `);
});
