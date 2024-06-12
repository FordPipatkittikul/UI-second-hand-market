import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";


export async function login(req,res){
    const {username, password} = req.body;

    try{

        // CHECK IF USER DOES EXISTS IN DB
        const user = await prisma.user.findUnique({
            where:{username}
        });
        if(!user){
            return res.status(401).json({msg: "Invalid Credential"})
        };


        // CHECK PASSWORD 
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({msg: "Invalid Credential"})
        }

        
        // GENERATE COOKIE TOKEN AND SEND TO USER
        const {password:userPassword, ...userInfo} = user
        const week = 1000 * 60 * 60 * 24 * 7; // milisec to min to hour to day to week
        const token = jwt.sign({
            id:user.id,
            isAdmin: false
        }, process.env.JWT_SECRET_KEY, {expiresIn:week}); // JWT token include user id and expire it in one week
        res.cookie("token",token, {
            httpOnly:true,
            secure:true,
            maxAge: week
        }).status(200).json(userInfo)

    }catch(err){
        return res.status(500).json({msg: "Fail to login"});
    }
}


export async function register(req,res){
    const {username, email, password, phone} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                phone
            }
        });

        return res.status(201).json({msg: "User created successfully"});
    }catch(err){
        return res.status(500).json({msg: "Fail to create user"});
    }

}


export function logout(req,res){
    res.clearCookie("token").status(200).json({msg:"Logout Successfully"})
}