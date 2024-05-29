import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

import postRoute from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

// console.log(process.env.CLIENT_URL)

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/test", testRoute);



// app.get("/",(req,res) =>{
//     res.send("main test");
//     console.log("ads")
// })

export default app;