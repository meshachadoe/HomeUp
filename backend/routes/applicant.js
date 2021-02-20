const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const AppCard = require("../models/appCard");
const User = require("../models/user");

router.post("/addCard", async (req,res) => {
    // try {
    //     const user = await User.findById(req.user.id);
    // } catch (err) {
    //     console.log(err);
    //     return res.send(401).json({ message: "Error in fetching user" });
    // }

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

// only allow host accounts to use this route
router.get("/getCard", auth, async (req, res) => {
    // only show if user is authenticated
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
            res.status(403).json({ message: "Cannot view as applicant"});
        }
        const cards = await AppCard.find(card => card.hostUsername === user.username).map(listing => listing.toObject());
        res.status(200).send(cards);
    } catch (err) {
        console.log(err);
        res.send(500).json({ message: "Unable to retrieve list"});
    }
});

// router.patch("/updateCard", async (req, res) => {

// });

// router.delete("/deleteCard", async (req, res) => {

// });

module.exports = router;