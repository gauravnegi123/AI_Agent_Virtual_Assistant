import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req,res)=>{
    try {
        const{name,email,password}=req.body;

        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({message:"Email already exist"})
        }

        if(password.length <8){
            return res.status(400).json({message:"Password must be at least 8 characters"})
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user= await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token= await genToken(user._id);

        res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"None",
            maxAge: 60*24*60*60*1000
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:`sign up error`})
    }
}
export const Login = async (req,res)=>{
    try {
        const{email,password}=req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User doesn't exist"})
        }

      const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password"})
        }

        const token= await genToken(user._id);

        res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"None",
            maxAge: 60*24*60*60*1000
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:`login error`})
    }
}

export const logOut = async (req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        return res.status(500).json({message:`logout error`})
    }
}
