const AuditLog = require("../models/AuditLog");

exports.logAction = async ({
  entityType,
  entityId,
  action,
  oldValue,
  newValue,
  user,
  ip
}) => {
  try {
    await AuditLog.create({
      entityType,
      entityId,
      action,
      oldValue,
      newValue,
      performedBy: user.id,
      ipAddress: ip
    });
  } catch (error) {
    console.error("Audit log failed:", error.message);
  }
};
