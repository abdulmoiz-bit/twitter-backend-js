import express from "express";
import router from "./routes/bookmarkRoute";


const app = express();

app.use(express.json());

app.use("api/v1/bookmarks", router);

app.listen(process.env.PORT || 5006, () =>
  console.log(`Tweet service running on port ${process.env.PORT || 5006}`)
);
