import 'express-async-errors';
import express from "express";
import "dotenv/config";
import morgan from "morgan";
import jobRouter from './routes/jobRouter.js';
import mongoose from "mongoose";
import errorHandler from './middleware/errorHandler.js';

let app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routers
app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
    res.status(404).json({ message: "Requested uri not found" });
});

app.use(errorHandler)


const PORT = process.env.PORT || 3000;
try {
    await mongoose.connect(process.env.CONNECT_URI)
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}!`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}

