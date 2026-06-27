import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password fields cannot be empty" });
        }
        else {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: " Email already registered " });
            }
            else {
                const newUser = new User({ email, password, role });
                await newUser.save();
                return res.status(201).json({ message: "User Registered Successfully" });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return req.status(401).json({ message: "Invalid Credentials" });
        }
        const ismatch = await user.isPasswordCorrect(password);
        if (!ismatch) {
            req.status(401).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role,
            },
            "KEY",
            {
                expiresIn: '1d'
            }
        );
        return res.status(200).json({ message: "Login Successfully", token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
