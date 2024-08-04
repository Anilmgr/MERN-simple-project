import { Router } from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getSingleJob,
    updateJob,
} from "../controllers/jobController.js";
import {validateJobInput, validateIdParam} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from "../middleware/authMiddleware.js";
const router = Router();

router.route("/").get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);
router.route("/:id").get(validateIdParam, getSingleJob).delete(checkForTestUser, validateIdParam, deleteJob).patch(checkForTestUser, validateIdParam, validateJobInput, updateJob);

export default router;
