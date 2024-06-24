import express from "express"

import postRoute from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/users", userRoute);
api.use("/posts", postRoute);
api.use("/test", testRoute);

export default api;

