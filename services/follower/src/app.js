import dotenv from "dotenv";
//import "dotenv/config";
import express from "express";
import router from "./routes/followRoutes.js";


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/../.env" });


const app = express();

app.use(express.json());

app.use("/api/v1/follow", router);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Follow service running on ${PORT}`);
});
