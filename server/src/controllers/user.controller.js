/*
    We don't really need getUsers, getUser and also deleteUser bc user's data has been send from httplogin.
    But I just learning about prisma syntax, it's just easy to check in postman without go back to my mongo atlas to check user and we might need in future but probably not. 
*/

import bcrypt from "bcrypt";

import { getAllUser,getUserById,updatingUserInfoByid,deleteUserByid } from "../models/user.model.js"

function checkUserId(id,tokenUserId){
    if(id !== tokenUserId){
        return false
    }
    return true
}

export async function httpgetUsers(req, res){
    try{
        const users = await getAllUser();
        return res.status(200).json(users);
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to get users"})
    }
}

export async function httpgetUser(req, res){
    const id = req.params.id // for get /:id

    try{
        const user = await getUserById(id);
        return res.status(200).json(user);

    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to get user"})
    }
}

export async function httpupdateUser(req, res){
    const id = req.params.id; // for get /:id
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body

    const isValidUserId = checkUserId(id,tokenUserId)
    if(isValidUserId === false){
        return res.status(403).json({msg:"Not Authorized"});
    }
    
    let updatedPassword = null
    try{
        if(password){
            updatedPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await updatingUserInfoByid(id,inputs,avatar,updatedPassword);
        const { password:userPassword, ...rest } = updatedUser; // doesn't want to send password to fe for security reason

        return res.status(200).json(rest);
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to update users"})
    }
}

export async function httpdeleteUser(req, res){
    const id = req.params.id; // for get /:id
    const tokenUserId = req.userId;

    const isValidUserId = checkUserId(id,tokenUserId)
    if(isValidUserId === false){
        return res.status(403).json({msg:"Not Authorized"});
    }

    try{
        await deleteUserByid(id)
        return res.status(200).json({msg: "User has been deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: "Failed to delete users"})
    }
}
