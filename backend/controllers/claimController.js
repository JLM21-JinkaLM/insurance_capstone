const Claim = require("../models/Claim");
const Policy = require("../models/Policy");

// ✅ Submit Claim (Customer / Agent)
exports.createClaim = async (req, res) => {
  try {
    const claim = await Claim.create(req.body);

    res.status(201).json({
      success: true,
      data: claim,
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
    const { id } = req.params;
    const claim = await Claim.findById(id)
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
    const { id } = req.params;
    const claim = await Claim.findById(id);

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
    const { id } = req.params;

    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    if (claim.status !== "IN_REVIEW") {
      return res.status(400).json({
        message: "Claim must be in review before approval",
      });
    }

    // Auto approve full claim amount
    claim.status = "APPROVED";
    claim.approvedAmount = claim.claimAmount;
    claim.handledBy = req.user.id;

    const oldData = { ...claim.toObject() };

    claim.status = "APPROVED";
    await claim.save();

    await logAction({
      entityType: "CLAIM",
      entityId: claim._id,
      action: "APPROVE",
      oldValue: oldData,
      newValue: claim,
      user: req.user,
      ip: req.ip,
    });
    await claim.save();

    res.json({ message: "Claim approved", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Reject Claim
exports.rejectClaim = async (req, res) => {
  try {
    // const { remarks } = req.body;

    const { id } = req.params;
    const claim = await Claim.findById(id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = "REJECTED";
    // claim.remarks = remarks;
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
    const { id } = req.params;

    // 1️⃣ Find claim
    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    // Only APPROVED claims can be settled
    if (claim.status !== "APPROVED") {
      return res.status(400).json({
        message: "Only approved claims can be settled",
      });
    }

    // 2️⃣ Get related policy
    const policy = await Policy.findById(claim.policyId);
    if (!policy._id) {
      return res.status(404).json({ message: "Policy not found" });
    }
    if (policy.status.toUpperCase() !== "ACTIVE") {
      return res.status(400).json({
        message: "Cannot settle claim. Policy is not active.",
      });
    }

    // 3️⃣ Business Logic
    let payout;

    if (claim.claimAmount > policy.sumInsured) {
      payout = policy.sumInsured;
    } else {
      payout = claim.claimAmount;
    }

    // 4️⃣ Update claim
    claim.settlementAmount = payout;
    claim.status = "SETTLED";
    claim.settledAt = new Date();

    await claim.save();

    res.json({
      message: "Claim settled successfully",
      settlementAmount: payout,
      claim,
    });
  } catch (error) {
    console.error("Settlement error:", error);
    res.status(500).json({ message: "Settlement failed" });
  }
};
// exports.settleClaim = async (req, res) => {
//   try {
//     const claim = await Claim.findById(req.params.id);

//     if (!claim) {
//       return res.status(404).json({ message: "Claim not found" });
//     }

//     claim.status = "SETTLED";

//     await claim.save();

//     res.json({ message: "Claim settled", claim });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
