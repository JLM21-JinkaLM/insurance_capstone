const Claim = require("../models/Claim");

// ✅ Submit Claim (Customer / Agent)
exports.createClaim = async (req, res) => {
  try {
    const claim = await Claim.create(req.body);

    res.status(201).json({
      success: true,
      data: claim
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Claims
exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("policyId")
      .populate("handledBy", "username email");

    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Claim by ID
exports.getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate("policyId")
      .populate("handledBy");

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Move Claim to Review
exports.reviewClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = "IN_REVIEW";
    claim.handledBy = req.user.id;

    await claim.save();

    res.json({ message: "Claim under review", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve Claim
exports.approveClaim = async (req, res) => {
  try {
    const { approvedAmount } = req.body;

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = "APPROVED";
    claim.approvedAmount = approvedAmount;
    claim.handledBy = req.user.id;

    await claim.save();

    res.json({ message: "Claim approved", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Reject Claim
exports.rejectClaim = async (req, res) => {
  try {
    const { remarks } = req.body;

    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = "REJECTED";
    claim.remarks = remarks;
    claim.handledBy = req.user.id;

    await claim.save();

    res.json({ message: "Claim rejected", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Settle Claim
exports.settleClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = "SETTLED";

    await claim.save();

    res.json({ message: "Claim settled", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

