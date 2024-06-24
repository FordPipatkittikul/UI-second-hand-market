import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

import api from "./api.js"

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api', api);

export default app;