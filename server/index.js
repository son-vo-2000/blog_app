import express from 'express';
import postRouter from './routes/postsRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/uersRoutes.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import multer from 'multer';
import dotenv from 'dotenv';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/uploadImages')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ file.originalname)
  }
})

const upload = multer({storage})

const app = express();
dotenv.config()

app.use(express.json());
app.use(cookieParser("jwtkey"));
app.use(
  cors({
    origin: 'http://your-frontend-url.com', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
  })
);
const PORT = "https://blogapp-production-7f9d.up.railway.app"

app.post('/api/upload', upload.single('file'), function(req,res){
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const file = req.file;
   res.status(200).json(file.filename);
})


// allow us to send data to db
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter); 
app.use("/api/users", userRouter);


app.listen(PORT, ()=>{
    console.log("Connected")
})