const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    claimNumber: {
      type: String,
      required: true,
      unique: true
    },
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true
    },
    claimAmount: {
      type: Number,
      required: true
    },
    approvedAmount: {
      type: Number,
      default: 0
    },
    settlementAmount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["SUBMITTED", "IN_REVIEW", "APPROVED", "REJECTED", "SETTLED"],
      default: "SUBMITTED"
    },
    incidentDate: Date,
    reportedDate: Date,
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    remarks: String,
    settledAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);
