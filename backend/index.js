import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import geminiResponse from './gemini.js'


const app= express();
app.use(cors({origin:"https://virtualassistantfrontend-h4z7.onrender.com", credentials:true}));
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

 connectDb();

app.listen(port,()=>{
    console.log("server started");
})
