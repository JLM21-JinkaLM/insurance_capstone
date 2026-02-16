const router = require("express").Router();
const ctrl = require("../controllers/riskAllocationController");

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// ✅ Create Allocation — Reinsurance Manager
router.post(
  "/",
  authenticate,
  authorize("REINSURANCE_MANAGER"),
  ctrl.createAllocation
);

// ✅ Get All — Admin + Reinsurance Manager
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "REINSURANCE_MANAGER"),
  ctrl.getAllAllocations
);

// ✅ Get by Policy
router.get(
  "/policy/:policyId",
  authenticate,
  authorize("ADMIN", "REINSURANCE_MANAGER"),
  ctrl.getAllocationByPolicy
);

// ✅ Update Allocation
router.put(
  "/:id",
  authenticate,
  authorize("REINSURANCE_MANAGER"),
  ctrl.updateAllocation
);

// ✅ Delete Allocation — Admin
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  ctrl.deleteAllocation
);

module.exports = router;
