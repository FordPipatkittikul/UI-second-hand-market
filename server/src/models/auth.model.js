import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export async function userExist(username) {
    const user = await prisma.user.findUnique({
        where:{username}
    });
    return user
}

export function generateToken(user,week){
    const token = jwt.sign({
        id:user.id,
        isAdmin: false
    }, process.env.JWT_SECRET_KEY, {expiresIn:week}); // JWT token include user id and expire it in one week
    return token
}

export async function createAndSaveUserTODB(username,email,hashedPassword,phone){
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            phone
        }
    });
}
