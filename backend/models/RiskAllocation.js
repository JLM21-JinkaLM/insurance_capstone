// models/RiskAllocation.js
const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
  reinsurerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reinsurer"
  },
  treatyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treaty"
  },
  allocatedAmount: Number,
  allocatedPercentage: Number
});

const riskAllocationSchema = new mongoose.Schema(
  {
    policyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Policy",
      required: true
    },
    allocations: [allocationSchema],
    retainedAmount: Number,
    calculatedAt: {
      type: Date,
      default: Date.now
    },
    calculatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RiskAllocation", riskAllocationSchema);
