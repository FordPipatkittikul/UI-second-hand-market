import express from "express"
import { httplogin, httplogout, httpregister } from "../controllers/auth.controller.js";


const authRouter = express.Router();

authRouter.post("/login", httplogin);
authRouter.post("/register", httpregister);
authRouter.post("/logout", httplogout);

export default authRouter;