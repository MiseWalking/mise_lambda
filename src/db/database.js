const Mongoose = require("mongoose");
const { config } = require("../../config.js");

const connectDB = async () => {
  return Mongoose.connect(config.dbHost);
};

function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toOject", { virtuals: true });
}

module.exports = {
  connectDB,
  useVirtualId,
};
