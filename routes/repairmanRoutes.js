const express = require("express");
const router = express.Router({mergeParams: true});

const repairmanController = require("../controllers/repairmanController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.route("/")
.get(repairmanController.getAllRepairmans)
.post(repairmanController.createRepairman);

module.exports = router;