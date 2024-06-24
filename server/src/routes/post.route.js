import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { httpaddPost, httpdeletePost, httpgetPost, httpgetPosts, httpupdatePost } from "../controllers/post.controller.js";

const postRoute = express.Router();

postRoute.get("/", httpgetPosts); 
postRoute.get("/:id", httpgetPost);
postRoute.post("/", verifyToken, httpaddPost);
postRoute.put("/:id", verifyToken, httpupdatePost);
postRoute.delete("/:id",verifyToken, httpdeletePost);


export default postRoute