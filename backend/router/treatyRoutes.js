const router = require("express").Router();
const treatyController = require("../controllers/treatyController");

router.post("/", treatyController.createTreaty);
router.get("/", treatyController.getAllTreaties);
router.get("/:id", treatyController.getTreatyById);
router.put("/:id", treatyController.updateTreaty);
router.delete("/:id", treatyController.deleteTreaty);

router.patch("/:id/activate", treatyController.activateTreaty);
router.patch("/:id/expire", treatyController.expireTreaty);

module.exports = router;
