const AuditLog = require("../models/AuditLog");

// Get all audit logs (Admin only)
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("performedBy", "username email")
      .sort({ performedAt: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
