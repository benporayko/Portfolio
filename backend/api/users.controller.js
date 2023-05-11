import UsersDAO from "../dao/usersDAO.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class UsersCtrl {

    static async apiRegisterUser(req, res, next) {
        const user = req.body;

        const takenUsername = await UsersDAO.getUserByUsername(user.username);
        const takenEmail = await UsersDAO.getUserByEmail(user.email);

        if (takenUsername.length !== 0 || takenEmail.length !== 0) {
            res.json({message: "Username/Email is invalid."})
        } else {
            user.password = await bcrypt.hash(req.body.password, 10)

            await UsersDAO.registerNewUser(user.username, user.email, user.password)
            res.json({message: "Success"});
        }
    }

    static async apiLoginUser(req, res, next) {
        const userLoggingIn = req.body;
        await UsersDAO.getUserByUsername(userLoggingIn.username)
            .then(user => {
                if (user.length == 0) {
                    return res.json({
                        message: "Invalid Username or Password"
                    })
                } else {
                    bcrypt.compare(userLoggingIn.password, user[0].password, (e, result) => {
                        if (e) {
                            console.error(e);
                            return;
                        }
                        console.log("Result is " + result);
                        if (result) {
                            const payload = {
                                id: user[0]._id,
                                username: user[0].username,
                            }
                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,
                                {expiresIn: 86400},
                                (e, token) => {
                                    if (e) return res.json({message: e})
                                    return res.json({
                                        message: "Success",
                                        token: "Bearer " + token
                                    })
                                }
                            )
                        } else {
                            return res.json({
                                message: "Invalid Username or Password"
                            })
                        }
                    })
                }
            })
    }

}