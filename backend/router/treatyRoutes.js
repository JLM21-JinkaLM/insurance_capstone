const router = require("express").Router();
const treatyController = require("../controllers/treatyController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post("/", authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
  treatyController.createTreaty);

router.get("/",authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
   treatyController.getAllTreaties);

router.get("/:id",authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
   treatyController.getTreatyById);

router.put("/:id", authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
  treatyController.updateTreaty);

router.delete("/:id", authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
  treatyController.deleteTreaty);

router.patch("/:id/activate", authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
  treatyController.activateTreaty);

router.patch("/:id/expire",authenticate,
  authorize("ADMIN","REINSURANCE_MANAGER"),
   treatyController.expireTreaty);

module.exports = router;
