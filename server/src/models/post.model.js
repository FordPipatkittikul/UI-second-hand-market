import prisma from "../lib/prisma.js";

export async function getAllPosts(){
    const posts = await prisma.post.findMany();
    return posts
}

export async function getPostById(id){
    const post = await prisma.post.findUnique({
        where:{id:id}
    });
    return post
}

export async function getPostByIdShowPostDetail(id){
    const post = await prisma.post.findUnique({
        where: {id},
        include: {
            postDetail: true,
            user: {
                select:{
                    email:true,
                    username:true,
                    avatar:true,
                    phone:true
                }
            },
        }
    });
    return post;
}

export async function createAndSavePostToDB(body,tokenUserId){
    const newPost = await prisma.post.create({
        data: {
            ...body.postData,
            userId: tokenUserId,
            postDetail:{
                create: body.postDetail, 
            }
        },
    });
    return newPost
}

export async function updatePostById(id,body,tokenUserId,updatedPostDetailData){
    const updatedPost = await prisma.post.update({
        where: { id: id },
        data:{
            ...body.postData,
            userId: tokenUserId,
            postDetail:{
                update: updatedPostDetailData
            }
        }
    });
    return updatedPost
}

export async function deletePostById(id){
    // Delete the associated PostDetail first
    await prisma.postDetail.delete({
        where: { postId: id }
    });

    // and then delete the post
    await prisma.post.delete({
        where: { id }
    });
}