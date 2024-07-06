import { Router } from "express";
import {
    createJob,
    deleteJob,
    getAllJobs,
    getSingleJob,
    updateJob,
} from "../controllers/jobController.js";

const router = Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).delete(deleteJob).patch(updateJob);

export default router;
