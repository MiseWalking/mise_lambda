const mongoose = require("mongoose");

const weightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Weight = mongoose.model("Weight", weightSchema);

async function createWeight(weightData) {
  const { userId, weight, date } = weightData;
  const newWeight = new Weight({ userId, weight, date });
  await newWeight.save();
  return newWeight;
}

async function getWeightByUserId(userId) {
  return Weight.find({ userId });
}

async function getById(weightId) {
  return Weight.findById(weightId);
}

async function deleteWeight(weightId) {
  return Weight.findByIdAndDelete(weightId);
}

module.exports = {
  createWeight,
  getWeightByUserId,
  getById,
  deleteWeight,
};
