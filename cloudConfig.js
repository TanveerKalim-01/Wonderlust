const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Set up Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV", // Folder for uploaded images
    allowed_formats: ["jpg", "png", "jpeg", "avif"], // Allowed image formats
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

// Export Cloudinary instance and upload configuration
module.exports = {
  cloudinary,
  storage,
  upload
};
