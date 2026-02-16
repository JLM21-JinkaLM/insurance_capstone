// models/Treaty.js
const mongoose = require("mongoose");

const treatySchema = new mongoose.Schema(
  {
    treatyName: {
      type: String,
      required: true
    },
    treatyType: {
      type: String,
      enum: ["QUOTA_SHARE", "SURPLUS"],
      required: true
    },
    reinsurerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reinsurer",
      required: true
    },
    sharePercentage: Number,
    retentionLimit: Number,
    treatyLimit: Number,
    applicableLOBs: [
      {
        type: String,
        enum: ["HEALTH", "MOTOR", "LIFE", "PROPERTY"]
      }
    ],
    effectiveFrom: Date,
    effectiveTo: Date,
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Treaty", treatySchema);
