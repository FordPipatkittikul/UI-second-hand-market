import prisma from "../lib/prisma.js";

export async function getAllUser(){
    const users = await prisma.user.findMany();
    return users;
}

export async function getUserById(id){
    const user = await prisma.user.findUnique({
        where: {id:id},
    });
    return user;
}

export async function updatingUserInfoByid(id,inputs,avatar,updatedPassword){

    /*
        In frontend username, email and phone already has default value.
        But passowrd, avatar do not have default value and if user doesn't want to change it we should not gonna send anything it(or shouldn't change it).

        If updatedPassword is not null do this condition(update it) same go for avatar
    */
    const updatedUser = await prisma.user.update({
        where: {id:id},
        data: {
            ...inputs,
            ...(updatedPassword && {password: updatedPassword}), // if updatedPassword exists, then change password to updatedPassword
            ...(avatar && {avatar}),
        },
    });
    return updatedUser

}

export async function deleteUserByid(id){
    await prisma.user.delete({
        where: {id:id},
    });
}


