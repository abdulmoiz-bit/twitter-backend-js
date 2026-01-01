import express from "express";
import router from "./routes/likeRoute";


const app = express();

app.use(express.json());

app.use("api/v1/likes", router);

app.listen(process.env.PORT || 5005, () =>
  console.log(`Tweet service running on port ${process.env.PORT || 5005}`)
);
