import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true // Full name required
    },
    email: {
        type: String,
        required: true, // Email required
        unique: true // Must be unique
    },
    phoneNumber: {
        type: Number,
        required: true // Phone required
    },
    password: {
        type: String,
        required: true // Password required
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'], // Role options
        required: true // Role required
    },
    profile: {
        bio: { type: String }, // User bio
        skills: [{ type: String }], // Skill list
        resume: { type: String }, // Resume URL
        resumeOriginalName: { type: String }, // Resume name
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Linked company
        profilePhoto: {
            type: String,
            default: "" // Default photo
        }
    }
}, { timestamps: true }); // Auto timestamps

export const User = mongoose.model('User', userSchema);
