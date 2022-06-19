import { readFile } from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import Job from "./models/Job.js";
