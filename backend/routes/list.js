const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const ApplicantListing = require("../models/applicantListing");
const ContributorListing = require("../models/contributorListing");

module.exports = router;