import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middleware/mutler.js";

const router = express.Router();

// Register a new company
router.route("/register").post(isAuthenticated, registerCompany);

// Get current user’s company
router.route("/get").get(isAuthenticated, getCompany);

// Get company by ID
router.route("/get/:id").get(isAuthenticated, getCompanyById);

// Update company info
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;
