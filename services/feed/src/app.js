//require("dotenv").config({ path: __dirname + "/../.env" });
//const dotenv = require("dotenv");
import dotenv from "dotenv";
import express from "express";
import router from "./routes/feedRoutes.js"


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
app.use(express.json());


app.use("/api/v1/feed", router);

app.listen(process.env.PORT || 5004, () =>
  console.log(`Feed service running on port ${process.env.PORT || 5004}`)
);
