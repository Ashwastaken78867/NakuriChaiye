import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Unique company name
    },
    description: {
        type: String // Brief about company
    },
    website: {
        type: String // Company website URL
    },
    location: {
        type: String // Company location
    },
    logo: {
        type: String // URL to company logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Linked recruiter user
        required: true
    }
}, { timestamps: true }); // Tracks createdAt, updatedAt

export const Company = mongoose.model("Company", companySchema);
