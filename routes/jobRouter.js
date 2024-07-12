import { Router } from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getSingleJob,
    updateJob,
} from "../controllers/jobController.js";
import {validateJobInput, validateIdParam} from '../middleware/validationMiddleware.js';
const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router.route("/:id").get(validateIdParam, getSingleJob).delete(validateIdParam, deleteJob).patch(validateIdParam, validateJobInput, updateJob);

export default router;
