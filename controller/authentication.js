import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({});


//logout user
const logout = async(req, res)=>{
    try {
       return res.clearCookie("token", {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        }).json({
            success:true,
            message:"Logout Successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
}

//user authentication
const register = async(req, res)=>{
   try {
     const {name, email, password, role} = req.body;

    if(!name || !email || !password || !role) return res.status(400).json({
        success:false,
        message:"All fields are required!"
    });

    const user = await User.findOne({email});

    if(user){
        return res.status(409).json({
            success:false,
            message:"Invalid User!"
        });
    };

    //hashpassword
    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({
        name,
        email,
        password: hashPassword,
        role
    });

    return res.status(201).json({
        success:true,
        message:"User Created Successfully!"
    })
   } catch (error) {
        return res.status(500).json({
            "success":false,
            message: error.message
        })
   }
};

//login user
const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

    if(!email || !password) return res.status(404).json({
        success:false,
        message:"Invalid User!"
    });

    const user = await User.findOne({email}).select("+password");

    if(!user) return res.status(404).json({
        success:false,
        message:"Invalid User!"
    })

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword) return res.status(401).json({
        success:false,
        messsage:"Unautherized User!"
    });

    const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" } // Token expires in 1 day
        );

    return res.status(201).cookie("token", token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    }).json({
        success:true,
        message:"Login Successfully!",
    })
    } catch (error) {
        return res.status(500).json({
            "success":false,
            message:error.message
        })
    }
};

export {
    register,
    login,
    logout,
}