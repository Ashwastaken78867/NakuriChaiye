import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job
router.route("/apply/:id").get(isAuthenticated, applyJob);

// Get jobs user applied to
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Get applicants for a job
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Update application status
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
