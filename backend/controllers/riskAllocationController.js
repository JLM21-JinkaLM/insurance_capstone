const RiskAllocation = require("../models/RiskAllocation");

// ✅ Create / Calculate Allocation
exports.createAllocation = async (req, res) => {
  try {
    const data = {
      ...req.body,
      calculatedBy: req.user.id
    };

    const allocation = await RiskAllocation.create(data);

    res.status(201).json({
      success: true,
      data: allocation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Allocations
exports.getAllAllocations = async (req, res) => {
  try {
    const allocations = await RiskAllocation.find()
      .populate("policyId")
      .populate("calculatedBy", "username email")
      .populate("allocations.reinsurerId")
      .populate("allocations.treatyId");

    res.json(allocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Allocation by Policy
exports.getAllocationByPolicy = async (req, res) => {
  try {
    const allocation = await RiskAllocation.findOne({
      policyId: req.params.policyId
    })
      .populate("policyId")
      .populate("allocations.reinsurerId")
      .populate("allocations.treatyId");

    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    res.json(allocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Allocation
exports.updateAllocation = async (req, res) => {
  try {
    const allocation = await RiskAllocation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    res.json(allocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Allocation
exports.deleteAllocation = async (req, res) => {
  try {
    const allocation = await RiskAllocation.findByIdAndDelete(req.params.id);

    if (!allocation) {
      return res.status(404).json({ message: "Allocation not found" });
    }

    res.json({ message: "Allocation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
