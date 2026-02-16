const router = require("express").Router();
const ctrl = require("../controllers/reinsuranceController");

const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// ✅ Create — Reinsurance Manager
router.post(
  "/",
  authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
  ctrl.createReinsurer
);

// ✅ Get All — All authenticated users
router.get(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "REINSURANCE_MANAGER",
    "UNDERWRITER",
    "CLAIMS_ADJUSTER"
  ),
  ctrl.getAllReinsurers
);

// ✅ Get by ID
router.get(
  "/:id",
  authenticate,
  authorize(
    "ADMIN",
    "REINSURANCE_MANAGER",
    "UNDERWRITER",
    "CLAIMS_ADJUSTER"
  ),
  ctrl.getReinsurerById
);

// ✅ Update — Reinsurance Manager
router.put(
  "/:id",
  authenticate,
  authorize("REINSURANCE_MANAGER"),
  ctrl.updateReinsurer
);

// ✅ Delete — Admin
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  ctrl.deleteReinsurer
);

module.exports = router;


// Change status
router.patch(
  "/status/:id",
  authenticate,
  authorize("ADMIN", "REINSURANCE_MANAGER"),
  ctrl.changeReinsurerStatus
);


module.exports = router;
