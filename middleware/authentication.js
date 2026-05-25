import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config({})

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({
            success: false,
            message: "Unautherized User!"
        });

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodeToken;

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

//role base auhentication
const isAutherizedRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({
            success: false,
            message: "User Not Found!"
        })

        if (user.role !== "organizer") return res.status(401).json({
            success: false,
            message: "Unautherized User!"
        });

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

export {
    isAuthenticated,
    isAutherizedRole,
}