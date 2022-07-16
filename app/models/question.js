const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passationSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
    },
    choix: {
      type: [String],
    },
    solution: {
      type: Number,
      min: 1,
      max: 1,
    },
  },
  {
    timestamps: true,
  }
);

var Passations = mongoose.model("Passation", passationSchema);
module.exports = Passations;
