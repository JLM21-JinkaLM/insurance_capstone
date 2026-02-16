const Policy = require("../models/Policy");

// ✅ Create Policy
exports.createPolicy = async (req, res) => {
  try {
    const policy = await Policy.create(req.body);
    res.status(201).json({
      success: true,
      data: policy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get All Policies
exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate("createdBy", "username email")
      .populate("approvedBy", "username email");

    res.status(200).json({
      success: true,
      count: policies.length,
      data: policies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get Policy By ID
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id)
      .populate("createdBy")
      .populate("approvedBy");

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Policy
exports.updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Policy
exports.deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve Policy
exports.approvePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    policy.status = "ACTIVE";
    policy.approvedBy = req.user.id; // requires auth middleware

    await policy.save();

    res.status(200).json({
      message: "Policy approved",
      data: policy
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Change Status (Suspend / Expire)
exports.changePolicyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const policy = await Policy.findById(req.params.id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    policy.status = status;
    await policy.save();

    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
