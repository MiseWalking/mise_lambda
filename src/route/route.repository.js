const mongoose = require("mongoose");
const { useVirtualId } = require("../db/database.js");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  imageId: { type: String, required: true },
});

useVirtualId(imageSchema);
const Image = mongoose.model("Image", imageSchema);

async function createImage(url, imageId) {
  const newImage = new Image({ url, imageId });
  await newImage.save();
  return newImage.id;
}

async function getImagesByImageId(imageId) {
  return Image.find({ imageId }).exec();
}

async function deleteImage(imageId) {
  return Image.findByIdAndDelete(imageId).exec();
}

module.exports = {
  createImage,
  getImagesByImageId,
  deleteImage,
};
