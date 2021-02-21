const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const AppCard = require("../models/appCard");
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
        res.status(500).json({ message: "Error in saving new applicant card"});
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
        return res.status(401).json({ message: "Error in fetching user" });
    }
    // only retrieve applicant cards with corresponding host name
    try {
        if (user.isApplicant) {
            return res.status(403).json({ message: "Cannot view as applicant"});
        }
        const cards = await AppCard.find({hostUsername: user.username});
        if (cards)
            return res.status(200).send(cards);
        res.status(204).send("No cards available to view");
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
        await AppCard.findOneAndUpdate({username: user.username}, hostUsername).then(() => {
            AppCard.findOne({username: user.username}).then(card => res.status(200).send(card));
        })
    } catch (err) {
        res.status(401).json({ message: "Error in updating applicant card"});
    }
});

/**
 * @param hostUsername username of the host card the applicant is intersted in
 * @description update the applicant card's hostUsername field
 */
router.put("/resetCard", auth, async(req, res) => {
    // only reset if user is authenticated
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }

    try {
        // don't reset if host has not confirmed a stay
        const card = await AppCard.findOne({username: user.username});
        const host = await HostCard.findOne({username: card.hostUsername});
        if (host)
            return res.status(401).json({ message: "Unable to reset applicant card's host username" });

        await AppCard.findOneAndUpdate({username: user.username}, {hostUsername: ""})
        const newCard = await AppCard.findOne({username: user.username});
        res.status(200).send(newCard);
    } catch (err) {
        res.status(401).json({ message: "Error in reseting applicant card"});
    }
})

/**
 * @description delete applicant card when host confirms stay
 */
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
        await AppCard.findOneAndRemove({username: user.username}).then(res.status(200).send("Successfully deleted applicant card"));
    } catch (err) {
        res.status(401).json({ message: "Error in deleting applicant card"});
        const card = await AppCard.findOne({username: user.username});
        const host = await HostCard.findOne({username: card.hostUsername});
        if (host)
            return res.status(401).json({ message: "Unable to reset applicant card's host username" });

        await AppCard.findOneAndUpdate({username: user.username}, {hostUsername: ""})
        const newCard = await AppCard.findOne({username: user.username});
        res.status(200).send(newCard);
    } catch (err) {
        res.status(401).json({ message: "Error in reseting applicant card"});
    }
})

/**
 * @description delete applicant card when host confirms stay
 */
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
        await AppCard.findOneAndRemove({username: user.username}).then(res.status(200).send("Successfully deleted applicant card"));
    } catch (err) {
        res.status(401).json({ message: "Error in deleting applicant card"});
        const card = await AppCard.findOne({username: user.username});
        const host = await HostCard.findOne({username: card.hostUsername});
        if (host)
            return res.status(401).json({ message: "Unable to reset applicant card's host username" });

        await AppCard.findOneAndUpdate({username: user.username}, {hostUsername: ""})
        const newCard = await AppCard.findOne({username: user.username});
        res.status(200).send(newCard);
    } catch (err) {
        res.status(401).json({ message: "Error in reseting applicant card"});
    }
})

/**
 * @description delete applicant card when host confirms stay
 */
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
        await AppCard.findOneAndRemove({username: user.username}).then(res.status(200).send("Successfully deleted applicant card"));
    } catch (err) {
        res.status(401).json({ message: "Error in deleting applicant card"});
        const card = await AppCard.findOne({username: user.username});
        const host = await HostCard.findOne({username: card.hostUsername});
        if (host)
            return res.status(401).json({ message: "Unable to reset applicant card's host username" });

        await AppCard.findOneAndUpdate({username: user.username}, {hostUsername: ""})
        const newCard = await AppCard.findOne({username: user.username});
        res.status(200).send(newCard);
    } catch (err) {
        res.status(401).json({ message: "Error in reseting applicant card"});
    }
})

/**
 * @description delete applicant card when host confirms stay
 */
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
        await AppCard.findOneAndRemove({username: user.username}).then(res.status(200).send("Successfully deleted applicant card"));
    } catch (err) {
        res.status(401).json({ message: "Error in deleting applicant card"});
        const card = await AppCard.findOne({username: user.username});
        const host = await HostCard.findOne({username: card.hostUsername});
        if (host)
            return res.status(401).json({ message: "Unable to reset applicant card's host username" });

        await AppCard.findOneAndUpdate({username: user.username}, {hostUsername: ""})
        const newCard = await AppCard.findOne({username: user.username});
        res.status(200).send(newCard);
    } catch (err) {
        res.status(401).json({ message: "Error in reseting applicant card"});
    }
})

/**
 * @description delete applicant card when host confirms stay
 */
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
        await AppCard.findOneAndRemove({username: user.username}).then(res.status(200).send("Successfully deleted applicant card"));
    } catch (err) {
        res.status(401).json({ message: "Error in deleting applicant card"});
        const card = await AppCard.findOne({username: user.username});
        const host = await HostCard.findOne({username: card.hostUsername});
        if (host)
            return res.status(401).json({ message: "Unable to reset applicant card's host username" });

        await AppCard.findOneAndUpdate({username: user.username}, {hostUsername: ""})
        const newCard = await AppCard.findOne({username: user.username});
        res.status(200).send(newCard);
    } catch (err) {
        res.status(401).json({ message: "Error in reseting applicant card"});
    }
})

/**
 * @description delete applicant card when host confirms stay
 */
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
        await AppCard.findOneAndRemove({username: user.username}).then(res.status(200).send("Successfully deleted applicant card"));
    } catch (err) {
        res.status(401).json({ message: "Error in deleting applicant card"});
    }
});

module.exports = router;