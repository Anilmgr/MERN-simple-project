import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith("Job not found")) {
                    throw new NotFoundError(errorMessages);
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

export const validateJobInput = withValidationErrors([
    body("company").notEmpty().withMessage("Company is required!"),
    body("position").notEmpty().withMessage("Position is required!"),
    body("jobLocation").notEmpty().withMessage("Position is required!"),
    body("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("invalid job status!"),
    body("jobType")
        .isIn(Object.values(JOB_TYPE))
        .withMessage("invalid job type!"),
]);

export const validateIdParam = withValidationErrors([
    param("id").custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new  ("Invalid MongoDB ID!");
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError("Job not found!");
    }),
]);
