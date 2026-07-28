const multer = require("multer");
const path = require("path");

// Configure how uploaded files are stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Allow only image files
const fileFilter = (req, file, cb) => {





    // Allowed file extensions
    const allowedExtensions = /\.(jpg|jpeg|png|mp3|wav|m4a|mpeg)$/i;

    // Allowed MIME types
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/x-wav",
        "audio/mp4",
        "audio/x-m4a",
        "audio/m4a",
        "video/mpeg"
    ];

    const isValidExtension = allowedExtensions.test(file.originalname);

    const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
    console.log("Original Name:", file.originalname);
    console.log("Extension:", path.extname(file.originalname));
    console.log("Mime Type:", file.mimetype);


    if (isValidExtension && isValidMimeType) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, JPEG, PNG, MP3, WAV and M4A files are allowed."
            )
        );
    }
};





const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;