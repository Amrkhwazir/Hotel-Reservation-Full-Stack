import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = 8800;

// mongo db connect
const connect = () => {
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        throw err 
    })
}

// middlewares    

app.use(cookieParser())
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/hotels", hotelRouter);

app.use((err, req, res, next)=>{

    const errorStatus = err.status || 500;
    const errorMessage = err.message || "SOmething went wrong!";
    return res.status(errorStatus).json({
        success: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })

})



app.listen(port,()=>{
    console.log("server running on " + port)
    connect();
})