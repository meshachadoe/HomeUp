const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth");
const User = require('../models/user');
const HostCard = require('../models/hostCard');
const AppCard = require('../models/appCard');

router.post("/register",
    [check("username", "Please enter a valid username").not().isEmpty(),
     check("password", "Please enter a valid password").isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        const { username, password, isApplicant } = req.body;

        //checks if username already exists
        try {
            let user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({ message: "Username already exists" });
            }
            user = new User({ username, password, isApplicant });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            let card;            
            if (isApplicant) {
                const { name, location, contactInfo, minimumStay, additionalInfo } = req.body;
                card = new AppCard({
                    username,
                    name,
                    location,
                    contactInfo,
                    minimumStay,
                    additionalInfo,
                });
            } else {
                const { name, location, phone, maximumStay, description } = req.body;
                card = new HostCard({
                    username,
                    name,
                    location,
                    phone,
                    maximumStay,
                    description,
                });
            }

            await card.save();
            const payload = {
                user: { id: user.id }
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 7200 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in saving new user and card");
        }
});

router.post("/login",
    [check("username", "Please enter a valid username").not().isEmpty(),
     check("password", "Please enter a valid password").isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        const { username, password } = req.body;
        try {
            let user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: "Incorrect username or password" });
            }
            const pwMatch = await bcrypt.compare(password, user.password);
            if (!pwMatch) {
                return res.status(400).json({ message: "Incorrect username or password" });
            }
            const payload = { user: { id: user.id }};
            jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, isApp: user.isApplicant});
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Server error" });
        }
    });

router.delete("/delete", auth, async (req, res) => {
    let user;
    try {
        user = await User.findById(req.user.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Error in fetching user" });
    }

    try {
        await User.findOneAndRemove({username: user.username})
        res.status(200).send("Successfully deleted user");
    } catch (err) {
        res.status(401).json({ message: "Error in deleting user"});
    }
})

module.exports = router;