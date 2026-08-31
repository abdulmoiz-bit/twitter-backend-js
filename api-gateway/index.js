import dotenv from "dotenv";
import express from "express";
import proxy from "express-http-proxy";
import jwt from "jsonwebtoken";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/.env" });


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
  req.user = decoded;
  /*
  // 3) Check if user still exists
  const currentUser = User.findById(decoded.id);
  if (!currentUser) {
    return next(new Error("the user is not exist"));
  }
  */

  // GRANT ACCESS
  //req.user = currentUser;
  next();
};


//app.use(authMiddleware);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Route proxies
app.use(
  "/api/v1/auth",
  proxy(process.env.AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`,
  }),
);
app.use("/api/v1/users", authMiddleware, proxy(process.env.USER_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/users${req.url}`,
}));
app.use("/api/v1/tweets", authMiddleware, proxy(process.env.TWEET_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/v1/tweets${req.url}`,
}));
app.use("/api/v1/likes", authMiddleware, proxy(process.env.LIKE_SERVICE_URL, {
  proxyReqPathResolver: (req) => `/api/v1/likes${req.url}`,
}));

app.listen(process.env.GATEWAY_PORT || 5000, () =>
  console.log(`API Gateway running on ${process.env.GATEWAY_PORT || 5000}`)
);
