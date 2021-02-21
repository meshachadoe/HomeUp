const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const AppCard = require("../models/appCard");
const User = require("../models/user");

router.post("/addCard", auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.send(401).json({ message: "Error in fetching user" });
    }

    try {
        const { username, name, location, contactInfo, minimumStay, additionalInfo } = req.body;
        let card = new AppCard({
            username,
            name,
            location,
            contactInfo,
            minimumStay,
            additionalInfo,
        });

        await card.save();
        res.status(202).send(card);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in saving new applicant card");
    }
});

// ONLY HOST ACCOUNTS use this route
router.get("/getCard", auth, async (req, res) => {
    // only get if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.send(401).json({ message: "Error in fetching user" });
    }
    // only retrieve applicant cards with corresponding host name
    try {
        if (user.isApplicant) {
            return res.status(403).json({ message: "Cannot view as applicant"});
        }
        const cards = await AppCard.find({hostUsername: user.username});
        res.status(200).send(cards);
    } catch (err) {
        console.log(err);
        res.send(500).json({ message: "Unable to retrieve list"});
    }
});

/**
 * @description given the host username in the request body,
 * update the applicant card's hostUsername field
 */
router.put("/addCard/:id", auth, async (req, res) => {
    // only update if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.send(401).json({ message: "Error in fetching user" });
    }

    try {
        const hostUsername = req.body;
        //find app card associated with user.username
        await AppCard.findByIdAndUpdate({_id: req.params.id}, hostUsername).then(() => {
            AppCard.findOne({_id: req.params.id}).then(card => res.status(200).send(card));
        })
    } catch (err) {
        res.send(401).json({ message: "Error in updating applicant card"});
    }
});

router.delete("/addCard/:id", auth, async (req, res) => {
    // only delete if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.send(401).json({ message: "Error in fetching user" });
    }
});

module.exports = router;