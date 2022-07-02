import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to db!!")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected!")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected!")
})


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/hotels", hotelRoute)
app.use("/api/rooms", roomRoute)

app.use((err,req,res,next)=> {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    success:false,
    status : errorStatus,
    message : errorMessage,
    stack : err.stack,
  })
})

app.listen(process.env.PORT || 3001,()=> {
    connect()
    console.log("Backend server started!!!")
})


/* const app = express()

app.use("/", (req,res)=> {
  res.send("hello")
})

app.listen(8000,()=> {
  console.log("Backend server started!!!")
}) */