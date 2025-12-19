// middlewares/auth.js in Tweet Service
import jwt from "jsonwebtoken";
//const jwt = require("jsonwebtoken");
//const axios = require("axios");

export default async function protect(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID so Tweet can be linked to user
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
