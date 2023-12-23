const cloudinary = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: 'dvvej8uan', 
  api_key: '251175694282197', 
  api_secret: 'ys5WQoUWXHlfWAWhNVEM9KTUgpc' 
});


const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        { resource_type: 'auto' }
      );
    });
  });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        { resource_type: 'auto' }
      );
    });
  });
};
module.exports = {cloudinaryUploadImg,cloudinaryDeleteImg};