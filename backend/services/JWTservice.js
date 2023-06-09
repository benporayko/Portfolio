// import jwt from "jsonwebtoken";
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
// import { promisify } from "util";
const dotenv = require('dotenv');
// import dotenv from "dotenv";

dotenv.config();

async function verifyJWT(req,res,next) {
    // verifies JWT with secret value used to sign, also ensures it exists in the first place
    res.setHeader('Cache-Control', 'no-store');
    const token = req.headers["x-access-token"]?.split(' ')[1]
    if (token) {
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            req.user = {
                id: decoded.id,
                username: decoded.username,
                role: decoded.role,
            };
            next();
        } catch (e) {
            console.error(e);
            res.json({ message: 'Authentication failed', isLoggedIn: false });
        }
    } else {
        res.json({message: "Incorrect Token Given or Token is Null", isLoggedIn: false})
    }
}

module.exports = { verifyJWT };