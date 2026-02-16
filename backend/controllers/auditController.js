const AuditLog = require("../models/AuditLog");

exports.createAudit = async (data) => {
  await AuditLog.create(data);
};
