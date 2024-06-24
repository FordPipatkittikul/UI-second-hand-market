import { getAllPosts,getPostById,getPostByIdShowPostDetail,createAndSavePostToDB,updatePostById,deletePostById } from "../models/post.model.js";

/*  GET
    WE DON"T NEED TO INCLUDE POSTDETAILS AND USER TO SHOW IN LISTPAGE FE. 
*/
export async function httpgetPosts(req, res){
    try {
        
        const posts = await getAllPosts();
        return res.status(200).json(posts);

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to get posts"})
    }
}

/*  GET
    WE NEED TO INCLUDE POSTDETAILS AND USER(only avatar, phone, email and username) TO SHOW IN SINGLEPAGE FE. 
*/
export async function httpgetPost(req, res){
    const id = req.params.id;
    try {
        const post = await getPostByIdShowPostDetail(id)
        return res.status(200).json(post);
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to get post"})
    }
}

/*  POST

*/
export async function httpaddPost(req, res){
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await createAndSavePostToDB(body,tokenUserId)
        return res.status(200).json(newPost);
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to create post"})
    }
}

/*  PUT
    update by postId that attach in params
*/
export async function httpupdatePost(req, res){
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    try {
        const post = await getPostById(id);

        // YOU ARE NOT THE OWNER OF THIS POST SHOULDN'T BE ABLE TO UPDATE IT
        if(post.userId !== tokenUserId){
            return res.status(403).json({msg: "Not Authorized"})
        };

        const updatedPostDetailData = body.postDetail ? { desc: body.postDetail.desc } : {};

        const updatedPost = await updatePostById(id,body,tokenUserId,updatedPostDetailData);

        return res.status(200).json(updatedPost);

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to update post"})
    }
}

/*  DELETE
    delete by postId that attach in params
*/
export async function httpdeletePost(req, res){
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = await getPostById(id);

        // YOU ARE NOT THE OWNER OF THIS POST SHOULDN'T BE ABLE TO DELETE IT
        if(post.userId !== tokenUserId){
            return res.status(403).json({msg: "Not Authorized"})
        };

        await deletePostById(id)

        return res.status(200).json({msg:"Post deleted"})

    } catch (err) {
        console.log(err)
        return res.status(500).json({msg: "fail to delete post"})
    }
}