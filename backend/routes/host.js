const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const HostCard = require("../models/hostCard");
const User = require("../models/user");

router.post("/addCard", auth, async (req,res) => {
    // only add if user is authenticated
    try {
        const user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }

    try {
        const { username, name, location, phone, maximumStay, description } = req.body;
        let card = new HostCard({
            username,
            name,
            location,
            phone,
            maximumStay,
            description,
        });

        await card.save();
        res.status(202).send(card);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Error in saving new host card"});
    }
});

router.get("/getAllCards", async (req, res) => {

});

router.delete("/deleteCard", async (req, res) => {

});

module.exports = router;