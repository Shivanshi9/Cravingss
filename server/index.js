import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import dbConnection from "./src/config/dbConnection.config.js";
import AuthRouter from "./src/routers/auth.router.js";
import PublicRouter from './src/routers/public.router.js';
import UserRouter from './src/routers/user.route.js';
import ContactRouter from "./src/routers/public.router.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from "path";
   
const app = express();

app.use(cors({ origin: "http://localhost:5173" , credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/auth",AuthRouter);
app.use("/public",PublicRouter);
app.use("/contact", ContactRouter);
app.use("/user", UserRouter);
app.use("/uploads", express.static("uploads"));

//routes default api
app.get("/",(req,res)=>{
    console.log("Get API hits");
    res.json({message: "Welcome to Craving project"});
})


app.use((err,req,res,next) => {
    const ErrorMessage = err.message || "Internal Server Error";
    const ErrorStatusCode = err.statusCode || 500;

    res.status(ErrorStatusCode).json({message : ErrorMessage});
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Server started on port: ",port);
    dbConnection();
})