const Policy = require("../models/Policy");
const Claim = require("../models/Claim");
const Treaty = require("../models/Treaty");

exports.totalExposure = async (req, res) => {
  const result = await Policy.aggregate([
    { $group: { _id: null, exposure: { $sum: "$sumInsured" } } }
  ]);

  res.json(result);
};


exports.getSummary = async (req, res) => {
  try {
    const totalPolicies = await Policy.countDocuments();
    const activePolicies = await Policy.countDocuments({ status: "ACTIVE" });

    const totalClaims = await Claim.countDocuments();
    const pendingClaims = await Claim.countDocuments({ status: "IN_REVIEW" });

    const activeTreaties = await Treaty.countDocuments({ status: "ACTIVE" });

    const exposureAgg = await Policy.aggregate([
      { $group: { _id: null, totalExposure: { $sum: "$sumInsured" } } }
    ]);

    const totalExposure = exposureAgg[0]?.totalExposure || 0;

    res.json({
      totalPolicies,
      activePolicies,
      totalClaims,
      pendingClaims,
      activeTreaties,
      totalExposure
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
