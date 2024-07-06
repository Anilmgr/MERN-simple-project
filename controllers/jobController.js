import { nanoid } from "nanoid";

let jobs = [
    { id: nanoid(), title: "Doctor" },
    { id: nanoid(), title: "Engineer" },
];

export const getAllJobs = async (req, res) => {
    res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    const id = nanoid(10);
    const newJob = { id, title };
    jobs.push(newJob);
    res.status(201).json(newJob);
};

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ message: "Unable to find job!" });
    }
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    job.title = title
    res.status(200).json(job);
};

export const getSingleJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ message: "Unable to find job!" });
    }
    res.status(200).json(job);
};

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ message: "Unable to find job!" });
    }
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    job.title = title;
    res.status(200).json(job);
};
