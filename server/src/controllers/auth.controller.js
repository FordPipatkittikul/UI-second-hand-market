import bcrypt from "bcrypt";

import { userExist,generateToken,createAndSaveUserTODB } from "../models/auth.model.js";

export async function login(req,res){
    const {username, password} = req.body;

    try{

        const user = await userExist(username);
        if(!user){
            return res.status(401).json({msg: "Invalid Credential"})
        };

        // CHECK PASSWORD 
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({msg: "Invalid Credential"})
        }

        const {password:userPassword, ...userInfo} = user
        const week = 1000 * 60 * 60 * 24 * 7; // milisec to min to hour to day to week
        const token = generateToken(user,week);

        // CREATING COOKIE FOR USER 
        return res.cookie("token",token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: week
        }).status(200).json(userInfo)

    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Fail to login"});
    }
}
        

export async function register(req,res){
    const {username, email, password, phone} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        createAndSaveUserTODB(username,email,hashedPassword,phone)

        return res.status(201).json({msg: "User created successfully"});
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Fail to create user"});
    }

}


export function logout(req,res){
    return res.clearCookie("token").status(200).json({msg:"Logout Successfully"})
}