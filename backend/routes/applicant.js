const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const AppCard = require("../models/appCard");
const HostCard = require("../models/hostCard");
const User = require("../models/user");

router.put("/resetStatus", auth, async (req, res) => {
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }
    try {
        await AppCard.findOneAndUpdate({username: user.username}, {approved: false});
        await AppCard.findOneAndUpdate({username: user.username}, {hostUsername: ""});
    } catch {
        res.status(401).json({ message: "Error in reseting applicant card"});
    }
})

router.get("/getStatus", auth, async (req, res) => {
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }
    try {
        const appcard = await AppCard.findOne({username: user.username});
        res.status(200).send(appcard.approved);
    } catch (err) {
        res.status(401).json({ message: "Error in getting status" });
    }
})

// ONLY HOST ACCOUNTS use this route
router.get("/getCard", auth, async (req, res) => {
    // only get if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }
    // only retrieve applicant cards with corresponding host name
    try {
        if (user.isApplicant) {
            return res.status(403).json({ message: "Cannot view as applicant"});
        }
        const cards = await AppCard.find({hostUsername: user.username});
        const userCard = await HostCard.find({username: user.username});
        if (cards)
            return res.status(200).send({cards, userCard});
        res.status(204).send({cards: [], userCard});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to retrieve applicant cards"});
    }
});

/**
 * @param hostUsername username of the host card the applicant is intersted in
 * @description update the applicant card's hostUsername field
 */
router.put("/updateCard", auth, async (req, res) => {
    // only update if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }

    try {
        const hostUsername = req.body;
        const updatecard = await AppCard.findOneAndUpdate({username: user.username}, hostUsername);
        const hostcard = await HostCard.findOne({username: hostUsername.hostUsername});
        res.status(200).send(hostcard);
    } catch (err) {
        res.status(401).json({ message: "Error in updating applicant card"});
    }
});

module.exports = router;