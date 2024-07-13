import { NotFoundError } from "../errors/customError.js";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId});
    res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({
        message: "Deleted successfully",
        job: removedJob,
    });
};

export const getSingleJob = async (req, res) => {
    const job = await Job.findOne({_id:req.params.id, createdBy:req.user.userId});
    if (!job) throw new NotFoundError("Job not found!");
    res.status(StatusCodes.OK).json(job);
};

export const updateJob = async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(StatusCodes.OK).json({
        message: "Updated successfully",
        job: updatedJob,
    });
};
