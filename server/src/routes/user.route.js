import express from "express"
import { httpgetUsers, httpgetUser, httpupdateUser, httpdeleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRoute = express.Router();

userRoute.get("/", httpgetUsers);
userRoute.get("/:id", verifyToken , httpgetUser);
userRoute.put("/:id", verifyToken , httpupdateUser);
userRoute.delete("/:id", verifyToken , httpdeleteUser);

export default userRoute;