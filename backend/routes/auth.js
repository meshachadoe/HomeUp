const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');

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

            const payload = {
                user: { id: user.id }
            };

            jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in saving new user");
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
                res.status(200).json({ token });
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: "Server error" });
        }
    });

module.exports = router;