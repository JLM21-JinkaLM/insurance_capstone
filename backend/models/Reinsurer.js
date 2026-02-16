// models/Reinsurer.js
const mongoose = require("mongoose");

const reinsurerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    country: String,
    rating: {
      type: String,
      enum: ["AAA", "AA", "A", "BBB"]
    },
    contactEmail: String,
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reinsurer", reinsurerSchema);
