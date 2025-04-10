import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Job title
    },
    description: {     
        type: String,
        required: true // Detailed job description
    },
    requirements: [{
        type: String // Skills/qualifications
    }],
    salary: {
        type: Number,
        required: true // Offered salary
    },
    experienceLevel: {
        type: String, // Changed from Number to String
        required: true // Example: "1-3 years"
    },
    location: {
        type: String,
        required: true // Job location
    },
    jobType: {
        type: String,
        required: true // Full-time, part-time etc.
    },
    position: {
        type: String, // Changed from Number to String
        required: true // Example: "Junior Frontend Developer"
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
