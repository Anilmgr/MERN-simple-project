import "express-async-errors";
import express from "express";
import "dotenv/config";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticatedUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

let app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

// Routers
app.use("/api/v1/jobs", authenticatedUser, jobRouter);

app.use("/api/v1/test", (req, res) => {
    res.json({ message: "Hello World!" });
});

app.use("/api/v1/users", authenticatedUser, userRouter);

app.use("/api/v1/auth", authRouter);

app.use("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/index.html'))
})

app.use("*", (req, res) => {
    res.status(404).json({ message: "Requested uri not found" });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
try {
    await mongoose.connect(process.env.CONNECT_URI);
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}!`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
