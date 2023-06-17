const multer = require("multer");

const { PROFILES_FILES_PATH, PRODUCTS_FILES_PATH, DOCUMENTS_FILES_PATH } = require("../config/paths.config");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { type } = req.body;
        
        const path = type === "profile_photo" ? PROFILES_FILES_PATH : type === "product" ? PRODUCTS_FILES_PATH : DOCUMENTS_FILES_PATH;
        
        cb(null, process.cwd() + path);
    },
    filename: (req, file, cb) => {
        file.document_type = req.body.type;

        const date = new Date().toISOString().replace(/:/g, '-');

        cb(null, date + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;