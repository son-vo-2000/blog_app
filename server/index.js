import express from 'express';
import postRouter from './routes/postsRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/uersRoutes.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(cookieParser("jwtkey"));

const port = process.env.PORT || 4000;

// allow us to send data to db
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter); 
app.use("/api/users", userRouter);


app.listen(port, ()=>{
    console.log("Connected")
})