import { readFile } from "fs/promises";
import mongoose from "mongoose";
import "dotenv/config";
import User from "./models/UserModel.js";
import Job from "./models/JobModel.js";

try {
    await mongoose.connect(process.env.CONNECT_URI);
    const user = await User.findOne({ email: "test@gmail.com" });
    const jsonJobs = JSON.parse(
        await readFile(new URL("./utils/MOCK_DATA.json", import.meta.url))
    );
    const jobs = jsonJobs.map((job) => {
        return { ...job, createdBy: user._id };
    });
    await Job.deleteMany({ createdBy: user._id });
    await Job.create(jobs);
    console.log("Imported Successfully!");
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}
