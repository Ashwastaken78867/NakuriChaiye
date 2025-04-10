import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Referenced job
        required: true // Job required
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referenced user
        required: true // Applicant required
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Application status
        default: 'pending' // Default value
    }
}, { timestamps: true }); // Created/Updated time

export const Application = mongoose.model("Application", applicationSchema);
