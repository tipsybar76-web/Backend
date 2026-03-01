const express = require("express");
const { trackVisit } = require("../controllers/visitController");

const router = express.Router();

router.post("/", trackVisit);

module.exports = router;
