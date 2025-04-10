import multer from "multer";

// Use memory storage for file
const storage = multer.memoryStorage();

// Export single file upload middleware
export const singleUpload = multer({ storage }).single("file");
