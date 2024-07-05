import express, { response } from "express";
import "dotenv/config";
import morgan from "morgan";
import { nanoid } from "nanoid";

let app = express();

app.use(express.json());

const jobs = [
    { id: nanoid(), title: "Doctor" },
    { id: nanoid(), title: "Engineer" },
];

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/api/v1/jobs", (req, res) => {
    res.json(jobs);
});

app.post("/api/v1/jobs", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    const id = nanoid(10);
    const newJob = { id, title };
    jobs.push(newJob);
    res.status(201).json(newJob);
});

app.get("/api/v1/jobs/:id", (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ message: "Unable to find job!" });
    }
    res.status(200).json(job);
});

app.delete("/api/v1/jobs/:id", (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ message: "Unable to find job!" });
    }
    const newJobs = jobs.filter((job) => job.id !== id);
    jobs = newJobs;
    res.status(200).json(job);
});

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
