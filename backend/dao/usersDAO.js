import User from "../models/user.js";

export default class UsersDAO {
    static async getUserByUsername(username) {
        const user = await User.find({username: username});
        return user;
    }

    static async getUserByEmail(email) {
        const user = await User.find({email: email});
        return user;
    }

    static async registerNewUser(username, email, password) {
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: password,
            role: "admin"
        });
        await user.save();
    }
}