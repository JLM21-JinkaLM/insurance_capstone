// models/Policy.js
const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    policyNumber: {
      type: String,
      required: true,
      unique: true
    },
    insuredName: {
      type: String,
      required: true
    },
    insuredType: {
      type: String,
      enum: ["INDIVIDUAL", "CORPORATE"],
      required: true
    },
    lineOfBusiness: {
      type: String,
      enum: ["HEALTH", "MOTOR", "LIFE", "PROPERTY"],
      required: true
    },
    sumInsured: {
      type: Number,
      required: true
    },
    premium: {
      type: Number,
      required: true
    },
    retentionLimit: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "SUSPENDED", "EXPIRED"],
      default: "DRAFT"
    },
    effectiveFrom: Date,
    effectiveTo: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);
