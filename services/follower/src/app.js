import dotenv from "dotenv";
//import "dotenv/config";
import express from "express";
import router from "./routes/followRoutes.js";
import mongoose from "mongoose";


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });


const app = express();

app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

app.use("/api/v1/follow", router);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Follow service running on ${PORT}`);
});
