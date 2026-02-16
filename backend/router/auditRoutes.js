const router = require("express").Router();
const ctrl = require("../controllers/auditController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  ctrl.getAllLogs
);

module.exports = router;
