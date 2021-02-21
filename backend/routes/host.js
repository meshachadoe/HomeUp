const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const AppCard = require("../models/appCard");
const HostCard = require("../models/hostCard");
const User = require("../models/user");

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
        const cards = await HostCard.find({inUse: false});
        const userCard = await AppCard.find({username: user.username});
        if (cards)
            return res.status(200).send({cards, userCard});
        res.status(204).send({cards: [], userCard});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to retrieve host cards"});
    }
});

router.put("/endStay", auth, async (req, res) => {
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }
    try {
        await HostCard.findOneAndUpdate({username: user.username}, {inUse: false});
    } catch {
        res.status(401).json({ message: "Error in updating host card"});
    }

})

router.put("/confirmStay", auth, async (req, res) => {
    // only delete if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }

    try {
        const appname = req.body;
        await AppCard.findOneAndUpdate({ username: appname.appname}, {approved: true});
        const appObject = await AppCard.findOne({ username: appname.appname});
        // await AppCard.findOneAndRemove({username: appname.appname});
        // await HostCard.findOneAndRemove({username: user.username});
        await HostCard.findOneAndUpdate({username: user.username}, {inUse: true});

        const unchosen = await AppCard.find({hostUsername: user.username}).map(async (card) => {
            card.hostUsername = "";
        });
        res.status(200).send(appObject);
    } catch (err) {
        res.status(401).json({ message: "Error in deleting host card"});
    }
});

module.exports = router;