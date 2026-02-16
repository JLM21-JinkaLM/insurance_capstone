const AuditLog = require("../models/AuditLog");

exports.audit = (entityType) => async (req, res, next) => {
  res.on("finish", async () => {
    await AuditLog.create({
      entityType,
      action: req.method,
      performedBy: req.user?.id,
      ipAddress: req.headers["x-forwarded-for"] || req.ip,
      performedAt: new Date()
    });
  });
  next();
};
