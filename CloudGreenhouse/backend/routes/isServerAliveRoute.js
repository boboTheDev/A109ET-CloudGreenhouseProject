const express = require("express");
const isServerAliveController = require("./../controllers/isServerAliveController");
const router = express.Router();

router.route("/").get(isServerAliveController.isServerAlive);

module.export = router;
