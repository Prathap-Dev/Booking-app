import bcrypt from "bcryptjs";
import User from "../models/User.js"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req,res,next)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password:hash,
        })

        await newUser.save()
        res.status(200).json("User has been created")
    }catch(err){
        next(err)
    }
}

export const login = async (req,res,next)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong Password!"))

        let payload = { id:user._id, isAdmin:user.isAdmin};
        const token = jwt.sign(payload, process.env.JWT);

        const {password,...otherDetails} = user._doc;
        res.cookie("access_token" , token,{
            httpOnly:true,
        })
        .status(200).json({details:{...otherDetails}})
    }catch(err){
        next(err)
    }
}

export const signout = async (req, res,next) => {
    try {
      req.session = null;
      res.clearCookie("access_token");
      return res.status(200).json({ message: "You've been signed out!" });
    } catch (err) {
      next(err);
    }
};