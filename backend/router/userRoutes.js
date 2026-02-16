const router = require("express").Router();
const ctrl = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.post("/", authenticate, authorize("ADMIN"), ctrl.createUser);
router.get("/", authenticate, authorize("ADMIN"), ctrl.getUsers);
router.post("/login", ctrl.login);

module.exports = router;
