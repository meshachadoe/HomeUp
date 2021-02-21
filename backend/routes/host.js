const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const HostCard = require("../models/hostCard");

router.post("/addCard", async (req,res) => {

});

router.get("/getAllCards", async (req, res) => {

});

router.delete("/deleteCard", async (req, res) => {

});

module.exports = router;