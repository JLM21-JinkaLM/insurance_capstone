// models/AuditLog.js
const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["POLICY", "CLAIM", "TREATY", "USER"],
      required: true
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE", "APPROVE"],
      required: true
    },
    oldValue: Object,
    newValue: Object,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    performedAt: {
      type: Date,
      default: Date.now
    },
    ipAddress: String
  },
  { timestamps: true }
);

// Index for faster search
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ performedBy: 1 });
auditLogSchema.index({ performedAt: -1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);
