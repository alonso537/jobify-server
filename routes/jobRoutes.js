import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  showStats,
  updateJob,
} from "../controllers/jobsController.js";

router.route("/createJob").post(createJob);
router.route("/").get(getAllJobs);
router.route("/updateJob").patch(updateJob);

router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob);

export default router;
