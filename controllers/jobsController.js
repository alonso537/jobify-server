import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/CheckPermissions.js";
import mongoose from "mongoose";

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

const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
      throw new NotFoundError("Job not found");
    }

    checkPermissions(req.user, job.createdBy);

    await job.remove();

    res.status(StatusCodes.OK).json({ message: "Job deleted" });
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    // console.log(jobId);
    const { company, position } = req.body;
    if (!position || !company) {
      throw new BadRequestError("Position and company are required");
    }

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
      throw new NotFoundError("Job not found");
    }

    // check permissions
    // console.log(req.user.userId);
    // console.log(job.createdBy);

    checkPermissions(req.user, job.createdBy);

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
    });
    //  job.position = position;
    //  job.company = company;

    // await job.save();

    res.status(StatusCodes.OK).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};

const showStats = async (req, res, next) => {
  try {
    let stats = await Job.aggregate([
      {
        $match: {
          createdBy: mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    const defaultStats = {
      pending: stats.pending || 0,
      interview: stats.interview || 0,
      declined: stats.declined || 0,
    };

    let monthyApplications = [];

    res.status(StatusCodes.OK).json({ defaultStats, monthyApplications });
  } catch (error) {
    next(error);
  }
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
