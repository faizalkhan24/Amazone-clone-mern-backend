const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const getDestinationFolder = (req) => {
    if (req.path.includes("/api/products/upload")) {
        return "products";
    } else if (req.path.includes("/api/blogs/uploadblog")) {
        return "blogs";
    }
    return "";
};

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationFolder = getDestinationFolder(req);
        cb(null, path.join(__dirname, `../public/images/${destinationFolder}`));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) { 
        cb(null, true);
    } else {
        cb({
            message: "Unsupported file format.",
        }, false);
    }
};

const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 2000000 },
});

const ProductImgResize = async (req, res, next) => {
    if (!req.files) return next(); 
    await Promise.all(
        req.files.map(async (file) => { 
            await sharp(file.path)
                .resize(300, 300)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`public/images/products/${file.filename}`);
        })
    );
    next();
};

const BlogsImgResize = async (req, res, next) => {
    if (!req.files) return next(); 
    await Promise.all(
        req.files.map(async (file) => { 
            await sharp(file.path)
                .resize(300, 300)
                .toFormat("jpeg") 
                .jpeg({ quality: 90 }) 
                .toFile(`public/images/blogs/${file.filename}`);
        })
    );
    next();
};

module.exports = { uploadPhoto, ProductImgResize, BlogsImgResize };
