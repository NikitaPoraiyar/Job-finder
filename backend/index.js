import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userRoutes from './routes/user.js';
import jobRoutes from './routes/job.js';
import log from "./middleware/log.js";
import {errorLogger} from "./middleware/log.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(log);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connecting to MongoDB");
    } catch(error) {
        console.log("Error connecting to MongoDB:", error);
    }
};

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!!")
});



app.use(errorLogger);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

