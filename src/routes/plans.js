const express = require("express");
const router = express.Router();

// const { validateUser } = require("../middleware/validation");
const { httpCreateSubscription } = require("../controllers/plans.controller");
const catchAsync = require("../utils/catchAsync");

router.post("/", catchAsync(httpContactUs));

module.exports = router;
