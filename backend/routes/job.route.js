import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);                // ✅ Admin only
router.route("/get").get(getAllJobs);                                // ✅ Public
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);    // ✅ Admin only
router.route("/get/:id").get(getJobById);                            // ✅ Can also be public if needed

export default router;
