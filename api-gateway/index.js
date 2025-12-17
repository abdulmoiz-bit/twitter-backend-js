const dotenv = require("dotenv");
const express = require("express");
//const dotenv = require("dotenv");
const proxy = require("express-http-proxy");
const jwt = require("jsonwebtoken");

// this is not absolute path
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());

 function authMiddleware(req, res, next) {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new Error("you are not logged in"));
  }

  // 2) Verification token
  const decoded =  jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = User.findById(decoded.id);
  if (!currentUser) {
    return next(new Error("the user is not exist"));
  }

  // GRANT ACCESS
  req.user = currentUser;
  next();
};


app.use(authMiddleware);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Route proxies
app.use("/api/v1/users", proxy(process.env.USER_SERVICE_URL));
app.use("/api/v1/tweets", authMiddleware, proxy(process.env.TWEET_SERVICE_URL));

app.listen(process.env.GATEWAY_PORT || 5010, () =>
  console.log(`API Gateway running on ${process.env.GATEWAY_PORT || 5010}`)
);
