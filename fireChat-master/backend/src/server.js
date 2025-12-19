import express from "express";
import ENV from "./config/env.config.js";
import authRoutes from './routes/auth.route.js'
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
const app = express();

app.use(cors(
    {
        origin: ENV.FRONTEND_URL,
        credentials: true,
    }
))



app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hwllo fire chat")
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.listen(ENV.PORT, ()=> {
    console.log(`the server is running on the port ${ENV.PORT}`)
    connectDB();
})