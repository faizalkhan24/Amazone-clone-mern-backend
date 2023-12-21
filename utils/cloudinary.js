const cloudinary = require("cloudinary");

// get this from cloudindary website all value save in env file 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY
});


const CloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((reslove) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {

            reslove(
                {
                    url: result.secure_url,
                },
                {
                    resouces_type: "auto",
                },
            );
        });
    });
};


module.exports = CloudinaryUploadImg;