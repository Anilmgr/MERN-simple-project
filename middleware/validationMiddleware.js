import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE, USER_ROLE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

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
                if(errorMessages[0].startsWith("Not authorized")){
                    throw new UnauthorizedError("Not authorized to access this route!");
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
    body("jobLocation").notEmpty().withMessage("Location is required!"),
    body("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("invalid job status!"),
    body("jobType")
        .isIn(Object.values(JOB_TYPE))
        .withMessage("invalid job type!"),
]);

export const validateIdParam = withValidationErrors([
    param("id").custom(async (value,{req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new "Invalid MongoDB ID!"();
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError("Job not found!");
        const isAdmin = req.user.role === USER_ROLE.ADMIN
        const isOwner = req.user.userId === job.createdBy.toString()
        if(!isAdmin && !isOwner) throw new UnauthorizedError("Not authorized to access this route!");
    }),
]);

export const validateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is required!"),
    body("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) throw new BadRequestError("Email already exist!");
        }),
    body("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 character!"),
    body("location").notEmpty().withMessage("Location is required!"),
    body("lastName").notEmpty().withMessage("Last Name is required!"),
]);

export const validateLoginInput = withValidationErrors([
    body("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 character!"),
]);

export const validateUpdateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is required!"),
    body("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Invalid email format")
        .custom(async (email, {req}) => {
            const user = await User.findOne({ email });
            if (user && user._id.toString() !== req.user.userId) throw new BadRequestError("Email already exist!");
        }),
    body("location").notEmpty().withMessage("Location is required!"),
    body("lastName").notEmpty().withMessage("Last Name is required!"),
]);
