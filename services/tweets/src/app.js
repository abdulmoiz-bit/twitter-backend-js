//require("dotenv").config({ path: __dirname + "/../.env" });
//const dotenv = require("dotenv");
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/tweetRoutes.js"
//const express = require("express");
//const mongoose = require("mongoose");
//const tweetRouter = require("./routes/tweetRoutes"); 


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());


//const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

//mongoose.connect(process.env.DATABASE).then(() => console.log("Tweet DB connected"));

app.use("/api/v1/tweets", router);

app.listen(process.env.PORT || 5003, () =>
  console.log(`Tweet service running on port ${process.env.PORT || 5003}`)
);
