const multer = require('multer');

const multerStorage = multer.memoryStorage();
const multerFilter = function (req, file, cb){
    if (file.mimetype.startsWith('image')){
        cb(null, true);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadToServer = upload.single('image');