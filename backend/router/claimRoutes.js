const router = require("express").Router();
const ctrl = require("../controllers/claimController");

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// ✅ Submit Claim — Customer / Agent
router.post(
  "/",
  authenticate,
  authorize("CUSTOMER", "AGENT"),
  ctrl.createClaim
);

// ✅ Get All Claims — Admin + Claims Adjuster
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "CLAIMS_ADJUSTER"),
  ctrl.getAllClaims
);

// ✅ Get Claim by ID — Admin + Claims Adjuster
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "CLAIMS_ADJUSTER"),
  ctrl.getClaimById
);

// ✅ Review Claim — Claims Adjuster
router.put(
  "/review/:id",
  authenticate,
  authorize("CLAIMS_ADJUSTER","ADMIN"),
  ctrl.reviewClaim
);

// ✅ Approve Claim — Claims Adjuster
router.put(
  "/approve/:id",
  authenticate,
  authorize("CLAIMS_ADJUSTER","ADMIN"),
  ctrl.approveClaim
);

// ✅ Reject Claim — Claims Adjuster
router.put(
  "/reject/:id",
  authenticate,
  authorize("CLAIMS_ADJUSTER","ADMIN"),
  ctrl.rejectClaim
);

// ✅ Settle Claim — Claims Adjuster
router.put(
  "/settle/:id",
  authenticate,
  authorize("CLAIMS_ADJUSTER","ADMIN"),
  ctrl.settleClaim
);

module.exports = router;
