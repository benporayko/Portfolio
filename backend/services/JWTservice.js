import jwt from "jsonwebtoken";
import { promisify } from "util";
// const { promisify } = require('util');
import dotenv from "dotenv";

dotenv.config();

export async function verifyJWT(req,res,next) {
    res.setHeader('Cache-Control', 'no-store');
    const token = req.headers["x-access-token"]?.split(' ')[1]
    console.log("calling verifyJWT, token is: " + token);
    if (token) {
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
            console.log(decoded);
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
        // jwt.verify(token, process.env.JWT_SECRET, (e, decoded) => {
        //     if (e) return res.json({
        //         isLoggedIn: false,
        //         message: "Authentication failed"
        //     })
        //     console.log(decoded);
        //     req.user = {};
        //     req.user.id = decoded.id;
        //     req.user.username = decoded.username;
        //     req.user.role = decoded.role;
        //     next()
        // })
    } else {
        res.json({message: "Incorrect Token Given or Token is Null", isLoggedIn: false})
    }
}