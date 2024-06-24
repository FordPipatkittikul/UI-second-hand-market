/*
    We don't need getUsers, getUser and also deleteUser bc in frontend we get User by token inside cookies.
    But I just learning about prisma syntax, it's just easy to check in postman without go back to my mongo atlas to check user and we might need in future but probably not. 
*/

import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function getUsers(req, res){
    try{
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to get users"})
    }
}

export async function getUser(req, res){
    const id = req.params.id // for get /:id

    try{
        const user = await prisma.user.findUnique({
            where: {id:id},
        });
        return res.status(200).json(user);

    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to get user"})
    }
}

export async function updateUser(req, res){
    const id = req.params.id; // for get /:id
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body

    if(id !== tokenUserId){
        return res.status(403).json({msg:"Not Authorized"});
    }

    let updatedPassword = null
    try{
        if(password){
            updatedPassword = await bcrypt.hash(password, 10);
        }
        /*
            In frontend username, email and phone already has default value.
            But passowrd, avatar do not have default value and if user doesn't want to change it we should not gonna send anything it(or shouldn't change it).

            If updatedPassword is not null do this condition(update it) same go for avatar
        */
        const updatedUser = await prisma.user.update({
            where: {id:id},
            data: {
                ...inputs,
                ...(updatedPassword && {password: updatedPassword}), 
                ...(avatar && {avatar}),
            },
        });

        const { password:userPassword, ...rest } = updatedUser; // doesn't want to send password to fe for security reason

        return res.status(200).json(rest);
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to update users"})
    }
}

export async function deleteUser(req, res){
    const id = req.params.id; // for get /:id
    const tokenUserId = req.userId;

    if(id !== tokenUserId){
        return res.status(403).json({msg:"Not Authorized"});
    }

    try{
        await prisma.user.delete({
            where: {id:id},
        });
        return res.status(200).json({msg: "User deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to delete users"})
    }
}
