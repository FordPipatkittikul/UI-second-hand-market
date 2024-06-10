import prisma from "../lib/prisma.js";

/*  GET
    WE DON"T NEED TO INCLUDE POSTDETAILS AND USER TO SHOW IN LISTPAGE FE.
    that's the idea for now. 
*/
export async function getPosts(req, res){
    try {
        
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to get posts"})
    }
}

/*  GET
    WE NEED TO INCLUDE POSTDETAILS AND USER(only avatar, phone, email and username) TO SHOW IN SINGLEPAGE FE.
    that's the idea for now.  
*/
export async function getPost(req, res){
    const id = req.params.id;
    try {

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
        res.status(200).json(post);

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to get post"})
    }
}

/*  POST

*/
export async function addPost(req, res){
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        /* CREATE A NEW POST AND SAVE TO DB */
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail, 
                }
            },
        });
        res.status(200).json(newPost);

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to create post"})
    }
}

/*  PUT
    update by postId that attach in params
*/
export async function updatePost(req, res){
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    try {
        const post = await prisma.post.findUnique({
            where:{id:id}
        });

        // YOU ARE NOT THE OWNER OF THIS POST SHOULDN'T BE ABLE TO UPDATE IT
        if(post.userId !== tokenUserId){
            return res.status(403).json({msg: "Not Authorized"})
        };

        const updatedPostData = { ...body.postData, userId: tokenUserId };
        const updatedPostDetailData = body.postDetail ? { desc: body.postDetail.desc } : {};

        const updatedPost = await prisma.post.update({
            where: { id: id },
            data:{
                ...updatedPostData,
                postDetail:{
                    update: updatedPostDetailData
                }
            }
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to update post"})
    }
}

/*  DELETE
    delete by postId that attach in params
*/
export async function deletePost(req, res){
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await prisma.post.findUnique({
            where:{id:id}
        });

        // YOU ARE NOT THE OWNER OF THIS POST SHOULDN'T BE ABLE TO DELETE IT
        if(post.userId !== tokenUserId){
            return res.status(403).json({msg: "Not Authorized"})
        };

        // Delete the associated PostDetail first
        await prisma.postDetail.delete({
            where: { postId: id }
        });

        // and then delete the post
        await prisma.post.delete({
            where: { id }
        });

        res.status(200).json({msg:"Post deleted"})

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to delete post"})
    }
}