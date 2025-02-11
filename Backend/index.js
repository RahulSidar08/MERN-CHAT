import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import { connectDb } from "./config/dbConfig.js";
dotenv.config();
const _dirname = path.resolve()
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://mern-chat-nfyf.onrender.com", // Change based on frontend URL
    credentials: true, // Allow cookies
  })
);


const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

connectDb()

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


// deployment code 
app.use(express.static(path.join(_dirname,"/Frontend/dist")))
app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"))
})

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});