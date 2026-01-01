//require("dotenv").config({ path: __dirname + "/../.env" });
//const dotenv = require("dotenv");
import dotenv from "dotenv";
import express from "express";
import router from "../routes/authRoutes.js"
import mongoose from "mongoose";


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

app.use("/api/v1/auth", router);

app.listen(process.env.PORT || 5001, () =>
  console.log(`Auth service running on port ${process.env.PORT || 5001}`)
);
