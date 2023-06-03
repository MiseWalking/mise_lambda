const weightRepository = require("./weight.repository.js");
const userRepository = require("../user/user.repository.js");

async function createWeight(req, res) {
  const { userId, weight, date } = req.body;

  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newWeight = await weightRepository.createWeight({
      userId,
      weight,
      date,
    });

    return res.status(201).json({ success: true, newWeight });
  } catch (error) {
    console.error("Error creating weight:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create weight entry" });
  }
}

async function getWeight(req, res) {
  const userId = req.params.userId;

  try {
    const user = await userRepository.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const weightRecords = await weightRepository.getWeightByUserId(userId);

    return res.status(200).json({ success: true, weightRecords });
  } catch (error) {
    console.error("Error retrieving weight records:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to retrieve weight records" });
  }
}

async function updateWeight(req, res) {
  const weightId = req.params.weightId;
  const { weight, date } = req.body;

  try {
    const existingWeight = await weightRepository.getById(weightId);
    if (!existingWeight) {
      return res
        .status(404)
        .json({ success: false, message: "Weight record not found" });
    }

    existingWeight.weight = weight;
    existingWeight.date = date;
    await existingWeight.save();

    return res
      .status(200)
      .json({ success: true, message: "Weight record updated successfully" });
  } catch (error) {
    console.error("Error updating weight record:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update weight record" });
  }
}

async function deleteWeight(req, res) {
  const weightId = req.params.weightId;

  try {
    const existingWeight = await weightRepository.getById(weightId);
    if (!existingWeight) {
      return res
        .status(404)
        .json({ success: false, message: "Weight record not found" });
    }

    await weightRepository.deleteWeight(weightId);

    return res
      .status(204)
      .json({ success: true, message: "Weight record deleted successfully" });
  } catch (error) {
    console.error("Error deleting weight record:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete weight record" });
  }
}

module.exports = {
  createWeight,
  getWeight,
  updateWeight,
  deleteWeight,
};
