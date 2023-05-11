import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyJWT(req,res,next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (e, decoded) => {
            if (e) return res.json({
                isLoggedIn: false,
                message: "Authentication failed"
            })
            console.log(decoded);
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}