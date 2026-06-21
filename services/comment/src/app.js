import express from "express";
import router from "./routes/commentRoutes.js"


const app = express();
app.use(express.json());


//const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

//mongoose.connect(process.env.DATABASE).then(() => console.log("Tweet DB connected"));

app.use("/api/v1/comments", router);

app.listen(process.env.PORT || 5006, () =>
  console.log(`Comment service running on port ${process.env.PORT || 5006}`)
);
