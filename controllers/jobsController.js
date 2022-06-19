import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const createJob = async (req, res, next) => {
  try {
    const { position, company } = req.body;

    if (!position || !company) {
      throw new BadRequestError("Position and company are required");
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res) => {
  res.send("delete Job");
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  res.send("update Job");
};

const showStats = async (req, res) => {
  res.send("stats Job");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
