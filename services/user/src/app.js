import dotenv from "dotenv";
//import "dotenv/config";
import express from "express";
import router from "./routes/userRoutes.js";
import mongoose from "mongoose";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE).then(() => console.log("User DB connected"));

app.use("/api/v1/users", router);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`User service running on ${PORT}`);
});
