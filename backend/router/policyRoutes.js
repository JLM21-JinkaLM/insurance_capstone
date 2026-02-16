const router = require("express").Router();
const ctrl = require("../controllers/policyController");

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// ✅ Create Policy — Underwriter only
router.post(
  "/",
  authenticate,
  authorize("UNDERWRITER","ADMIN"),
  ctrl.createPolicy
);

// ✅ Get All Policies — Any logged in user
router.get(
  "/",
  authenticate,
  authorize("UNDERWRITER","ADMIN"),
  ctrl.getAllPolicies
);

// ✅ Get Policy by ID
router.get(
  "/:id",
  authenticate,
  authorize("UNDERWRITER","ADMIN"),
  ctrl.getPolicyById
);

// ✅ Update Policy — Underwriter only
router.put(
  "/:id",
  authenticate,
  authorize("UNDERWRITER","ADMIN"),
  ctrl.updatePolicy
);

// ✅ Delete Policy — Admin only
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  ctrl.deletePolicy
);

// ✅ Approve Policy — Underwriter
router.put(
  "/approve/:id",
  authenticate,
  authorize("UNDERWRITER","ADMIN"),
  ctrl.approvePolicy
);

// ✅ Change Status — Underwriter
router.patch(
  "/status/:id",
  authenticate,
  authorize("UNDERWRITER",'ADMIN'),
  ctrl.changePolicyStatus
);

module.exports = router;
