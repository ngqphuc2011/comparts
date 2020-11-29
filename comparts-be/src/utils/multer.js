const path = require("path");
const multer = require("multer");

module.exports = {
    upload: (publicFilePath) => {
        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, publicFilePath);
            },
            filename: function (req, file, callback) {
                callback(
                    null,
                    file.fieldname + "-" + Date.now() + path.extname(file.originalname),
                );
            },
        });
        return multer({ storage: storage }).single("img");
    }
}

