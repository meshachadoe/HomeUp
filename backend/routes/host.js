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

// ONLY APPLICANT ACCOUNTS use this route
router.get("/getAllCards", auth, async (req, res) => {
    // only get if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }

    try {
        if (!user.isApplicant) {
            return res.status(403).json({ message: "Cannot view as host"});
        }
        const cards = await HostCard.find({});
        if (cards)
            return res.status(200).send(cards);
        res.status(204).send("No cards available to view");
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to retrieve host cards"});
    }
});

router.delete("/deleteCard", auth, async (req, res) => {
    // only delete if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }

    try {
        await HostCard.findOneAndRemove({username: user.username}).then(res.status(200).send("Successfully deleted host card"));
    } catch (err) {
        res.status(401).json({ message: "Error in deleting host card"});
    }
});

module.exports = router;