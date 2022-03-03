const express = require("express");
const { getPayment } = require("../controllers/stripe_controllers");

const router = express.Router();

router.post('/payment', getPayment);

module.exports = router;