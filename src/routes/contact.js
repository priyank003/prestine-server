const express = require("express");
const router = express.Router();

const { validateUser } = require("../middleware/validation");
const { httpContactUs } = require("../controllers/contact.controller");
const catchAsync = require("../utils/catchAsync");

router.post("/", validateUser, catchAsync(httpContactUs));

module.exports = router;
