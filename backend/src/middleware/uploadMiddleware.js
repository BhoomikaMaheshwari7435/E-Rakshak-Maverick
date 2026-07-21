const multer = require("multer");
const path = require("path");

// Configure how uploaded files are stored
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Allow only image files
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png/;

    const isValidExtension = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const isValidMimeType = allowedTypes.test(file.mimetype);

    if (isValidExtension && isValidMimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG and PNG images are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;