//require("dotenv").config({ path: __dirname + "/../.env" });
//const dotenv = require("dotenv");
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import router from "./routes/tweetRoutes.js";
//const express = require("express");
//const mongoose = require("mongoose");
//const tweetRouter = require("./routes/tweetRoutes");
//import { connectProducer } from "./kafka/producer.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log("DB connection successful!"));


app.use("/api/v1/tweets", authMiddleware, router);


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Tweet service running on ${PORT}`);
});


