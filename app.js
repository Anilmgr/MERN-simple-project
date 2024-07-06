import express, { response } from "express";
import "dotenv/config";
import morgan from "morgan";
import { nanoid } from "nanoid";
import jobRouter from './routes/jobRouter.js';

let app = express();

app.use(express.json());

const jobs = [
    { id: nanoid(), title: "Doctor" },
    { id: nanoid(), title: "Engineer" },
];

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/v1/jobs", jobRouter);

app.use("*", (req, res) => {
    res.status(404).json({ message: "Requested uri not found" });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({message:'Error Occured!'})
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}!`);
});
