const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImageToCloudinary = async (imagePath) => {
  try {
    const data = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });
    return data;
  } catch {
    console.log("Upload image to cloudinary failed");
  }
};
const removeImagefromCludinary = async (publicId) => {
  try {
    const data = await cloudinary.uploader.destroy(publicId);
    return data;
  } catch {
    console.log("remove image from cloudinary failed");
  }
};

module.exports = { uploadImageToCloudinary, removeImagefromCludinary };
