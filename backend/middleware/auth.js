const jwt = require("jsonwebtoken");

// Used to verify the token & retrieve user based on the token payload
module.exports = (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({ message: "Authentication error"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Invalid token"});
    }
};