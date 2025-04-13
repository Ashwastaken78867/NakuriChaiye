// Import core and third-party modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({});

// Import utility and route files
import connectDB from './utils/db.js';
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Initialize express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Configure CORS for frontend (React app running on port 5173)
const corsOptions = {
    origin: [
        'http://localhost:5173', // For local development
        'https://nakurichaiye.vercel.app' // For your deployed frontend
    ],
    credentials: true, // Allow cookies and headers
};
app.use(cors(corsOptions));

// Define API routes with versioning
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
